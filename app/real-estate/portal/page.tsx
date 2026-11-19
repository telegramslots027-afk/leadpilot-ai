"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./portal.module.css";

type Property = { id: string; public_slug: string; title: string; city: string; state_code: string; price: number; bedrooms: number; bathrooms: number; square_feet: number | null; status: string; description: string };
type Lead = { id: string; name: string; email: string; phone: string | null; intent: string; preferred_area: string | null; budget_range: string | null; timeline: string | null; message: string | null; status: string; created_at: string };
type Workspace = { name: string; real_estate_public_key: string };

const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");

export default function RealEstatePortal() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agency, setAgency] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [property, setProperty] = useState({ title: "", city: "", state_code: "TX", price: "", bedrooms: "3", bathrooms: "2", square_feet: "", description: "", status: "draft" });

  useEffect(() => {
    const saved = window.localStorage.getItem("chatboost_re_session");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => { if (token) void loadPortal(token); }, [token]);

  async function auth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    if (!supabaseUrl || !apiKey) { setNotice("The app is not connected to Supabase yet. Add the public project URL and anon key in the hosting environment."); setBusy(false); return; }
    try {
      const endpoint = mode === "signup" ? "/auth/v1/signup?redirect_to=" + encodeURIComponent(window.location.origin + "/real-estate/portal") : "/auth/v1/token?grant_type=password";
      const response = await fetch(supabaseUrl + endpoint, { method: "POST", headers: { apikey: apiKey, "Content-Type": "application/json" }, body: JSON.stringify({ email, password, ...(mode === "signup" ? { data: { product: "chatboost-real-estate" } } : {}) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || data.message || data.error_description || "Authentication failed. Check your email and password.");
      if (!data.access_token) { setNotice("Account created. Check your email for the confirmation link, then return here and sign in."); setMode("signin"); return; }
      window.localStorage.setItem("chatboost_re_session", data.access_token);
      if (data.refresh_token) window.localStorage.setItem("chatboost_re_refresh", data.refresh_token);
      setToken(data.access_token);
      setNotice("Signed in. Preparing your workspace…");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }

  async function loadPortal(accessToken: string) {
    setBusy(true);
    try {
      const response = await fetch("/api/real-estate/portal", { headers: { Authorization: "Bearer " + accessToken }, cache: "no-store" });
      if (response.status === 409) { setNotice("Create your agency workspace to get started."); setBusy(false); return; }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load your workspace.");
      setProperties(data.properties || []); setLeads(data.leads || []); setWorkspace(data.workspace || null); setNotice("");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not load your workspace."); }
    finally { setBusy(false); }
  }

  async function createWorkspace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/real-estate/workspace", { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify({ name: agency }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Workspace setup failed.");
      await loadPortal(token);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Workspace setup failed."); }
    finally { setBusy(false); }
  }

  async function addProperty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/real-estate/portal", { method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify({ ...property, price: Number(property.price), bedrooms: Number(property.bedrooms), bathrooms: Number(property.bathrooms), square_feet: property.square_feet ? Number(property.square_feet) : null }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not save property.");
      setProperty({ title: "", city: "", state_code: "TX", price: "", bedrooms: "3", bathrooms: "2", square_feet: "", description: "", status: "draft" });
      setNotice("Property saved. Publish it when its details are approved."); await loadPortal(token);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not save property."); }
    finally { setBusy(false); }
  }

  async function updateLead(id: string, status: string) {
    setBusy(true);
    try {
      const response = await fetch("/api/real-estate/portal", { method: "PATCH", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not update lead.");
      setLeads(current => current.map(item => item.id === id ? { ...item, status } : item));
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not update lead."); }
    finally { setBusy(false); }
  }

  function signOut() { window.localStorage.removeItem("chatboost_re_session"); window.localStorage.removeItem("chatboost_re_refresh"); setToken(""); setProperties([]); setLeads([]); setWorkspace(null); setNotice("You have signed out."); }

  if (!token) return <main className={styles.shell}><header className={styles.top}><a href="/" className={styles.brand}>ChatBoost <b>AI</b></a><span>REAL ESTATE WORKSPACE</span></header><section className={styles.authCard}><div className={styles.eyebrow}>AGENT PORTAL</div><h1>{mode === "signup" ? "Create your agent account" : "Welcome back"}</h1><p>Manage property listings and enquiries in one place.</p><form onSubmit={auth} className={styles.form}><label>Work email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@agency.com" /></label><label>Password<input required type="password" minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" /></label><button disabled={busy}>{busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}</button></form><button className={styles.linkButton} onClick={() => setMode(mode === "signup" ? "signin" : "signup")}>{mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}</button>{notice && <p className={styles.notice}>{notice}</p>}<p className={styles.fine}>Your account is private. Use a work email you control. Email confirmation may be required.</p></section></main>;

  return <main className={styles.shell}><header className={styles.top}><a href="/" className={styles.brand}>ChatBoost <b>AI</b></a><div className={styles.topRight}><span>REAL ESTATE WORKSPACE</span><button className={styles.signout} onClick={signOut}>Sign out</button></div></header>
    <section className={styles.hero}><div><div className={styles.eyebrow}>AGENT DASHBOARD</div><h1>{workspace?.name || "Your real-estate workspace"}</h1><p>Manage listings and keep track of buyer and seller enquiries.</p></div><button className={styles.refresh} onClick={() => void loadPortal(token)} disabled={busy}>↻ Refresh</button></section>
    {notice && <p className={styles.notice}>{notice}</p>}
    {!workspace ? <section className={styles.card}><h2>Set up your agency workspace</h2><p>Start with your agency or team name. You can invite teammates in a later release.</p><form onSubmit={createWorkspace} className={styles.inlineForm}><input required minLength={2} value={agency} onChange={e => setAgency(e.target.value)} placeholder="Example Realty Group" /><button disabled={busy}>Create workspace</button></form></section> : <>
      <section className={styles.stats}><div><span>PROPERTY LISTINGS</span><strong>{properties.length}</strong></div><div><span>NEW ENQUIRIES</span><strong>{leads.filter(l => l.status === "new").length}</strong></div><div><span>ALL ENQUIRIES</span><strong>{leads.length}</strong></div></section>
      <section className={styles.grid}><div className={styles.card}><div className={styles.cardHead}><div><div className={styles.eyebrow}>YOUR INVENTORY</div><h2>Add a property</h2></div></div><form onSubmit={addProperty} className={styles.form}><label>Property title<input required minLength={3} value={property.title} onChange={e => setProperty({ ...property, title: e.target.value })} placeholder="Modern family home" /></label><div className={styles.two}><label>City<input required value={property.city} onChange={e => setProperty({ ...property, city: e.target.value })} placeholder="Austin" /></label><label>State<input required maxLength={2} value={property.state_code} onChange={e => setProperty({ ...property, state_code: e.target.value.toUpperCase() })} placeholder="TX" /></label></div><label>Asking price (USD)<input required type="number" min="0" step="0.01" value={property.price} onChange={e => setProperty({ ...property, price: e.target.value })} placeholder="425000" /></label><div className={styles.three}><label>Beds<input type="number" min="0" step="0.5" value={property.bedrooms} onChange={e => setProperty({ ...property, bedrooms: e.target.value })} /></label><label>Baths<input type="number" min="0" step="0.5" value={property.bathrooms} onChange={e => setProperty({ ...property, bathrooms: e.target.value })} /></label><label>Sq ft<input type="number" min="0" value={property.square_feet} onChange={e => setProperty({ ...property, square_feet: e.target.value })} placeholder="Optional" /></label></div><label>Description<textarea rows={3} maxLength={4000} value={property.description} onChange={e => setProperty({ ...property, description: e.target.value })} placeholder="Describe the approved property features…" /></label><label>Listing visibility<select value={property.status} onChange={e => setProperty({ ...property, status: e.target.value })}><option value="draft">Save as draft</option><option value="published">Publish listing</option></select></label><button disabled={busy}>Save property</button></form></div>
      <div className={styles.card}><div className={styles.eyebrow}>LEAD INBOX</div><h2>Recent enquiries</h2>{leads.length === 0 ? <p className={styles.empty}>No enquiries yet. Once a visitor submits a consent-based enquiry through your configured website form, it will appear here.</p> : <div className={styles.leads}>{leads.map(lead => <article className={styles.lead} key={lead.id}><div className={styles.leadTop}><b>{lead.name}</b><select aria-label={"Status for " + lead.name} value={lead.status} onChange={e => void updateLead(lead.id, e.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="closed">Closed</option><option value="archived">Archived</option></select></div><a href={"mailto:" + lead.email}>{lead.email}</a>{lead.phone && <span>{lead.phone}</span>}<p>{lead.intent.replace("_", " ")}{lead.preferred_area ? " · " + lead.preferred_area : ""}{lead.budget_range ? " · " + lead.budget_range : ""}</p>{lead.message && <p>{lead.message}</p>}<small>{new Date(lead.created_at).toLocaleString()}</small></article>)}</div>}</div></section>
      <section className={styles.card}><div className={styles.eyebrow}>PROPERTY LISTINGS</div><h2>Your properties</h2>{properties.length === 0 ? <p className={styles.empty}>No properties yet. Add your first listing above.</p> : <div className={styles.propertyList}>{properties.map(item => <article key={item.id}><div><b>{item.title}</b><p>{item.city}, {item.state_code} · {item.bedrooms} beds · {item.bathrooms} baths · {item.square_feet ? item.square_feet.toLocaleString() + " sq ft" : "size not supplied"}</p><small>{item.status.toUpperCase()} · {item.public_slug}</small><a href={"/real-estate/property/" + item.public_slug} target="_blank" rel="noreferrer">Open public property page ↗</a></div><strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.price)}</strong></article>)}</div>}</section>
      <section className={styles.card}><div className={styles.eyebrow}>PUBLIC ENQUIRY LINK</div><h2>Connect your website form</h2><p>Use this workspace key with the real-estate enquiry endpoint when embedding a form on your own website. Keep it public-facing only; never share your service-role key.</p><code>{workspace.real_estate_public_key}</code><p className={styles.fine}>The agent portal is an early pilot foundation. A hosted public listing page, email alerts, rate limiting and a full security review are still required before onboarding paying customers.</p></section>
    </>}
  </main>;
}

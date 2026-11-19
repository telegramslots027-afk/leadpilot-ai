"use client";
import { FormEvent, useState } from "react";
import styles from "./listing.module.css";

export default function PropertyEnquiryForm({ slug }: { slug: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", intent: "buyer", preferred_area: "", budget_range: "", timeline: "", message: "", consent: false });
  const [busy, setBusy] = useState(false); const [notice, setNotice] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/real-estate/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, property_slug: slug }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Unable to send your enquiry.");
      setNotice("Thanks — your enquiry has been sent to the agent."); setForm({ name: "", email: "", phone: "", intent: "buyer", preferred_area: "", budget_range: "", timeline: "", message: "", consent: false });
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to send your enquiry."); }
    finally { setBusy(false); }
  }
  return <form className={styles.form} onSubmit={submit}>
    <label>Your name<input required minLength={2} maxLength={100} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
    <label>Email address<input required type="email" maxLength={254} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label>
    <label>Phone (optional)<input type="tel" maxLength={40} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label>
    <label>I'm interested in<select value={form.intent} onChange={e => setForm({ ...form, intent: e.target.value })}><option value="buyer">Buying this property</option><option value="renter">Renting</option><option value="seller">Selling a property</option><option value="property_management">Property management</option></select></label>
    <label>Preferred area (optional)<input maxLength={160} value={form.preferred_area} onChange={e => setForm({ ...form, preferred_area: e.target.value })} /></label>
    <label>Budget range (optional)<input maxLength={80} value={form.budget_range} onChange={e => setForm({ ...form, budget_range: e.target.value })} placeholder="e.g. $350k–$450k" /></label>
    <label>Timeline (optional)<select value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}><option value="">Choose a timeline</option><option>Immediately</option><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Just researching</option></select></label>
    <label>Message (optional)<textarea rows={3} maxLength={2000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></label>
    <label className={styles.consent}><input required type="checkbox" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} /> I agree that this real-estate business may contact me about the enquiry I submitted.</label>
    <button disabled={busy}>{busy ? "Sending…" : "Send enquiry"}</button>
    {notice && <p role="status" className={styles.notice}>{notice}</p>}
    <small>Your details are sent to the listing agent for this enquiry. Do not include sensitive financial or identity information.</small>
  </form>;
}

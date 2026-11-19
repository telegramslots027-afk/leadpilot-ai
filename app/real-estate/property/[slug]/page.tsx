import { notFound } from "next/navigation";
import PropertyEnquiryForm from "./enquiry-form";
import styles from "./listing.module.css";

export const dynamic = "force-dynamic";

type Property = { id: string; public_slug: string; title: string; city: string; state_code: string; price: number; bedrooms: number; bathrooms: number; square_feet: number | null; description: string };

export default async function PublicPropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return <main className={styles.shell}><p className={styles.notice}>Property pages are not configured on this server yet.</p></main>;
  const response = await fetch(url + "/rest/v1/real_estate_properties?select=id,public_slug,title,city,state_code,price,bedrooms,bathrooms,square_feet,description&public_slug=eq." + encodeURIComponent(slug) + "&status=eq.published&limit=1", { headers: { apikey: key, Authorization: "Bearer " + key }, cache: "no-store" });
  if (!response.ok) return <main className={styles.shell}><p className={styles.notice}>We could not load this property right now. Please try again later.</p></main>;
  const rows = await response.json() as Property[];
  if (!rows.length) notFound();
  const property = rows[0];
  return <main className={styles.shell}>
    <header className={styles.nav}><a href="/" className={styles.brand}>ChatBoost <b>AI</b></a><span>PROPERTY INFORMATION</span></header>
    <section className={styles.hero}><div className={styles.eyebrow}>AGENT-APPROVED LISTING</div><h1>{property.title}</h1><p>{property.city}, {property.state_code}</p><strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(property.price))}</strong></section>
    <section className={styles.layout}><article className={styles.details}><div className={styles.image}>⌂</div><div className={styles.facts}><span>{property.bedrooms} bedrooms</span><span>{property.bathrooms} bathrooms</span><span>{property.square_feet ? property.square_feet.toLocaleString() + " sq ft" : "Size not provided"}</span></div><h2>About this property</h2><p>{property.description || "Contact the listing agent for more information about this property."}</p><small>Property details are provided by the listing agent. Contact the agent to confirm current price, availability and all property information.</small></article>
      <aside className={styles.contact}><div className={styles.eyebrow}>CONTACT THE LISTING AGENT</div><h2>Interested in this property?</h2><p>Send an enquiry and the agent can follow up with you.</p><PropertyEnquiryForm slug={property.public_slug} /></aside></section>
    <footer className={styles.footer}>Powered by ChatBoost AI · Property information supplied by the listing agent.</footer>
  </main>;
}

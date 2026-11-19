"use client";

import { useMemo, useState } from "react";
import "./frontdesk.css";

type Message = { role: "assistant" | "user"; text: string };
const answers: Record<string, string> = {
  hours: "Our sample business is open Monday–Saturday, 8:00 AM–6:00 PM. Replace these hours with your verified business hours.",
  appointment: "I can help you request an appointment. Choose a service and share your preferred date in the enquiry form below. A team member must confirm the booking.",
  price: "Prices depend on the service you need. I can collect your requirements so the business can send an accurate quote.",
  human: "Of course. Leave your contact details in the enquiry form and the team can follow up with you.",
  location: "This demo uses sample business information. A real workspace would answer from the business's approved address and service area."
};
function replyFor(input: string) {
  const q = input.toLowerCase();
  if (/hour|open|close|time/.test(q)) return answers.hours;
  if (/appoint|book|schedule|visit/.test(q)) return answers.appointment;
  if (/price|cost|how much|quote/.test(q)) return answers.price;
  if (/human|person|staff|agent|someone/.test(q)) return answers.human;
  if (/where|address|location/.test(q)) return answers.location;
  return "Thanks for your question. I'm the Ryan Corp AI FrontDesk preview. In a configured business account, I would use the company's approved FAQs and service details. You can also ask about opening hours, appointments, pricing or speaking to a person.";
}

export default function FrontDeskPage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hello! Welcome to Brightside Services. How can I help you today?" }
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [need, setNeed] = useState("");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const copy = useMemo(() => lang === "en" ? {
    badge: "RYAN CORP · PRODUCT PREVIEW", title: "Never miss a customer enquiry.", intro: "A practical AI front desk for small businesses. Answer common questions, capture enquiries and help customers take the next step — even after closing time.",
    demo: "Try the interactive preview", label: "Brightside Services · Sample business", online: "Preview assistant", placeholder: "Ask about hours, prices or appointments…", send: "Send", form: "Request a callback", formIntro: "This preview does not send or store your details. A live customer workspace will securely route enquiries to the business.", name: "Your name", email: "Email address", need: "What can we help with?", submit: "Preview request", sample: "Sample details only · no message is sent", features: ["Answers approved FAQs", "Collects customer enquiries", "Helps request appointments", "Hands complex questions to staff"], pricing: "Simple plans to test", plans: ["Starter · $39/mo", "Growth · $79/mo", "Business · $149/mo"], foot: "Illustrative plans only. Pricing, AI integrations, secure data storage, messaging channels and payments are not live yet."
  } : {
    badge: "RYAN CORP · APERÇU DU PRODUIT", title: "Ne manquez plus aucune demande client.", intro: "Un accueil IA pratique pour les petites entreprises. Répondez aux questions fréquentes, recueillez les demandes et aidez les clients à passer à l'étape suivante, même après la fermeture.",
    demo: "Essayez l'aperçu interactif", label: "Brightside Services · Entreprise fictive", online: "Assistant de démonstration", placeholder: "Heures, tarifs ou rendez-vous…", send: "Envoyer", form: "Demander un rappel", formIntro: "Cet aperçu n'envoie ni n'enregistre vos coordonnées. Un compte actif transmettra les demandes de manière sécurisée.", name: "Votre nom", email: "Adresse e-mail", need: "Comment pouvons-nous aider ?", submit: "Aperçu de demande", sample: "Données fictives · aucun message envoyé", features: ["Répond aux questions validées", "Recueille les demandes clients", "Aide à demander un rendez-vous", "Transmet les cas complexes à l'équipe"], pricing: "Offres simples à tester", plans: ["Starter · 39 $/mois", "Growth · 79 $/mois", "Business · 149 $/mois"], foot: "Offres indicatives uniquement. Les intégrations IA, le stockage sécurisé, les canaux de messagerie et les paiements ne sont pas encore actifs."
  }, [lang]);
  function send(text = input) {
    const value = text.trim();
    if (!value) return;
    setMessages(current => [...current, { role: "user", text: value }, { role: "assistant", text: replyFor(value) }]);
    setInput("");
  }
  return <main className="rf-page">
    <nav className="rf-nav"><a className="rf-brand" href="/"><span>R</span> RYAN CORP</a><div className="rf-nav-right"><span>AI FRONTDESK</span><button onClick={() => setLang(lang === "en" ? "fr" : "en")}>{lang === "en" ? "FR" : "EN"}</button></div></nav>
    <section className="rf-hero">
      <div className="rf-copy"><div className="rf-kicker"><i/> {copy.badge}</div><h1>{copy.title}</h1><p>{copy.intro}</p><a className="rf-primary" href="#try">{copy.demo} ↓</a><div className="rf-proof">{copy.features.map((f,i)=><span key={i}>✓ {f}</span>)}</div></div>
      <div className="rf-chat-card" id="try"><div className="rf-chat-head"><div className="rf-avatar">B</div><div><b>{copy.label}</b><small><i/> {copy.online}</small></div><span className="rf-dots">•••</span></div><div className="rf-messages">{messages.map((m,i)=><div key={i} className={"rf-msg "+m.role}><span>{m.text}</span></div>)}</div><div className="rf-prompts"><button onClick={()=>send(lang==="en"?"What are your opening hours?":"Quels sont vos horaires ?")}>{lang==="en"?"Opening hours":"Horaires"}</button><button onClick={()=>send(lang==="en"?"Can I book an appointment?":"Puis-je prendre rendez-vous ?")}>{lang==="en"?"Book appointment":"Rendez-vous"}</button><button onClick={()=>send(lang==="en"?"Can I speak to a person?":"Je veux parler à quelqu'un.")}>{lang==="en"?"Speak to a person":"Parler à un agent"}</button></div><form className="rf-input" onSubmit={e=>{e.preventDefault();send();}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder={copy.placeholder}/><button>{copy.send} ↗</button></form><div className="rf-demo-note">DEMO SIMULATION · SAMPLE BUSINESS DATA</div></div>
    </section>
    <section className="rf-lower"><div><div className="rf-kicker">BUILT FOR REAL-WORLD WORKFLOWS</div><h2>Helpful automation, with a human in control.</h2><p>Start with a website assistant and enquiry capture. Add approved business knowledge, team handoff and integrations only when a customer needs them.</p></div><div className="rf-request"><h3>{copy.form}</h3><p>{copy.formIntro}</p><form onSubmit={e=>{e.preventDefault();setNotice(copy.sample);}}><label>{copy.name}<input value={name} onChange={e=>setName(e.target.value)} required/></label><label>{copy.email}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>{copy.need}<textarea value={need} onChange={e=>setNeed(e.target.value)} required rows={3}/></label><button className="rf-primary">{copy.submit}</button>{notice && <small className="rf-notice">{notice}</small>}</form></div></section>
    <section className="rf-pricing"><div className="rf-kicker">{copy.pricing}</div><div className="rf-plans">{copy.plans.map(p=><div key={p}>{p}<small>Proposed pilot pricing</small></div>)}</div><p>{copy.foot}</p></section>
    <footer className="rf-footer">© 2026 Ryan Corp · Practical AI for business</footer>
  </main>;
}

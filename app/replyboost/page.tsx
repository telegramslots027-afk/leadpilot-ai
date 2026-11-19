"use client";

import { useMemo, useState } from "react";

type Scenario = "availability" | "price" | "followup" | "details" | "appointment" | "objection";
type Tone = "Friendly" | "Professional" | "Confident";
type Language = "English" | "Spanish";

const labels: Record<Scenario, string> = {
  availability: "Product or vehicle availability",
  price: "Price and discount question",
  followup: "Follow up with a quiet lead",
  details: "Request for more information",
  appointment: "Invite the customer to book a visit",
  objection: "Respond to hesitation"
};

function makeReply(scenario: Scenario, tone: Tone, language: Language, customer: string, item: string, business: string, detail: string) {
  const name = customer.trim() || (language === "Spanish" ? "Hola" : "there");
  const product = item.trim() || (language === "Spanish" ? "el producto" : "the item");
  const company = business.trim() || (language === "Spanish" ? "nuestro equipo" : "our team");
  const extra = detail.trim();
  const en: Record<Scenario, string> = {
    availability: `Hi ${name}, thanks for reaching out to ${company}! ${product} is currently listed as available. I’d be happy to confirm the latest status and answer any questions. Would you like more details or to arrange a time to see it?`,
    price: `Hi ${name}, thanks for your interest in ${product}. I understand that getting the right value matters. The current price and any available offers can be reviewed with you so there are no surprises. Is there a budget or price range you’re hoping to stay within?`,
    followup: `Hi ${name}, I wanted to follow up on your interest in ${product}. I know things get busy, so there’s no pressure. Are you still considering it, or would another option be more helpful? I’m happy to help either way.`,
    details: `Hi ${name}, absolutely — I’d be glad to help with ${product}. ${extra || "Tell me which details matter most to you, and I’ll make sure you get clear, accurate information."} Is there anything specific you’d like me to check?`,
    appointment: `Hi ${name}, thanks for considering ${product}! The easiest next step is to arrange a time that works for you. Would you prefer a weekday or weekend visit? I can help coordinate the details.`,
    objection: `Hi ${name}, I appreciate you being upfront. It makes sense to take your time before making a decision about ${product}. What is your biggest concern right now? I can clarify the details and help you compare your options without any pressure.`
  };
  const es: Record<Scenario, string> = {
    availability: `Hola ${name}, ¡gracias por contactar a ${company}! ${product} aparece actualmente como disponible. Con gusto puedo confirmar el estado más reciente y responder tus preguntas. ¿Quieres más información o prefieres coordinar una visita?`,
    price: `Hola ${name}, gracias por tu interés en ${product}. Entiendo que buscas el mejor valor. Podemos revisar el precio actual y las ofertas disponibles con claridad. ¿Tienes un presupuesto o rango de precio en mente?`,
    followup: `Hola ${name}, quería dar seguimiento a tu interés en ${product}. Sé que a veces estamos ocupados, así que no hay presión. ¿Todavía lo estás considerando o te ayudaría conocer otra opción? Estoy aquí para ayudarte.`,
    details: `Hola ${name}, ¡por supuesto! Con gusto te ayudo con información sobre ${product}. ${extra || "Dime qué detalles son más importantes para ti y buscaré información clara y precisa."} ¿Hay algo específico que quieras que revise?`,
    appointment: `Hola ${name}, ¡gracias por considerar ${product}! El siguiente paso más sencillo es coordinar una hora que te convenga. ¿Prefieres una visita entre semana o durante el fin de semana?`,
    objection: `Hola ${name}, gracias por compartir tus dudas. Es razonable tomarse el tiempo necesario antes de decidir sobre ${product}. ¿Cuál es tu principal preocupación? Puedo aclarar la información y ayudarte a comparar opciones, sin presión.`
  };
  let result = (language === "Spanish" ? es : en)[scenario];
  if (tone === "Friendly") result += language === "Spanish" ? "\n\n¡Que tengas un excelente día!" : "\n\nHope you have a great day!";
  if (tone === "Confident") result += language === "Spanish" ? "\n\nEstoy listo para ayudarte con el siguiente paso cuando tú quieras." : "\n\nI’m ready to help with the next step whenever you are.";
  if (tone === "Professional") result += language === "Spanish" ? "\n\nSaludos cordiales." : "\n\nBest regards.";
  return result;
}

export default function ReplyBoost() {
  const [scenario, setScenario] = useState<Scenario>("availability");
  const [tone, setTone] = useState<Tone>("Professional");
  const [language, setLanguage] = useState<Language>("English");
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [business, setBusiness] = useState("");
  const [detail, setDetail] = useState("");
  const [copied, setCopied] = useState(false);
  const reply = useMemo(() => makeReply(scenario, tone, language, customer, item, business, detail), [scenario, tone, language, customer, item, business, detail]);

  async function copyReply() {
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="rb-page">
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #080d19; color: #edf2ff; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        .rb-page { min-height: 100vh; background: radial-gradient(ellipse at 85% 0%, #192b52 0, transparent 42%), #080d19; padding: 28px 18px 60px; }
        .rb-wrap { max-width: 1080px; margin: 0 auto; }
        .rb-nav { display:flex; justify-content:space-between; align-items:center; margin-bottom:58px; }
        .rb-brand { font-weight:800; letter-spacing:-.04em; font-size:21px; color:#fff; text-decoration:none; }
        .rb-brand span { color:#8da8ff; }
        .rb-back { color:#aebbd6; text-decoration:none; font-size:14px; }
        .rb-kicker { color:#9bb2ff; font-size:11px; font-weight:800; letter-spacing:.16em; }
        .rb-head { max-width:720px; margin-bottom:30px; }
        .rb-head h1 { font-size:clamp(38px,7vw,64px); line-height:1.02; letter-spacing:-.055em; margin:14px 0; }
        .rb-head p { color:#aab6cc; font-size:16px; line-height:1.7; max-width:650px; }
        .rb-grid { display:grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap:18px; align-items:start; }
        .rb-card { background:rgba(17,26,46,.92); border:1px solid #263653; border-radius:20px; padding:24px; box-shadow:0 18px 60px #0003; }
        .rb-card h2 { margin:0 0 20px; font-size:18px; letter-spacing:-.02em; }
        .rb-field { display:block; margin:0 0 17px; color:#c5d0e5; font-size:13px; font-weight:650; }
        .rb-field input,.rb-field textarea,.rb-field select { display:block; width:100%; margin-top:8px; border:1px solid #334461; background:#0c1425; border-radius:10px; color:#f4f7ff; padding:13px 14px; font:inherit; outline:none; }
        .rb-field input:focus,.rb-field textarea:focus,.rb-field select:focus { border-color:#91aaff; box-shadow:0 0 0 3px #7795ff22; }
        .rb-field textarea { min-height:88px; resize:vertical; }
        .rb-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .rb-output { min-height:250px; white-space:pre-wrap; color:#e4eaff; line-height:1.75; font-size:15px; background:#0a1221; border:1px solid #2d3d5c; border-radius:14px; padding:18px; }
        .rb-copy { border:0; background:linear-gradient(110deg,#7896ff,#a58bff); color:#081021; font-weight:800; border-radius:11px; padding:14px 18px; cursor:pointer; width:100%; margin-top:15px; font-size:14px; }
        .rb-foot { margin-top:22px; color:#7f8eaa; font-size:12px; line-height:1.6; }
        .rb-chip { display:inline-block; padding:7px 10px; border:1px solid #304361; color:#9eb3ff; border-radius:999px; font-size:11px; margin:0 6px 8px 0; }
        @media(max-width:760px) { .rb-nav { margin-bottom:40px; } .rb-grid { grid-template-columns:1fr; } .rb-card { padding:19px; } .rb-row { grid-template-columns:1fr; gap:0; } }
      `}</style>
      <div className="rb-wrap">
        <nav className="rb-nav"><a className="rb-brand" href="/">ReplyBoost<span>AI</span></a><a className="rb-back" href="/">← ChatBoost AI home</a></nav>
        <header className="rb-head">
          <div className="rb-kicker">YOUR SALES REPLY COPILOT</div>
          <h1>Turn customer questions into better conversations.</h1>
          <p>Create clear, professional sales replies in seconds. Choose a situation, add a little context, and copy a ready-to-edit message for your customer.</p>
          <div><span className="rb-chip">English + Español</span><span className="rb-chip">No account required</span><span className="rb-chip">Free demo</span></div>
        </header>
        <section className="rb-grid">
          <div className="rb-card">
            <h2>1. Tell us about the conversation</h2>
            <label className="rb-field">What are you responding to?
              <select value={scenario} onChange={e => setScenario(e.target.value as Scenario)}>{Object.entries(labels).map(([key,label]) => <option key={key} value={key}>{label}</option>)}</select>
            </label>
            <div className="rb-row">
              <label className="rb-field">Reply language<select value={language} onChange={e => setLanguage(e.target.value as Language)}><option>English</option><option>Spanish</option></select></label>
              <label className="rb-field">Tone<select value={tone} onChange={e => setTone(e.target.value as Tone)}><option>Professional</option><option>Friendly</option><option>Confident</option></select></label>
            </div>
            <label className="rb-field">Customer first name<input value={customer} onChange={e => setCustomer(e.target.value)} placeholder="e.g. Alex" /></label>
            <label className="rb-field">Product, vehicle or service<input value={item} onChange={e => setItem(e.target.value)} placeholder="e.g. 2021 Honda Accord" /></label>
            <label className="rb-field">Business name<input value={business} onChange={e => setBusiness(e.target.value)} placeholder="e.g. Northside Motors" /></label>
            <label className="rb-field">Extra details (optional)<textarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="Add verified details you want included. Don't enter private customer information." /></label>
          </div>
          <div className="rb-card">
            <h2>2. Your suggested reply</h2>
            <div className="rb-output" aria-live="polite">{reply}</div>
            <button className="rb-copy" onClick={copyReply}>{copied ? "Copied to clipboard ✓" : "Copy reply"}</button>
            <p className="rb-foot">Review and personalize every message before sending. Confirm availability, prices, discounts and other claims with your business records. This demo uses built-in reply patterns; it does not send messages or connect to customer accounts.</p>
          </div>
        </section>
        <p className="rb-foot" style={{textAlign:"center",marginTop:28}}>ReplyBoost AI · A ChatBoost AI product concept</p>
      </div>
    </main>
  );
}

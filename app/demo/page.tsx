"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./demo.module.css";

type Language = "en" | "es";
type Message = { role: "assistant" | "user"; text: string };
type Vehicle = { id: string; year: number; make: string; model: string; trim: string; price: number; miles: string; fuel: string; body: string; description: string };

const vehicles: Vehicle[] = [
  { id: "V001", year: 2022, make: "Toyota", model: "Camry", trim: "SE", price: 24900, miles: "31,200", fuel: "Gasoline", body: "Sedan", description: "Sporty midsize sedan with a comfortable cabin and modern safety features." },
  { id: "V002", year: 2021, make: "Honda", model: "CR-V", trim: "EX", price: 26800, miles: "38,450", fuel: "Gasoline", body: "SUV", description: "Practical compact SUV with flexible cargo space and a comfortable ride." },
  { id: "V003", year: 2023, make: "Ford", model: "F-150", trim: "XLT", price: 38900, miles: "24,100", fuel: "Gasoline", body: "Truck", description: "Full-size pickup suited to work and everyday driving." }
];

const copy = {
  en: {
    eyebrow: "INTERACTIVE DEALERSHIP PREVIEW",
    title: "Meet the AI assistant for your dealership.",
    intro: "Let a shopper ask about vehicles, price, mileage and next steps. This sample uses fictional inventory and scripted answers to demonstrate the experience.",
    inventory: "Sample inventory", available: "Demo vehicles", chatTitle: "Dealership assistant", online: "Demo mode · no live inventory",
    welcome: "Hi! Welcome to the dealership. I can help with the sample vehicles, mileage, listed prices and arranging a next step. What are you looking for?",
    placeholder: "Ask about a vehicle...",
    send: "Send", quick: ["Do you have an SUV?", "What is the Camry price?", "Can I schedule a test drive?", "Do you offer financing?"],
    leadTitle: "A shopper is interested", leadText: "This is an example of the details a sales team could collect after a conversation.",
    name: "Sample lead", interest: "Vehicle of interest", next: "Suggested next step", nextValue: "Salesperson confirms availability and test-drive options.",
    disclaimer: "Demo only: vehicle details and prices are fictional. No inventory lookup, lead storage, messaging, test-drive booking or financing decision is connected.",
    plans: "View subscription plans", home: "ChatBoost AI home", language: "Español",
    footer: "A product preview, not a live dealership system."
  },
  es: {
    eyebrow: "VISTA PREVIA INTERACTIVA PARA CONCESIONARIOS",
    title: "Conoce el asistente de IA para tu concesionario.",
    intro: "Permite que un comprador pregunte por vehículos, precios, kilometraje y próximos pasos. Este ejemplo utiliza inventario ficticio y respuestas de demostración.",
    inventory: "Inventario de ejemplo", available: "Vehículos de demostración", chatTitle: "Asistente del concesionario", online: "Modo demo · sin inventario en vivo",
    welcome: "¡Hola! Bienvenido al concesionario. Puedo ayudarte con los vehículos de ejemplo, kilometraje, precios publicados y próximos pasos. ¿Qué buscas?",
    placeholder: "Pregunta por un vehículo...",
    send: "Enviar", quick: ["¿Tienen una SUV?", "¿Cuál es el precio del Camry?", "¿Puedo programar una prueba de manejo?", "¿Ofrecen financiación?"],
    leadTitle: "Un comprador está interesado", leadText: "Este es un ejemplo de la información que el equipo de ventas podría recopilar.",
    name: "Cliente de ejemplo", interest: "Vehículo de interés", next: "Próximo paso sugerido", nextValue: "Un vendedor confirma disponibilidad y opciones para una prueba de manejo.",
    disclaimer: "Solo demostración: los vehículos y precios son ficticios. No hay conexión con inventario, almacenamiento de clientes, mensajería, reservas ni decisiones de financiación.",
    plans: "Ver planes de suscripción", home: "Inicio de ChatBoost AI", language: "English",
    footer: "Vista previa del producto, no un sistema activo de concesionario."
  }
};

function answer(message: string, language: Language) {
  const q = message.toLowerCase();
  if (language === "es") {
    if (q.includes("suv") || q.includes("cr-v") || q.includes("camioneta")) return "Sí. En este inventario de demostración tenemos una Honda CR-V EX 2021 por $26,800, con 38,450 millas. Es un vehículo de ejemplo; confirma siempre el inventario real con el concesionario.";
    if (q.includes("camry") || q.includes("precio") || q.includes("cuánto")) return "El Toyota Camry SE 2022 aparece en este ejemplo por $24,900 y tiene 31,200 millas. El precio y la disponibilidad reales deben ser confirmados por el equipo de ventas.";
    if (q.includes("prueba") || q.includes("manejo") || q.includes("cita")) return "Puedo registrar el interés en esta demostración. Un vendedor tendría que confirmar la disponibilidad y coordinar la prueba de manejo; esta vista previa no crea reservas.";
    if (q.includes("financ") || q.includes("crédito") || q.includes("credito")) return "Las opciones de financiación dependen del concesionario y de la aprobación del prestamista. No puedo prometer una tasa ni una aprobación. Un asesor de ventas puede explicar las opciones disponibles.";
    return "Gracias por tu pregunta. Puedo responder usando la información ficticia de estos vehículos de demostración. Para disponibilidad, condiciones o detalles finales, el equipo del concesionario debe confirmarlos.";
  }
  if (q.includes("suv") || q.includes("cr-v") || q.includes("crossover")) return "Yes. This sample inventory includes a 2021 Honda CR-V EX listed at $26,800 with 38,450 miles. This is fictional demo inventory; the dealership would need to confirm real availability.";
  if (q.includes("camry") || q.includes("price") || q.includes("cost") || q.includes("how much")) return "The sample 2022 Toyota Camry SE is listed at $24,900 with 31,200 miles. A real dealership assistant should quote only the current price supplied by the dealer.";
  if (q.includes("test drive") || q.includes("appointment") || q.includes("schedule") || q.includes("see it")) return "I can note the shopper's interest in this demonstration. A salesperson would need to confirm availability and arrange the test drive. This preview does not create bookings.";
  if (q.includes("financ") || q.includes("credit") || q.includes("monthly payment")) return "Financing depends on the dealer's lenders and the buyer's application. I can't promise an approval, rate or monthly payment. A dealership team member can explain current options.";
  if (q.includes("mileage") || q.includes("miles") || q.includes("odometer")) return "The sample Camry has 31,200 miles, the CR-V has 38,450 miles and the F-150 has 24,100 miles. These are fictional example figures.";
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) return "Hello! Are you shopping for a car, SUV or truck? I can help you explore the sample inventory.";
  return "Thanks for your question. I can answer using the fictional sample inventory shown here. For real availability, vehicle condition, fees or final pricing, a dealership employee must confirm the details.";
}

export default function DemoPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: copy.en.welcome }]);
  const [draft, setDraft] = useState("");
  const [leadInterest, setLeadInterest] = useState("2022 Toyota Camry SE");
  const [sent, setSent] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadBusiness, setLeadBusiness] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const t = copy[language];
  const messageCount = useMemo(() => messages.filter((m) => m.role === "user").length, [messages]);

  function switchLanguage() {
    const next = language === "en" ? "es" : "en";
    setLanguage(next);
    setMessages([{ role: "assistant", text: copy[next].welcome }]);
    setSent(false);
  }

  async function send(value?: string) {
    const text = (value ?? draft).trim();
    if (!text || thinking) return;
    const previous = messages.slice(-8).map((item) => ({ role: item.role, content: item.text }));
    setMessages((items) => [...items, { role: "user", text }]);
    setDraft("");
    setThinking(true);
    if (text.toLowerCase().includes("cr-v") || text.toLowerCase().includes("suv")) setLeadInterest("2021 Honda CR-V EX");
    else if (text.toLowerCase().includes("f-150") || text.toLowerCase().includes("truck")) setLeadInterest("2023 Ford F-150 XLT");
    else if (text.toLowerCase().includes("camry")) setLeadInterest("2022 Toyota Camry SE");
    setSent(false);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: previous,
          businessName: "Sample dealership",
          businessContext: vehicles.map((v) => v.year + " " + v.make + " " + v.model + " " + v.trim + ": $" + v.price + ", " + v.miles + " miles. " + v.description).join("\n"),
          language
        })
      });
      const data = await response.json();
      const reply = data.mode === "ai" && typeof data.reply === "string" ? data.reply : answer(text, language);
      setMessages((items) => [...items, { role: "assistant", text: reply }]);
    } catch {
      setMessages((items) => [...items, { role: "assistant", text: answer(text, language) }]);
    } finally {
      setThinking(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          business: leadBusiness,
          message: "Interested in: " + leadInterest + ". " + leadMessage
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to submit your request.");
      setSent(true);
      setLeadStatus(language === "en" ? "Thanks — your request was received." : "Gracias — recibimos tu solicitud.");
    } catch (error) {
      setLeadStatus(error instanceof Error ? error.message : "Unable to submit your request.");
    }
  }

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/" className={styles.brand}><span className={styles.mark}>C</span>ChatBoost<span>AI</span></a>
        <div className={styles.navActions}>
          <a href="/">{t.home}</a>
          <a href="/pricing">{t.plans}</a>
          <button type="button" onClick={switchLanguage}>{t.language}</button>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.eyebrow}><span />{t.eyebrow}</div>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <div className={styles.heroPills}><span>24/7-style demo experience</span><span>English + Español</span><span>Mobile-friendly</span></div>
      </header>

      <section className={styles.workspace}>
        <div className={styles.inventory}>
          <div className={styles.sectionHead}><div><span className={styles.kicker}>{t.inventory}</span><h2>{t.available}</h2></div><span className={styles.sample}>SAMPLE DATA</span></div>
          <div className={styles.vehicleList}>
            {vehicles.map((vehicle) => (
              <article className={styles.vehicle} key={vehicle.id}>
                <div className={styles.vehicleVisual}><span>{vehicle.body === "SUV" ? "SUV" : vehicle.body === "Truck" ? "TRUCK" : "SEDAN"}</span><b>{vehicle.make.slice(0,1)}{vehicle.model.slice(0,1)}</b></div>
                <div className={styles.vehicleInfo}>
                  <span className={styles.stock}>DEMO VEHICLE · {vehicle.id}</span>
                  <h3>{vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}</h3>
                  <p>{vehicle.description}</p>
                  <div className={styles.specs}><span>{vehicle.miles} mi</span><span>{vehicle.fuel}</span></div>
                  <strong>{vehicle.price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</strong>
                  <button type="button" onClick={() => send(language === "en" ? "Tell me about the " + vehicle.make + " " + vehicle.model : "Háblame del " + vehicle.make + " " + vehicle.model)}>{language === "en" ? "Ask about this vehicle →" : "Preguntar por este vehículo →"}</button>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.inventoryNote}>{t.disclaimer}</p>
        </div>

        <aside className={styles.chatPanel}>
          <div className={styles.chatHeader}><div className={styles.botMark}>✦</div><div><b>{t.chatTitle}</b><small><i />{t.online}</small></div><span className={styles.demoBadge}>LIVE PREVIEW</span></div>
          <div className={styles.chatBody} aria-live="polite">
            {messages.map((message, index) => <div key={index} className={message.role === "user" ? styles.userRow : styles.assistantRow}><div className={styles.bubble}>{message.text}</div></div>)}
          </div>
          <div className={styles.quickPrompts}>{t.quick.map((item) => <button key={item} type="button" onClick={() => send(item)}>{item}</button>)}</div>
          <form className={styles.composer} onSubmit={(event) => { event.preventDefault(); send(); }}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={t.placeholder} aria-label={t.placeholder}/>
            <button type="submit" disabled={!draft.trim()}>{t.send}</button>
          </form>
          <div className={styles.chatFooter}>CHATBOOST AI · {messageCount} {language === "en" ? "questions" : "preguntas"}{thinking ? (language === "en" ? " · assistant is replying…" : " · el asistente está respondiendo…") : ""}</div>
        </aside>
      </section>

      <section className={styles.leadPreview}>
        <div><span className={styles.kicker}>SALES TEAM VIEW</span><h2>{t.leadTitle}</h2><p>{t.leadText}</p></div>
        <form onSubmit={submitLead}>
          <label>{language === "en" ? "Your name" : "Tu nombre"}<input required minLength={2} maxLength={100} value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Alex Morgan" /></label>
          <label>{language === "en" ? "Email address" : "Correo electrónico"}<input required type="email" maxLength={254} value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="alex@example.com" /></label>
          <label>{language === "en" ? "Dealership / business" : "Concesionario / empresa"}<input maxLength={150} value={leadBusiness} onChange={(e) => setLeadBusiness(e.target.value)} placeholder={language === "en" ? "Your business name" : "Nombre de tu empresa"} /></label>
          <label>{t.interest}<input value={leadInterest} readOnly /></label>
          <label>{language === "en" ? "What would you like to know?" : "¿Qué te gustaría saber?"}<textarea rows={2} maxLength={2000} value={leadMessage} onChange={(e) => setLeadMessage(e.target.value)} placeholder={language === "en" ? "I'd like to arrange a test drive…" : "Me gustaría programar una prueba de manejo…"} /></label>
          <button type="submit" disabled={sent}>{sent ? (language === "en" ? "Request received ✓" : "Solicitud recibida ✓") : (language === "en" ? "Send enquiry" : "Enviar solicitud")}</button>
          {leadStatus && <p className={styles.success}>{leadStatus}</p>}
        </form>
      </section>
      <footer className={styles.footer}><a href="/">ChatBoost AI</a><span>{t.footer}</span><a href="/pricing">{t.plans} ↗</a></footer>
    </main>
  );
}

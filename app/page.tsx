"use client";

import { FormEvent, useState } from "react";

type Message = { role: "assistant" | "user"; content: string };

const starters = [
  "What does ChatBoost AI do?",
  "How can it help my business?",
  "How much does it cost?"
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m the ChatBoost AI demo assistant. Ask me how automated customer conversations and lead capture can help your business."
    }
  ]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadBusy, setLeadBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [lead, setLead] = useState({
    name: "",
    email: "",
    business: "",
    message: ""
  });

  async function sendMessage(value?: string) {
    const text = (value ?? prompt).trim();
    if (!text || busy) return;

    setMessages((current) => [...current, { role: "user", content: text }]);
    setPrompt("");
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-8)
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The assistant is unavailable.");
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."
        }
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadBusy(true);
    setNotice("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit your request.");
      setNotice("Thanks! Your inquiry has been received.");
      setLead({ name: "", email: "", business: "", message: "" });
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : "Could not submit your request. Please try again."
      );
    } finally {
      setLeadBusy(false);
    }
  }

  return (
    <main>
      <nav className="nav wrap">
        <a className="brand" href="#" aria-label="ChatBoost AI home">
          <span className="brand-mark">C</span>
          <span>ChatBoost<span className="brand-accent">AI</span></span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="/replyboost">Reply generator</a><a href="/demo">Live demo</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/pricing">Pricing</a>
          <a className="nav-cta" href="#contact">Get early access <span>↗</span></a>
        </div>
      </nav>

      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> AI CUSTOMER CONVERSATIONS</div>
          <h1>Turn more website enquiries into <span>real customers.</span></h1>
          <p className="hero-text">
            Meet the AI assistant that helps dealerships and small businesses answer questions,
            capture leads and keep conversations moving — even when your team is away.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/demo">Try the demo <span>→</span></a>
            <a className="button button-quiet" href="#demo">See small-business chat preview</a>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars"><i>✦</i><i>●</i><i>◆</i></div>
            <span>Built for teams that want to respond faster.</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="glow-ball">✳</div>
          <div className="floating-card card-top"><span className="mini-icon">✦</span><span><b>AI assistant</b><small>Ready to help</small></span><span className="online-dot" /></div>
          <div className="floating-card card-bottom"><span className="metric-icon">↗</span><span><b>New lead captured</b><small>Website inquiry · just now</small></span></div>
          <div className="visual-caption">YOUR ALWAYS-ON CUSTOMER ASSISTANT</div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="wrap trust-inner">
          <span>ONE SMARTER WAY TO HANDLE</span>
          <b>Customer questions</b><b>Lead capture</b><b>Faster replies</b><b>More opportunities</b>
        </div>
      </section>

      <section className="section wrap" id="features">
        <div className="section-heading">
          <div className="eyebrow">LESS REPETITION. MORE MOMENTUM.</div>
          <h2>One simple workspace for your daily sales.</h2>
          <p>Bring enquiries, customer follow-ups, products, orders and marketing drafts into one mobile-friendly business desk.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon">✧</span><h3>AI customer assistant</h3><p>Draft helpful replies and answer common questions using business-approved information.</p><span className="feature-number">01 / RESPOND</span></article>
          <article className="feature-card"><span className="feature-icon">⌁</span><h3>Leads, quotes and follow-ups</h3><p>Keep customer details and next steps organized so warm enquiries do not get forgotten.</p><span className="feature-number">02 / SELL</span></article>
          <article className="feature-card"><span className="feature-icon">◷</span><h3>Products, orders and stock</h3><p>Track what you sell, what customers order and which products need restocking.</p><span className="feature-number">03 / OPERATE</span></article>
        </div>
      </section>

      <section className="demo-section" id="demo">
        <div className="wrap demo-layout">
          <div className="demo-copy">
            <div className="eyebrow">TAKE IT FOR A SPIN</div>
            <h2>Meet your new first line of support.</h2>
            <p>Ask a question in the demo. ChatBoost AI can explain the product and show how a business assistant can guide a visitor toward the next step.</p>
            <div className="demo-note"><span>✦</span> Add your own FAQs and AI provider key to personalize responses.</div>
          </div>
          <div className="chat-window">
            <div className="chat-head">
              <div className="chat-avatar">C</div>
              <div><b>ChatBoost AI</b><small><span className="online-dot" /> Online demo assistant</small></div>
              <span className="chat-menu">•••</span>
            </div>
            <div className="chat-messages" aria-live="polite">
              {messages.map((message, index) => (
                <div key={index} className={`message-row ${message.role}`}>
                  {message.role === "assistant" && <span className="message-avatar">C</span>}
                  <div className="message-bubble">{message.content}</div>
                </div>
              ))}
              {busy && <div className="typing">ChatBoost AI is thinking<span>•••</span></div>}
            </div>
            <div className="suggestions">
              {starters.map((starter) => (
                <button key={starter} type="button" onClick={() => sendMessage(starter)} disabled={busy}>{starter}</button>
              ))}
            </div>
            <form className="chat-input" onSubmit={(event) => { event.preventDefault(); void sendMessage(); }}>
              <input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask me anything..." aria-label="Message ChatBoost AI" />
              <button type="submit" disabled={busy || !prompt.trim()} aria-label="Send message">↑</button>
            </form>
            <div className="chat-foot">POWERED BY CHATBOOST AI</div>
          </div>
        </div>
      </section>

      <section className="section wrap contact-section" id="contact">
        <div className="contact-copy">
          <div className="eyebrow">GET EARLY ACCESS</div>
          <h2>Let’s make every visitor count.</h2>
          <p>Tell us a little about your business. We’ll follow up when early access is available.</p>
          <div className="contact-detail"><span>✉</span> A real person will review your inquiry.</div>
        </div>
        <form className="lead-form" onSubmit={submitLead}>
          <label>Your name<input required minLength={2} value={lead.name} onChange={(event) => setLead({ ...lead, name: event.target.value })} placeholder="Jane Smith" /></label>
          <label>Work email<input required type="email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} placeholder="jane@company.com" /></label>
          <label>Business name<input value={lead.business} onChange={(event) => setLead({ ...lead, business: event.target.value })} placeholder="Your company" /></label>
          <label>What would you like to improve?<textarea rows={3} value={lead.message} onChange={(event) => setLead({ ...lead, message: event.target.value })} placeholder="Tell us about your customer support needs..." /></label>
          <button className="button button-primary submit-button" disabled={leadBusy}>{leadBusy ? "Sending..." : "Request early access"} <span>→</span></button>
          {notice && <p className="form-notice" role="status">{notice}</p>}
          <small className="privacy-note">By submitting, you agree that ChatBoost AI may contact you about early access.</small>
        </form>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner"><a className="brand" href="#"><span className="brand-mark">C</span><span>ChatBoost<span className="brand-accent">AI</span></span></a><span>Thoughtful conversations. Better business.</span><span>© {new Date().getFullYear()} ChatBoost AI</span></div>
      </footer>
    </main>
  );
}

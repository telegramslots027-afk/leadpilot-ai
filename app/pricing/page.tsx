"use client";

import styles from "./pricing.module.css";

const plans = [
  { name: "Solo", local: "5,000–7,500 FCFA", global: "$9–$15", detail: "For a one-person business getting organized.", items: ["Customer and lead list", "Product catalogue", "Basic order tracking", "Reply and social post templates"] },
  { name: "Business", local: "12,500–20,000 FCFA", global: "$29–$49", detail: "For small teams handling enquiries every day.", featured: true, items: ["Everything in Solo", "Follow-up task management", "Team workspace (planned)", "AI drafting allowance (planned)", "Sales and stock reports"] },
  { name: "Growth", local: "30,000–50,000 FCFA", global: "$79–$99", detail: "For growing teams with more activity.", items: ["Everything in Business", "Multiple operators (planned)", "Advanced exports and reports", "Higher AI usage allowance", "Priority onboarding (planned)"] }
];

export default function PricingPage() {
  return <main className={styles.page}>
    <nav className={styles.nav}><a href="/" className={styles.brand}>✦ ChatBoost<span>AI</span></a><a href="/dashboard">Explore dashboard demo ↗</a></nav>
    <header className={styles.hero}><div className={styles.kicker}>SIMPLE PLANS FOR GROWING BUSINESSES</div><h1>One business desk.<br/><span>Room to grow.</span></h1><p>Proposed pilot pricing for Cameroon and international businesses. We are validating these prices with early users before enabling subscriptions.</p><div className={styles.notice}>Pilot pricing hypothesis · Checkout is not active · No payment is being collected</div></header>
    <section className={styles.grid}>{plans.map(plan => <article key={plan.name} className={plan.featured ? styles.featured : ""}><div className={styles.planName}>{plan.name}{plan.featured && <span>EARLY ACCESS PICK</span>}</div><p>{plan.detail}</p><div className={styles.price}>{plan.local}<small>Cameroon / month</small></div><div className={styles.priceAlt}>{plan.global}<small>International / month</small></div><ul>{plan.items.map(item => <li key={item}>✓ {item}</li>)}</ul><a href="/#contact">Request pilot access ↗</a></article>)}</section>
    <footer className={styles.footer}>Prices are research hypotheses, not confirmed offers. Final prices may change after customer interviews, payment-fee checks and AI usage-cost modelling. Third-party messaging and AI usage may carry separate charges.</footer>
  </main>;
}

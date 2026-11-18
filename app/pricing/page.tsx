"use client";

import styles from "./pricing.module.css";

const plans = [
  { name: "Starter", price: "$19", detail: "For a small business getting started with structured customer replies.", items: ["One business demo workspace (planned)", "FAQ and reply library", "Basic lead organization (planned)", "English and Spanish content templates"] },
  { name: "Growth", price: "$49", detail: "For teams handling regular website and sales enquiries.", featured: true, items: ["Everything in Starter", "Expanded lead follow-up tools (planned)", "Business-specific AI assistant (planned)", "Team access (planned)", "Usage limits and reporting (planned)"] },
  { name: "Dealership", price: "$99", detail: "For independent dealerships managing vehicle enquiries.", items: ["Everything in Growth", "Vehicle catalogue assistant (planned)", "Sales enquiry summaries (planned)", "Multiple sales users (planned)", "Priority onboarding (planned)"] }
];

export default function PricingPage() {
  return <main className={styles.page}>
    <nav className={styles.nav}><a href="/" className={styles.brand}>✦ ChatBoost<span>AI</span></a><a href="/demo">Try the bilingual demo ↗</a></nav>
    <header className={styles.hero}><div className={styles.kicker}>PROPOSED US MONTHLY SUBSCRIPTIONS</div><h1>Simple plans.<br/><span>More conversations.</span></h1><p>Subscription pricing concepts for US small businesses and independent car dealerships. We will validate the plans with founding customers before enabling checkout.</p><div className={styles.notice}>Pricing hypothesis only · Checkout is not active · No payment is being collected</div></header>
    <section className={styles.grid}>{plans.map(plan => <article key={plan.name} className={plan.featured ? styles.featured : ""}><div className={styles.planName}>{plan.name}{plan.featured && <span>PROPOSED POPULAR PLAN</span>}</div><p>{plan.detail}</p><div className={styles.price}>{plan.price}<small>USD / month · proposed</small></div><ul>{plan.items.map(item => <li key={item}>✓ {item}</li>)}</ul><a href="/demo">Try the product demo ↗</a></article>)}</section>
    <footer className={styles.footer}>These are unvalidated pricing hypotheses, not active offers. Features marked planned are not yet available. No subscription, payment or automatic renewal can be started from this page. Final prices will depend on hosting, AI usage, support and customer feedback. Third-party AI and messaging fees may be separate.</footer>
  </main>;
}

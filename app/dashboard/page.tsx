"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./dashboard.module.css";

type Product = { id: number; name: string; sku: string; price: number; stock: number };
type Order = { id: string; customer: string; item: string; amount: number; status: "Pending" | "Confirmed" | "Fulfilled" };

const initialProducts: Product[] = [
  { id: 1, name: "Classic sneakers", sku: "SNK-01", price: 28000, stock: 12 },
  { id: 2, name: "Everyday backpack", sku: "BAG-02", price: 18500, stock: 4 },
  { id: 3, name: "Wireless earbuds", sku: "ELC-03", price: 22000, stock: 2 },
  { id: 4, name: "Cotton T-shirt", sku: "APP-04", price: 8500, stock: 26 }
];
const initialOrders: Order[] = [
  { id: "CB-1048", customer: "Mireille T.", item: "Classic sneakers", amount: 28000, status: "Pending" },
  { id: "CB-1047", customer: "Daniel K.", item: "Wireless earbuds", amount: 22000, status: "Confirmed" },
  { id: "CB-1046", customer: "Sarah N.", item: "Everyday backpack", amount: 18500, status: "Fulfilled" }
];
const money = (value: number) => new Intl.NumberFormat("en-CM", { maximumFractionDigits: 0 }).format(value) + " FCFA";

export default function DashboardPage() {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [tab, setTab] = useState("Overview");
  const [showProduct, setShowProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("10000");
  const [productStock, setProductStock] = useState("5");
  const [draft, setDraft] = useState("Your new collection is here. Send us a message to order today!");
  const [copied, setCopied] = useState(false);

  const lowStock = products.filter((product) => product.stock <= 4).length;
  const revenue = useMemo(() => orders.filter((order) => order.status === "Fulfilled").reduce((sum, order) => sum + order.amount, 0), [orders]);

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!productName.trim()) return;
    setProducts((items) => [...items, { id: Date.now(), name: productName.trim(), sku: "NEW-" + (items.length + 1), price: Number(productPrice) || 0, stock: Math.max(0, Number(productStock) || 0) }]);
    setProductName("");
    setShowProduct(false);
  }

  function nextOrderStatus(id: string) {
    setOrders((items) => items.map((order) => order.id !== id ? order : { ...order, status: order.status === "Pending" ? "Confirmed" : order.status === "Confirmed" ? "Fulfilled" : "Fulfilled" }));
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <a href="/" className={styles.brand}><span>✦</span> ChatBoost<span>AI</span></a>
        <div className={styles.workspaceLabel}>WORKSPACE</div>
        <div className={styles.workspace}><span className={styles.storeIcon}>S</span><span><b>Sample Store</b><small>Demo workspace</small></span><span>⌄</span></div>
        <nav className={styles.nav}>
          {["Overview", "Customers", "Conversations", "Products", "Orders", "Follow-ups", "Marketing", "Reports", "Settings"].map((item, i) => <button key={item} className={tab === item ? styles.active : ""} onClick={() => setTab(item)}><span>{["▦","♙","☏","◇","▤","◷","✧","▥","⚙"][i]}</span>{item}</button>)}
        </nav>
        <div className={styles.sidebarBottom}><div className={styles.plan}> <span>✦</span><b>Explore ChatBoost</b><small>Your sample workspace is ready to explore.</small><a href="/#contact">Request early access ↗</a></div><div className={styles.profile}><span>Y</span><div><b>Demo Owner</b><small>Sample account</small></div><span>•••</span></div></div>
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}><div><span>Workspace /</span> {tab}</div><div className={styles.topActions}><span className={styles.demoTag}>DEMO DATA</span><button onClick={() => setTab("Settings")}>⚙ Settings</button></div></header>
        <div className={styles.content}>
          <div className={styles.pageHeading}><div><div className={styles.kicker}>TUESDAY · SAMPLE WORKSPACE</div><h1>{tab === "Overview" ? "Good afternoon, Demo Owner" : tab}</h1><p>{tab === "Overview" ? "Here’s what’s happening in your business today." : "Explore how ChatBoost brings your daily business work together."}</p></div><button className={styles.primary} onClick={() => { setTab("Products"); setShowProduct(true); }}>＋ Add product</button></div>
          <div className={styles.notice}>This is an interactive preview with sample data. Changes stay in this browser session and are not saved to a real business account.</div>

          {tab === "Overview" && <>
            <div className={styles.metrics}>
              <article><span>Total orders</span><b>{orders.length + 124}</b><small className={styles.positive}>↗ 12.8% <i>vs last month</i></small><div className={styles.metricIcon}>▤</div></article>
              <article><span>Revenue tracked</span><b>{money(revenue + 486000)}</b><small className={styles.positive}>↗ 8.2% <i>vs last month</i></small><div className={styles.metricIcon}>↗</div></article>
              <article><span>Products</span><b>{products.length}</b><small>{lowStock} need stock attention</small><div className={styles.metricIcon}>◇</div></article>
              <article><span>Open follow-ups</span><b>8</b><small>3 due today</small><div className={styles.metricIcon}>◷</div></article>
            </div>
            <div className={styles.twoCols}>
              <section className={styles.panel}><div className={styles.panelHead}><div><h2>Recent orders</h2><p>Keep every sale moving</p></div><button onClick={() => setTab("Orders")}>View all ↗</button></div><div className={styles.tableWrap}><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>{orders.map(order => <tr key={order.id}><td><b>{order.id}</b><small>{order.item}</small></td><td>{order.customer}</td><td>{money(order.amount)}</td><td><span className={styles[order.status.toLowerCase()]}>{order.status}</span></td></tr>)}</tbody></table></div></section>
              <section className={styles.panel}><div className={styles.panelHead}><div><h2>Today’s priorities</h2><p>Small actions, better follow-through</p></div><span className={styles.counter}>3</span></div><div className={styles.taskList}><label><input type="checkbox"/> Reply to 3 new enquiries</label><label><input type="checkbox"/> Confirm payment for CB-1048</label><label><input type="checkbox"/> Reorder wireless earbuds</label><label><input type="checkbox"/> Follow up with 2 warm leads</label></div><div className={styles.panelFoot}>Your daily business checklist</div></section>
            </div>
          </>}

          {tab === "Products" && <section className={styles.panel}><div className={styles.panelHead}><div><h2>Product catalogue</h2><p>Track prices and stock levels</p></div><button className={styles.primary} onClick={() => setShowProduct(!showProduct)}>＋ Add product</button></div>{showProduct && <form className={styles.addForm} onSubmit={addProduct}><input required placeholder="Product name" value={productName} onChange={e => setProductName(e.target.value)}/><input type="number" min="0" placeholder="Price FCFA" value={productPrice} onChange={e => setProductPrice(e.target.value)}/><input type="number" min="0" placeholder="Stock" value={productStock} onChange={e => setProductStock(e.target.value)}/><button className={styles.primary}>Save sample product</button></form>}<div className={styles.tableWrap}><table><thead><tr><th>PRODUCT</th><th>SKU</th><th>PRICE</th><th>IN STOCK</th><th>STATUS</th></tr></thead><tbody>{products.map(p => <tr key={p.id}><td><b>{p.name}</b></td><td>{p.sku}</td><td>{money(p.price)}</td><td>{p.stock}</td><td><span className={p.stock <= 4 ? styles.pending : styles.fulfilled}>{p.stock <= 4 ? "Low stock" : "In stock"}</span></td></tr>)}</tbody></table></div></section>}

          {tab === "Orders" && <section className={styles.panel}><div className={styles.panelHead}><div><h2>Order management</h2><p>Move orders from enquiry to fulfilment</p></div></div><div className={styles.tableWrap}><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEM</th><th>AMOUNT</th><th>STATUS / ACTION</th></tr></thead><tbody>{orders.map(order => <tr key={order.id}><td><b>{order.id}</b></td><td>{order.customer}</td><td>{order.item}</td><td>{money(order.amount)}</td><td><button className={styles.statusButton} onClick={() => nextOrderStatus(order.id)}>{order.status} →</button></td></tr>)}</tbody></table></div></section>}

          {tab === "Marketing" && <section className={styles.panel}><div className={styles.panelHead}><div><h2>Marketing studio</h2><p>Prepare a social post for your next promotion</p></div><span className={styles.demoTag}>TEMPLATE PREVIEW</span></div><label className={styles.fieldLabel}>Your promotional message<textarea rows={5} value={draft} onChange={e => setDraft(e.target.value)}/></label><div className={styles.marketingPreview}><small>FACEBOOK / INSTAGRAM POST PREVIEW</small><p>{draft}</p><b>📩 Send us a message to place your order.</b></div><button className={styles.primary} onClick={() => { void navigator.clipboard?.writeText(draft); setCopied(true); }}>{copied ? "Copied to clipboard ✓" : "Copy draft"}</button><p className={styles.helper}>This preview uses a starter template, not a live AI generation or social-media publishing connection.</p></section>}

          {!["Overview","Products","Orders","Marketing"].includes(tab) && <section className={styles.coming}><div>✦</div><h2>{tab} workspace</h2><p>This module is part of the ChatBoost product plan. The live account, data storage and connected-channel features are still being built.</p><button className={styles.primary} onClick={() => setTab("Overview")}>Back to overview</button></section>}
        </div>
      </section>
    </main>
  );
}

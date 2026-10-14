import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const categories = [
  { name: 'Awards & Recognition', icon: '◆', copy: 'Crystal, acrylic and glass pieces for meaningful milestones.' },
  { name: 'Trophies & Sports', icon: '★', copy: 'Team trophies, medals and tournament awards at any scale.' },
  { name: 'Industrial Plates', icon: '▰', copy: 'Durable panel labels, equipment tags and engraved nameplates.' },
  { name: 'Signs & Nameplates', icon: '▣', copy: 'Professional desk plates, door signs and identification.' },
  { name: 'Personalized Gifts', icon: '✦', copy: 'Purposeful gifts made personal with precision engraving.' },
];

const products = [
  { id: 1, name: 'Vertex Crystal Award', category: 'Awards & Recognition', price: 89, badge: 'Best seller', art: 'crystal', material: 'Optical crystal', lead: '5–7 business days' },
  { id: 2, name: 'Executive Walnut Plaque', category: 'Awards & Recognition', price: 72, badge: 'Popular', art: 'plaque', material: 'American walnut', lead: '4–6 business days' },
  { id: 3, name: 'Champion Column Trophy', category: 'Trophies & Sports', price: 34, badge: 'Team pricing', art: 'trophy', material: 'Metal & marble', lead: '5–8 business days' },
  { id: 4, name: 'Anodized Panel Plate', category: 'Industrial Plates', price: 16, badge: 'Industrial', art: 'plate', material: 'Anodized aluminum', lead: '2–4 business days' },
  { id: 5, name: 'Layered Office Sign', category: 'Signs & Nameplates', price: 28, badge: 'Custom', art: 'sign', material: 'Two-ply acrylic', lead: '3–5 business days' },
  { id: 6, name: 'Engraved Keepsake Box', category: 'Personalized Gifts', price: 48, badge: 'Gift ready', art: 'box', material: 'Hardwood', lead: '4–6 business days' },
];

function Logo({ compact = false }) {
  return <div className={`logo ${compact ? 'logo--compact' : ''}`} aria-label="Awards, Trophies and Treasures">
    <span>AWARDS</span><i /><span>TROPHIES</span><i className="logo__cup">♕</i><span>TREASURES</span>
  </div>;
}

function ProductArt({ type }) {
  return <div className={`product-art product-art--${type}`} aria-hidden="true">
    {type === 'crystal' && <><b /><em>EXCELLENCE<br/><small>2026</small></em></>}
    {type === 'plaque' && <><b /><em>OUTSTANDING<br/>SERVICE</em></>}
    {type === 'trophy' && <><b>★</b><i /><em /></>}
    {type === 'plate' && <><i /><em>PANEL LP-4<br/><small>480V</small></em></>}
    {type === 'sign' && <><b /><em>CONFERENCE<br/>ROOM</em></>}
    {type === 'box' && <><b /><em>J + M</em></>}
  </div>;
}

function App() {
  const [filter, setFilter] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const shown = filter === 'All' ? products : products.filter(p => p.category === filter);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const add = (product) => {
    setCart(items => items.some(i => i.id === product.id)
      ? items.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i)
      : [...items, {...product, qty: 1}]);
    setCartOpen(true);
  };
  const changeQty = (id, delta) => setCart(items => items
    .map(i => i.id === id ? {...i, qty: i.qty + delta} : i)
    .filter(i => i.qty > 0));

  return <>
    <div className="utility"><span>Built for teams, businesses & meaningful moments</span><span>Questions? <a href="mailto:hello@example.com">Contact us</a></span></div>
    <header>
      <a href="#top" className="brand"><Logo compact /></a>
      <nav><a href="#categories">Shop</a><a href="#industrial">Industrial</a><a href="#custom">Custom Engraving</a><a href="#about">About</a></nav>
      <button className="cart-button" onClick={() => {setCheckout(false); setCartOpen(true)}} aria-label={`Cart with ${count} items`}>
        <span>Cart</span><b>{count}</b>
      </button>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">PRECISION ENGRAVING • PROFESSIONAL RESULTS</p>
          <h1>Recognition,<br/><em>made lasting.</em></h1>
          <p className="hero__lede">Custom awards, identification products and personalized pieces—designed with care and engraved to endure.</p>
          <div className="hero__actions"><a className="button button--primary" href="#products">Shop products</a><a className="button button--ghost" href="#custom">Start a custom order</a></div>
          <div className="trust"><span>✓ Proof before production</span><span>✓ Volume pricing</span><span>✓ Made to order</span></div>
        </div>
        <div className="hero__visual">
          <div className="blueprint"><span>PRECISION</span><i/><i/><i/></div>
          <div className="award-scene"><div className="award award--left">ATT</div><div className="award award--main"><small>2026</small><strong>EXCELLENCE</strong><span>AWARD</span></div><div className="award award--right">★</div></div>
          <div className="hero__label"><b>Built to represent your standard.</b><span>Custom engraved • Professionally finished</span></div>
        </div>
      </section>

      <section className="category-section" id="categories">
        <div className="section-heading"><div><p className="eyebrow">SHOP BY PURPOSE</p><h2>Made for the moment.<br/>Built for the work.</h2></div><p>From a career milestone to a control panel, every piece starts with the right material and a clear purpose.</p></div>
        <div className="category-grid">{categories.map(c => <button key={c.name} onClick={() => {setFilter(c.name); document.querySelector('#products').scrollIntoView({behavior:'smooth'})}}><span>{c.icon}</span><h3>{c.name}</h3><p>{c.copy}</p><b>Explore collection →</b></button>)}</div>
      </section>

      <section className="industrial" id="industrial">
        <div className="industrial__visual"><div className="metal plate-one">MAIN DISCONNECT<br/><small>480 VOLTS</small></div><div className="metal plate-two">EQUIPMENT ID<br/><b>A-1047</b></div><div className="metal plate-three">⚡ WARNING</div></div>
        <div><p className="eyebrow eyebrow--light">INDUSTRIAL & IDENTIFICATION</p><h2>Clear identification.<br/>Built for real work.</h2><p>Engraved plates, tags and signs engineered around your dimensions, environment and mounting requirements.</p><ul><li>Custom sizes and materials</li><li>Sequential numbering and serialization</li><li>Adhesive, holes and hardware options</li></ul><a href="#products" className="button button--light" onClick={() => setFilter('Industrial Plates')}>Shop industrial products</a></div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading"><div><p className="eyebrow">FEATURED PRODUCTS</p><h2>Start with something proven.</h2></div><p>Every product can be personalized. Pricing shown includes standard engraving unless noted.</p></div>
        <div className="filters">{['All', ...categories.map(c=>c.name)].map(f => <button className={filter===f?'active':''} key={f} onClick={()=>setFilter(f)}>{f}</button>)}</div>
        <div className="product-grid">{shown.map(p => <article className="product-card" key={p.id}>
          <div className="product-card__image"><span>{p.badge}</span><ProductArt type={p.art}/></div>
          <div className="product-card__body"><p>{p.category}</p><h3>{p.name}</h3><div className="meta"><span>{p.material}</span><span>{p.lead}</span></div><div className="price"><div><small>Starting at</small><b>${p.price.toFixed(2)}</b></div><button onClick={()=>add(p)}>Add to cart</button></div></div>
        </article>)}</div>
      </section>

      <section className="custom" id="custom"><div><p className="eyebrow">CUSTOM ENGRAVING</p><h2>See your idea before we make it.</h2><p>Our upcoming product designer will let you place text and upload a logo directly onto your selected product. For now, add any product to your cart and include your personalization during checkout.</p><a className="button button--primary" href="#products">Choose a product</a></div><div className="designer-mock"><div className="canvas"><span>YOUR LOGO</span><strong>EMPLOYEE OF THE YEAR</strong><small>Alex Morgan • 2026</small></div><div className="designer-tools"><i/><i/><i/><i/></div></div></section>
    </main>

    <footer id="about"><Logo compact/><p>Purposeful recognition and precision engraving for organizations, teams, trades and families.</p><div><a href="#products">Products</a><a href="#custom">Custom orders</a><a href="mailto:hello@example.com">Contact</a></div><small>© 2026 Awards, Trophies & Treasures. All rights reserved.</small></footer>

    {cartOpen && <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setCartOpen(false)}><aside className="drawer">
      <button className="close" onClick={()=>setCartOpen(false)}>×</button>
      {!checkout ? <><p className="eyebrow">YOUR ORDER</p><h2>Shopping cart</h2>{cart.length === 0 ? <div className="empty"><span>◇</span><h3>Your cart is ready for something meaningful.</h3><button className="button button--primary" onClick={()=>setCartOpen(false)}>Browse products</button></div> : <>
        <div className="cart-items">{cart.map(i=><div className="cart-item" key={i.id}><ProductArt type={i.art}/><div><h3>{i.name}</h3><p>${i.price.toFixed(2)} each</p><div className="qty"><button onClick={()=>changeQty(i.id,-1)}>−</button><span>{i.qty}</span><button onClick={()=>changeQty(i.id,1)}>+</button></div></div><b>${(i.price*i.qty).toFixed(2)}</b></div>)}</div>
        <div className="summary"><div><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><p>Shipping and tax calculated at checkout.</p><button className="button button--primary" onClick={()=>setCheckout(true)}>Continue to checkout</button></div>
      </>}</> : <Checkout subtotal={subtotal} onBack={()=>setCheckout(false)}/>} 
    </aside></div>}
  </>;
}

function Checkout({ subtotal, onBack }) {
  const [placed, setPlaced] = useState(false);
  if (placed) return <div className="success"><span>✓</span><p className="eyebrow">DEMO COMPLETE</p><h2>Checkout flow is working.</h2><p>This prototype does not charge a card. Stripe will be connected when the live merchant account is ready.</p><button className="button button--primary" onClick={onBack}>Return to cart</button></div>;
  return <><button className="back" onClick={onBack}>← Back to cart</button><p className="eyebrow">SECURE CHECKOUT</p><h2>Delivery details</h2><form onSubmit={e=>{e.preventDefault(); setPlaced(true)}}>
    <div className="fields"><label>First name<input required placeholder="First name"/></label><label>Last name<input required placeholder="Last name"/></label><label className="wide">Email<input required type="email" placeholder="you@example.com"/></label><label className="wide">Shipping address<input required placeholder="Street address"/></label><label>City<input required/></label><label>ZIP code<input required inputMode="numeric"/></label><label className="wide">Personalization notes<textarea placeholder="Text, logo placement, deadline, or special instructions"/></label></div>
    <div className="payment-placeholder"><span>▣</span><div><b>Stripe payment goes here</b><small>Card, Apple Pay and Google Pay</small></div></div>
    <div className="checkout-total"><span>Order total</span><b>${subtotal.toFixed(2)} + shipping/tax</b></div><button className="button button--primary" type="submit">Preview checkout completion</button>
  </form></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

'use client'
import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// HONEYMOON — Croatia + Montenegro Trip Planner
// Portfolio Demo by Cain Menard
// ============================================================

const DEST = {
  dubrovnik: { label: "Dubrovnik", color: "#2563eb", bg: "#eff6ff", glow: "rgba(37,99,235,0.12)", icon: "🏰" },
  kotor: { label: "Kotor", color: "#d97706", bg: "#fffbeb", glow: "rgba(217,119,6,0.12)", icon: "⛵" },
  split: { label: "Split", color: "#059669", bg: "#ecfdf5", glow: "rgba(5,150,105,0.12)", icon: "🏛" },
  transit: { label: "Transit", color: "#7c3aed", bg: "#faf5ff", glow: "rgba(124,58,237,0.10)", icon: "🚗" },
  travel: { label: "Travel", color: "#64748b", bg: "#f8fafc", glow: "rgba(100,116,139,0.08)", icon: "✈️" },
};

const ITINERARY = [
  { day: 0, date: "Sep 27", location: "Atlanta → Dubrovnik", dest: "travel", activity: "Overnight flight via Delta", dining: "", note: "Gold Medallion — SkyMiles redemption", spa: false, splurge: false, zero: false },
  { day: 1, date: "Sep 28", location: "Dubrovnik", dest: "dubrovnik", activity: "Arrive + Couples Spa", dining: "Light hotel dinner", note: "Sheraton Dubrovnik Riviera — Bonvoy Award", spa: true, splurge: false, zero: false },
  { day: 2, date: "Sep 29", location: "Dubrovnik", dest: "dubrovnik", activity: "City Walls + Old Town exploration", dining: "Nautika — Condé Nast top 6 most romantic worldwide", note: "Tasting menu overlooking Fort Lovrijenac", spa: false, splurge: true, zero: false },
  { day: 3, date: "Sep 30", location: "Dubrovnik", dest: "dubrovnik", activity: "Elaphiti Islands private boat charter", dining: "BOWA Restaurant — boat-access only, Šipan island", note: "Swimming in hidden coves, olive groves, no cars", spa: false, splurge: false, zero: false },
  { day: 4, date: "Oct 1", location: "Dubrovnik", dest: "dubrovnik", activity: "Pelješac Peninsula — wine + oyster day trip", dining: "Oyster farm lunch at Mali Ston Bay", note: "Miloš & Matuško wineries — Dingač reds", spa: false, splurge: false, zero: false },
  { day: 5, date: "Oct 2", location: "Dubrovnik", dest: "dubrovnik", activity: "Rest day — Mt. Srdj cable car at sunset", dining: "Casual dinner", note: "No alarm. No plans. Just exist.", spa: false, splurge: false, zero: true },
  { day: 6, date: "Oct 3", location: "Dubrovnik → Kotor", dest: "transit", activity: "Scenic coastal drive into Montenegro", dining: "Galion — waterfront, lit fortress at night", note: "Hyatt Regency Kotor Bay — King Sea View + Hot Tub", spa: false, splurge: true, zero: false },
  { day: 7, date: "Oct 4", location: "Bay of Kotor", dest: "kotor", activity: "Perast + Our Lady of the Rocks + private sunset boat", dining: "Waterfront dinner in Kotor Old Town", note: "2-hour private charter through the bay at golden hour", spa: false, splurge: false, zero: false },
  { day: 8, date: "Oct 5", location: "Bay of Kotor", dest: "kotor", activity: "Rest day — Couples spa at Hyatt", dining: "Casual dinner", note: "Optional: Budva Old Town + Sveti Stefan viewpoint", spa: true, splurge: false, zero: true },
  { day: 9, date: "Oct 6", location: "Kotor → Split", dest: "transit", activity: "Coastal drive + Makarska Riviera beach lunch", dining: "Hotel dinner at Le Méridien", note: "Le Méridien Split — Bonvoy Award", spa: false, splurge: false, zero: false },
  { day: 10, date: "Oct 7", location: "Split", dest: "split", activity: "Diocletian's Palace + Marjan Hill sunset", dining: "Dvor — Michelin Guide, pine garden over Firule Bay", note: "1,700-year-old Roman palace turned living city", spa: false, splurge: true, zero: false },
  { day: 11, date: "Oct 8", location: "Split", dest: "split", activity: "Blue Lagoon — 3-island boat tour", dining: "Articok — rooftop, truffle pasta", note: "Crystal-clear swimming, lunch on board", spa: false, splurge: false, zero: false },
  { day: 12, date: "Oct 9", location: "Split", dest: "split", activity: "Krka National Park — waterfalls + swimming", dining: "Casual dinner", note: "Boardwalk trails through cascading falls", spa: false, splurge: false, zero: false },
  { day: 13, date: "Oct 10", location: "Split", dest: "split", activity: "Rest day — Couples spa + Trogir + final Riva walk", dining: "Final evening — toast the trip on the Riva", note: "UNESCO medieval town, 30 min from Split", spa: true, splurge: false, zero: true },
  { day: 14, date: "Oct 11", location: "Split → Atlanta", dest: "travel", activity: "Depart", dining: "", note: "", spa: false, splurge: false, zero: false },
];

const BUDGET = [
  { cat: "Flights", item: "Delta ATL ↔ DBV/SPU (2 pax)", est: 0, status: "points", note: "SkyMiles redemption" },
  { cat: "Hotels", item: "Sheraton Dubrovnik Riviera (5 nights)", est: 0, status: "points", note: "Bonvoy Award" },
  { cat: "Hotels", item: "Hyatt Regency Kotor Bay (3 nights)", est: 1140, status: "paid", note: "King Sea View + Hot Tub + Terrace" },
  { cat: "Hotels", item: "Le Méridien Split (4 nights)", est: 0, status: "points", note: "Bonvoy Award" },
  { cat: "Dining", item: "Nautika — Dubrovnik", est: 300, status: "planned", note: "Tasting menu for two" },
  { cat: "Dining", item: "Galion — Kotor", est: 120, status: "planned", note: "Waterfront Mediterranean" },
  { cat: "Dining", item: "Dvor — Split", est: 200, status: "planned", note: "Michelin Guide" },
  { cat: "Experiences", item: "Private sunset boat — Kotor Bay", est: 225, status: "planned", note: "2-3 hour charter" },
  { cat: "Experiences", item: "Pelješac wine + oyster tour", est: 250, status: "planned", note: "Guided, Ston + wineries" },
  { cat: "Experiences", item: "Elaphiti Islands private boat", est: 400, status: "planned", note: "Half-day charter" },
  { cat: "Experiences", item: "Blue Lagoon / 3-island tour", est: 150, status: "planned", note: "" },
  { cat: "Spa", item: "3 couples spa sessions", est: 450, status: "planned", note: "Day 1, 8, 13" },
  { cat: "Transport", item: "Rental car + gas + tolls", est: 375, status: "planned", note: "Cross-border Montenegro OK" },
  { cat: "Daily", item: "Food, drinks, taxis, misc", est: 1560, status: "planned", note: "~$120/day × 13 days" },
];

const RESEARCH = [
  { name: "Nautika", dest: "dubrovnik", type: "restaurant", price: "€€€€", fav: true, desc: "Condé Nast top 6 most romantic restaurants worldwide. Terrace over Fort Lovrijenac. Tasting menus with Vis lobster.", tip: "Book 4-6 weeks ahead. Request terrace. Mention honeymoon." },
  { name: "Restaurant 360", dest: "dubrovnik", type: "restaurant", price: "€€€€", fav: false, desc: "Michelin-listed. Built into the city walls themselves.", tip: "" },
  { name: "Konoba Jezuite", dest: "dubrovnik", type: "restaurant", price: "€€", fav: false, desc: "Romantic stone terrace hidden away from crowds.", tip: "Great casual evening option" },
  { name: "BOWA Restaurant", dest: "dubrovnik", type: "restaurant", price: "€€€", fav: true, desc: "Accessible only by boat on Šipan island. Private cabanas among olive and fig trees.", tip: "Arrange through private boat charter" },
  { name: "Galion", dest: "kotor", type: "restaurant", price: "€€€", fav: true, desc: "Floor-to-ceiling glass facing Kotor's lit-up fortress walls. Contemporary Mediterranean seafood.", tip: "Book ahead. Montenegro pricing = incredible value." },
  { name: "Catovica Mlini", dest: "kotor", type: "restaurant", price: "€€€", fav: false, desc: "Restored 200-year-old mill. Peacocks wandering. Streams running through. World-class.", tip: "Most unique restaurant setting in Montenegro" },
  { name: "Dvor", dest: "split", type: "restaurant", price: "€€€€", fav: true, desc: "Michelin Guide. Pine-shaded garden overlooking Firule Bay. Chef Hrvoje Zirojević.", tip: "Book in advance. Request garden/sea view." },
  { name: "Zoi", dest: "split", type: "restaurant", price: "€€€€", fav: false, desc: "Inside Diocletian's Palace walls. Harbor views. 7-course tasting €130/person.", tip: "" },
  { name: "Private Sunset Boat", dest: "kotor", type: "activity", price: "$150-300", fav: true, desc: "Bay of Kotor at sunset. Just the two of you, a bottle of local wine, mountains turning gold.", tip: "Highest impact experience of the trip. Book via hotel concierge." },
  { name: "Pelješac Wine + Oysters", dest: "dubrovnik", type: "activity", price: "$150-350", fav: true, desc: "Ston oyster farms + Dingač/Postup tastings at Miloš and Matuško wineries. Croatia's best reds.", tip: "Day trip from Dubrovnik. Private guided recommended." },
  { name: "City Walls Walk", dest: "dubrovnik", type: "activity", price: "~€35", fav: true, desc: "Full 2km circuit along limestone fortifications. Red rooftops meet the Adriatic.", tip: "Go by 8:30am. The light is magic." },
  { name: "Diocletian's Palace", dest: "split", type: "activity", price: "Free", fav: true, desc: "A 1,700-year-old Roman emperor's retirement palace that became a living city.", tip: "Walk through ancient walls to reach restaurants and shops" },
  { name: "Krka National Park", dest: "split", type: "activity", price: "~€30", fav: false, desc: "Waterfalls, swimming holes, boardwalk trails through cascading falls.", tip: "Pack swimsuit. ~1.5hr drive each way." },
  { name: "Elaphiti Islands", dest: "dubrovnik", type: "activity", price: "$300-500", fav: false, desc: "Lopud, Šipan, Koločep — quiet beaches, olive groves, no cars. Private boat through hidden coves.", tip: "" },
];

const TODOS = [
  { text: "Book flights (Delta SkyMiles)", done: true, when: "Feb" },
  { text: "Book Sheraton Dubrovnik (Bonvoy Award)", done: true, when: "Feb" },
  { text: "Book Hyatt Regency Kotor Bay", done: true, when: "Feb" },
  { text: "Book Le Méridien Split (Bonvoy Award)", done: true, when: "Feb" },
  { text: "Submit Bonvoy Nightly Upgrade — Dubrovnik", done: true, when: "Feb" },
  { text: "Verify passport expiration dates", done: false, pri: "high", when: "Mar-Apr" },
  { text: "Book rental car — confirm Montenegro cross-border", done: false, pri: "med", when: "Apr-May" },
  { text: "Travel insurance — trip interruption + medical evac", done: false, pri: "med", when: "Apr-May" },
  { text: "Book Nautika dinner — request terrace", done: false, pri: "med", when: "Jun-Jul" },
  { text: "Book Galion dinner — request waterfront", done: false, pri: "med", when: "Jun-Jul" },
  { text: "Book Dvor dinner — request garden view", done: false, pri: "med", when: "Jun-Jul" },
  { text: "Book Pelješac wine + oyster tour", done: false, pri: "low", when: "Jun-Jul" },
  { text: "Book 3 couples spa sessions", done: false, pri: "med", when: "Aug" },
  { text: "Book private Kotor Bay sunset boat", done: false, pri: "med", when: "Aug" },
  { text: "Confirm all reservations", done: false, pri: "high", when: "Sep" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Outfit:wght@200;300;400;500;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box}

:root{
  --ink:#0c1421;
  --ink-soft:#1e293b;
  --ink-muted:#475569;
  --ink-faint:#94a3b8;
  --parchment:#faf8f4;
  --paper:#ffffff;
  --sand:#f1ede6;
  --gold:#b8963f;
  --gold-soft:#d4b76a;
  --gold-glow:rgba(184,150,63,0.08);
  --blue:#2563eb;
  --green:#059669;
  --amber:#d97706;
  --rose:#e11d48;
  --violet:#7c3aed;
  --border:#e5e1da;
  --border-light:#f0ece5;
  --r:8px;
  --shadow-sm:0 1px 2px rgba(12,20,33,0.04);
  --shadow:0 1px 3px rgba(12,20,33,0.06),0 1px 2px rgba(12,20,33,0.04);
  --shadow-md:0 4px 16px rgba(12,20,33,0.07),0 2px 6px rgba(12,20,33,0.04);
  --shadow-lg:0 8px 30px rgba(12,20,33,0.1),0 4px 10px rgba(12,20,33,0.05);
}

body{font-family:'Outfit',sans-serif;background:var(--parchment);color:var(--ink);-webkit-font-smoothing:antialiased}
.serif{font-family:'Cormorant Garamond',serif}

/* ---- HERO ---- */
.hero{
  background:var(--ink);
  color:white;
  padding:80px 40px 60px;
  text-align:center;
  position:relative;
  overflow:hidden;
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 30%,rgba(37,99,235,0.07),transparent),
    radial-gradient(ellipse 60% 50% at 80% 70%,rgba(184,150,63,0.06),transparent),
    radial-gradient(ellipse 40% 40% at 50% 50%,rgba(124,58,237,0.04),transparent);
}
.hero>*{position:relative;z-index:1}
.hero-eyebrow{
  font-size:11px;letter-spacing:4px;text-transform:uppercase;
  color:var(--gold-soft);margin-bottom:16px;font-weight:500;
  opacity:0;animation:fadeUp .6s ease forwards .2s;
}
.hero h1{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(42px,6vw,72px);font-weight:300;font-style:italic;
  line-height:1.1;margin-bottom:12px;letter-spacing:-0.5px;
  opacity:0;animation:fadeUp .6s ease forwards .4s;
}
.hero h1 em{font-style:normal;color:var(--gold-soft);font-weight:500}
.hero-sub{
  font-size:15px;color:rgba(255,255,255,0.45);font-weight:300;
  letter-spacing:1.5px;
  opacity:0;animation:fadeUp .6s ease forwards .6s;
}
.hero-route{
  display:flex;align-items:center;justify-content:center;gap:12px;
  margin-top:28px;flex-wrap:wrap;
  opacity:0;animation:fadeUp .6s ease forwards .8s;
}
.hero-route .leg{
  font-size:13px;font-weight:400;color:rgba(255,255,255,0.55);
  display:flex;align-items:center;gap:6px;
}
.hero-route .leg span{
  font-weight:500;color:rgba(255,255,255,0.85);
}
.hero-route .arrow{color:var(--gold);font-size:16px}
.hero-stats{
  display:flex;justify-content:center;gap:40px;margin-top:36px;flex-wrap:wrap;
  opacity:0;animation:fadeUp .6s ease forwards 1s;
}
.hero-stat{text-align:center}
.hero-stat .val{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;color:var(--gold-soft)}
.hero-stat .lbl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-top:2px}

@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* ---- NAV ---- */
.nav-wrap{
  position:sticky;top:0;z-index:100;
  background:rgba(250,248,244,0.85);
  backdrop-filter:blur(12px);
  border-bottom:1px solid var(--border);
}
.nav{
  max-width:1100px;margin:0 auto;
  display:flex;gap:0;overflow-x:auto;padding:0 24px;
}
.nav button{
  padding:14px 18px;font-size:13px;font-weight:500;
  color:var(--ink-muted);cursor:pointer;
  border:none;border-bottom:2px solid transparent;
  background:none;font-family:'Outfit',sans-serif;
  transition:all .2s;white-space:nowrap;
}
.nav button:hover{color:var(--ink)}
.nav button.on{color:var(--ink);border-bottom-color:var(--gold);font-weight:600}
.nav .ct{
  display:inline-flex;align-items:center;justify-content:center;
  min-width:18px;height:18px;border-radius:9px;
  background:var(--sand);color:var(--ink-muted);
  font-size:10px;font-weight:600;margin-left:6px;padding:0 5px;
}
.nav button.on .ct{background:var(--gold);color:white}

/* ---- MAIN ---- */
.main{max-width:1100px;margin:0 auto;padding:24px 24px 80px}

/* ---- CARDS ---- */
.card{
  background:var(--paper);border:1px solid var(--border);
  border-radius:var(--r);box-shadow:var(--shadow);
  overflow:hidden;margin-bottom:16px;
}
.card-h{
  padding:16px 20px;display:flex;align-items:center;
  justify-content:space-between;border-bottom:1px solid var(--border-light);
}
.card-h h2{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:var(--ink)}
.card-b{padding:20px}

/* ---- ITINERARY ---- */
.itin-row{
  display:grid;grid-template-columns:64px 1fr;gap:16px;
  padding:14px 0;border-bottom:1px solid var(--border-light);
  opacity:0;animation:fadeUp .4s ease forwards;
}
.itin-row:last-child{border-bottom:none}
.itin-num{text-align:center;padding-top:4px}
.itin-num .dn{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;line-height:1}
.itin-num .dd{font-size:11px;color:var(--ink-faint);margin-top:2px}
.itin-body{
  padding:12px 16px;border-radius:var(--r);
  border-left:3px solid;transition:box-shadow .2s;
}
.itin-body:hover{box-shadow:var(--shadow-md)}
.itin-loc{font-weight:600;font-size:15px;margin-bottom:4px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.itin-act{font-size:14px;color:var(--ink-soft);margin-bottom:3px}
.itin-din{font-size:13px;color:var(--ink-muted)}
.itin-note{font-size:12px;color:var(--ink-faint);font-style:italic;margin-top:4px}
.tag{
  display:inline-flex;padding:2px 8px;border-radius:10px;
  font-size:9px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;
}
.tag-spa{background:#ede9fe;color:#6d28d9}
.tag-splurge{background:#fef3c7;color:#92400e}
.tag-rest{background:#fce7f3;color:#9d174d}

/* ---- BUDGET ---- */
.bstat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px}
.bstat{
  background:var(--paper);border:1px solid var(--border);
  border-radius:var(--r);padding:16px;text-align:center;
  box-shadow:var(--shadow-sm);
}
.bstat .v{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600}
.bstat .l{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:4px}
.bstat .s{font-size:11px;color:var(--ink-muted);margin-top:2px}
.brow{
  display:grid;grid-template-columns:100px 1fr 90px 70px;gap:12px;
  padding:10px 16px;align-items:center;
  border-bottom:1px solid var(--border-light);font-size:13px;
}
.brow:last-child{border-bottom:none}
.brow:hover{background:var(--parchment)}
.brow .bc{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--ink-faint)}
.brow .ba{text-align:right;font-weight:500;font-variant-numeric:tabular-nums}
.pill{
  display:inline-flex;padding:2px 10px;border-radius:10px;
  font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.3px;
}
.pill-paid{background:#d1fae5;color:#065f46}
.pill-points{background:#dbeafe;color:#1e40af}
.pill-planned{background:#fef3c7;color:#92400e}

/* ---- TODOS ---- */
.todo{
  display:flex;align-items:flex-start;gap:12px;
  padding:10px 16px;border-bottom:1px solid var(--border-light);
  transition:background .15s;
}
.todo:hover{background:var(--parchment)}
.todo:last-child{border-bottom:none}
.todo-ck{
  width:20px;height:20px;border-radius:50%;
  border:2px solid var(--border);cursor:pointer;flex-shrink:0;margin-top:2px;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;background:none;padding:0;font-family:'Outfit',sans-serif;
}
.todo-ck:hover{border-color:var(--green)}
.todo-ck.dn{background:var(--green);border-color:var(--green)}
.todo-ck.dn::after{content:'✓';color:white;font-size:11px;font-weight:700}
.todo-t{font-size:14px;font-weight:500}
.todo-t.dn{text-decoration:line-through;color:var(--ink-faint)}
.todo-m{font-size:12px;color:var(--ink-faint);margin-top:1px}
.pdot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:6px}
.pdot-high{background:var(--rose)}
.pdot-med{background:var(--amber)}
.pdot-low{background:var(--ink-faint)}

/* ---- RESEARCH ---- */
.fbar{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.fbtn{
  padding:5px 14px;border-radius:16px;border:1px solid var(--border);
  background:var(--paper);font-size:12px;font-weight:500;
  cursor:pointer;transition:all .2s;color:var(--ink-muted);
  font-family:'Outfit',sans-serif;
}
.fbtn:hover{border-color:var(--gold);color:var(--ink)}
.fbtn.on{background:var(--ink);color:white;border-color:var(--ink)}
.rgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.rcard{
  background:var(--paper);border:1px solid var(--border);
  border-radius:var(--r);padding:16px;
  transition:box-shadow .2s,transform .2s;
}
.rcard:hover{box-shadow:var(--shadow-lg);transform:translateY(-2px)}
.rcard .rtags{margin-bottom:6px}
.rcard .rtag{
  display:inline-block;padding:2px 7px;border-radius:4px;
  font-size:9px;font-weight:600;text-transform:uppercase;
  letter-spacing:.5px;margin-right:4px;
}
.rcard .rn{font-weight:600;font-size:15px;color:var(--ink);margin-bottom:4px;display:flex;justify-content:space-between;align-items:center}
.rcard .rn .rp{font-size:12px;color:var(--gold);font-weight:600}
.rcard .rn .star{color:var(--gold);margin-left:6px}
.rcard .rd{font-size:13px;color:var(--ink-muted);line-height:1.5;margin-bottom:6px}
.rcard .rt{font-size:12px;color:var(--ink-soft);font-style:italic;background:var(--parchment);padding:8px;border-radius:6px}

/* ---- FOOTER ---- */
.footer{
  text-align:center;padding:40px 24px 32px;
  color:var(--ink-faint);font-size:12px;
  border-top:1px solid var(--border);
}
.footer a{color:var(--gold);text-decoration:none}
.footer a:hover{text-decoration:underline}

@media(max-width:640px){
  .hero{padding:48px 20px 40px}
  .hero h1{font-size:36px}
  .hero-stats{gap:24px}
  .brow{grid-template-columns:1fr;gap:2px}
  .rgrid{grid-template-columns:1fr}
  .itin-row{grid-template-columns:48px 1fr;gap:10px}
  .bstat-grid{grid-template-columns:1fr 1fr}
}
`;

function Hero() {
  return (
    <div className="hero">
      <div className="hero-eyebrow">September – October 2026</div>
      <h1 className="serif">Croatia <em>&</em> Montenegro</h1>
      <p className="hero-sub">A 13-night honeymoon along the Adriatic</p>
      <div className="hero-route">
        <div className="leg"><span>Dubrovnik</span> 5 nights</div>
        <div className="arrow">→</div>
        <div className="leg"><span>Bay of Kotor</span> 3 nights</div>
        <div className="arrow">→</div>
        <div className="leg"><span>Split</span> 4 nights</div>
      </div>
      <div className="hero-stats">
        <div className="hero-stat"><div className="val">3</div><div className="lbl">Countries</div></div>
        <div className="hero-stat"><div className="val">3</div><div className="lbl">Spa Days</div></div>
        <div className="hero-stat"><div className="val">3</div><div className="lbl">Fine Dining</div></div>
        <div className="hero-stat"><div className="val">3</div><div className="lbl">Rest Days</div></div>
      </div>
    </div>
  );
}

function ItineraryView() {
  return (
    <div className="card">
      <div className="card-h"><h2 className="serif">Day by Day</h2></div>
      <div className="card-b">
        {ITINERARY.map((d, i) => {
          const c = DEST[d.dest];
          return (
            <div key={i} className="itin-row" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="itin-num">
                <div className="dn" style={{ color: c.color }}>{d.day}</div>
                <div className="dd">{d.date}</div>
              </div>
              <div className="itin-body" style={{ background: c.bg, borderLeftColor: c.color }}>
                <div className="itin-loc" style={{ color: c.color }}>
                  <span>{c.icon}</span> {d.location}
                  {d.spa && <span className="tag tag-spa">Spa</span>}
                  {d.splurge && <span className="tag tag-splurge">Splurge</span>}
                  {d.zero && <span className="tag tag-rest">Rest</span>}
                </div>
                <div className="itin-act">{d.activity}</div>
                {d.dining && <div className="itin-din">🍽 {d.dining}</div>}
                {d.note && <div className="itin-note">{d.note}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BudgetView() {
  const totalEst = BUDGET.reduce((s, b) => s + b.est, 0);
  const paidAmt = BUDGET.filter(b => b.status === "paid").reduce((s, b) => s + b.est, 0);
  const pointsCount = BUDGET.filter(b => b.status === "points").length;
  const plannedAmt = BUDGET.filter(b => b.status === "planned").reduce((s, b) => s + b.est, 0);

  return (
    <div>
      <div className="bstat-grid">
        <div className="bstat"><div className="l">Cash Budget</div><div className="v" style={{ color: "var(--ink)" }}>${totalEst.toLocaleString()}</div><div className="s">total out of pocket</div></div>
        <div className="bstat"><div className="l">Confirmed</div><div className="v" style={{ color: "var(--green)" }}>${paidAmt.toLocaleString()}</div><div className="s">paid / locked in</div></div>
        <div className="bstat"><div className="l">Remaining</div><div className="v" style={{ color: "var(--amber)" }}>${plannedAmt.toLocaleString()}</div><div className="s">still to book</div></div>
        <div className="bstat"><div className="l">Points Saves</div><div className="v" style={{ color: "var(--blue)" }}>{pointsCount}</div><div className="s">flights + hotels on points</div></div>
      </div>
      <div className="card">
        <div className="card-h"><h2 className="serif">Breakdown</h2></div>
        <div style={{ padding: "8px 0" }}>
          <div className="brow" style={{ fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "1px", color: "var(--ink-faint)", borderBottom: "2px solid var(--border)" }}>
            <div>Category</div><div>Item</div><div style={{ textAlign: "right" }}>Amount</div><div style={{ textAlign: "center" }}>Status</div>
          </div>
          {BUDGET.map((b, i) => (
            <div key={i} className="brow">
              <div className="bc">{b.cat}</div>
              <div>{b.item}{b.note && <span style={{ fontSize: 11, color: "var(--ink-faint)", marginLeft: 6 }}>— {b.note}</span>}</div>
              <div className="ba">{b.status === "points" ? "—" : `$${b.est.toLocaleString()}`}</div>
              <div style={{ textAlign: "center" }}><span className={`pill pill-${b.status}`}>{b.status}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TodoView() {
  const [todos, setTodos] = useState(TODOS);
  const toggle = (i) => setTodos(todos.map((t, j) => j === i ? { ...t, done: !t.done } : t));
  const pending = todos.filter(t => !t.done);
  const done = todos.filter(t => t.done);

  return (
    <div>
      <div className="card">
        <div className="card-h"><h2 className="serif">To Do ({pending.length})</h2></div>
        <div>
          {todos.map((t, i) => !t.done && (
            <div key={i} className="todo">
              <button className={`todo-ck${t.done ? " dn" : ""}`} onClick={() => toggle(i)} role="checkbox" aria-checked={t.done} aria-label={t.text} />
              <div>
                <div className="todo-t">
                  {t.pri && <span className={`pdot pdot-${t.pri}`} />}
                  {t.text}
                </div>
                {t.when && <div className="todo-m">{t.when}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {done.length > 0 && (
        <div className="card">
          <div className="card-h"><h2 className="serif">Completed ({done.length})</h2></div>
          <div>
            {todos.map((t, i) => t.done && (
              <div key={i} className="todo">
                <button className="todo-ck dn" onClick={() => toggle(i)} role="checkbox" aria-checked={t.done} aria-label={t.text} />
                <div><div className="todo-t dn">{t.text}</div>{t.when && <div className="todo-m">{t.when}</div>}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ResearchView() {
  const [typeF, setTypeF] = useState("all");
  const [destF, setDestF] = useState("all");

  const filtered = RESEARCH.filter(r => {
    if (typeF !== "all" && r.type !== typeF) return false;
    if (destF !== "all" && r.dest !== destF) return false;
    return true;
  }).sort((a, b) => (b.fav ? 1 : 0) - (a.fav ? 1 : 0));

  return (
    <div>
      <div className="fbar">
        {["all", "restaurant", "activity"].map(f => (
          <button key={f} className={`fbtn${typeF === f ? " on" : ""}`} onClick={() => setTypeF(f)}>
            {f === "all" ? "All" : f === "restaurant" ? "🍽 Restaurants" : "🏔 Activities"}
          </button>
        ))}
      </div>
      <div className="fbar">
        {["all", "dubrovnik", "kotor", "split"].map(d => (
          <button key={d} className={`fbtn${destF === d ? " on" : ""}`} onClick={() => setDestF(d)}
            style={destF === d && d !== "all" ? { background: DEST[d].color, color: "white", borderColor: DEST[d].color } : {}}>
            {d === "all" ? "All Cities" : DEST[d].label}
          </button>
        ))}
      </div>
      <div className="rgrid">
        {filtered.map((r, i) => {
          const c = DEST[r.dest];
          return (
            <div key={i} className="rcard">
              <div className="rtags">
                <span className="rtag" style={{ background: c.bg, color: c.color }}>{c.label}</span>
                <span className="rtag" style={{ background: "#f1f5f9", color: "#475569" }}>{r.type === "restaurant" ? "🍽 Restaurant" : "🏔 Activity"}</span>
              </div>
              <div className="rn">
                <span>{r.name}{r.fav && <span className="star">★</span>}</span>
                <span className="rp">{r.price}</span>
              </div>
              <div className="rd">{r.desc}</div>
              {r.tip && <div className="rt">{r.tip}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("itinerary");
  const tabsRef = useRef([]);
  const tabs = [
    { id: "itinerary", label: "Itinerary", ct: ITINERARY.length },
    { id: "budget", label: "Budget", ct: BUDGET.length },
    { id: "todos", label: "To-Do", ct: TODOS.filter(t => !t.done).length },
    { id: "research", label: "Research", ct: RESEARCH.length },
  ];

  const handleTabKeyDown = useCallback((e, idx) => {
    let nextIdx = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
    if (nextIdx !== null) {
      e.preventDefault();
      setTab(tabs[nextIdx].id);
      tabsRef.current[nextIdx]?.focus();
    }
  }, [tabs]);

  return (
    <>
      <style>{css}</style>
      <div>
        <Hero />
        <div className="nav-wrap">
          <div className="nav" role="tablist" aria-label="Trip planner sections">
            {tabs.map((t, idx) => (
              <button
                key={t.id}
                ref={(el) => { tabsRef.current[idx] = el }}
                role="tab"
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                className={tab === t.id ? "on" : ""}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
              >
                {t.label}<span className="ct">{t.ct}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="main" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === "itinerary" && <ItineraryView />}
          {tab === "budget" && <BudgetView />}
          {tab === "todos" && <TodoView />}
          {tab === "research" && <ResearchView />}
        </div>
        <div className="footer">
          Built by <a href="/">Cain Menard</a> — Honeymoon Trip Planner, 2026
        </div>
      </div>
    </>
  );
}

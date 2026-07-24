"use client";

import { useMemo, useState } from "react";
import { createMockBooking, resources, seedBookings } from "../services/bookingService";
import { DAYS, TIMES } from "../utils/calendar";

const navigation = [
  { label: "Calendar", icon: "CA" },
  { label: "My bookings", icon: "MB", count: 3 },
  { label: "Resources", icon: "RS" },
  { label: "Analytics", icon: "AN" },
  { label: "Team & access", icon: "TM" },
  { label: "Settings", icon: "ST" },
];

const sectionCopy: Record<string, { eyebrow: string; title: string; body: string }> = {
  "My bookings": { eyebrow: "Personal workspace", title: "My bookings", body: "Manage upcoming reservations, recurring sessions, and previous visits." },
  Resources: { eyebrow: "Space directory", title: "Resources", body: "Explore rooms, labs, equipment, and their live availability." },
  Analytics: { eyebrow: "Workspace intelligence", title: "Analytics", body: "Understand utilization, booking patterns, and no-show trends." },
  "Team & access": { eyebrow: "Administration", title: "Team & access", body: "Manage members, roles, and resource access groups." },
  Settings: { eyebrow: "Workspace controls", title: "Settings", body: "Configure booking rules, notifications, and workspace preferences." },
};

function Sidebar({ active, onChange, open, onClose }: { active: string; onChange: (value: string) => void; open: boolean; onClose: () => void }) {
  return <aside className={`sidebar ${open ? "is-open" : ""}`}>
    <div className="sidebar-top">
      <a className="brand" href="#top" aria-label="SpaceSync home"><span className="brand-symbol"><i /><i /><i /></span><span>SpaceSync<small>Workspace OS</small></span></a>
      <button className="mobile-close" onClick={onClose} aria-label="Close navigation">x</button>
    </div>
    <button className="workspace-switcher"><span className="workspace-logo">ZL</span><span><b>Zeppelin Labs</b><small>Main Campus</small></span><i>v</i></button>
    <nav aria-label="Primary navigation">
      <p className="nav-heading">Workspace</p>
      {navigation.slice(0, 3).map((item) => <button key={item.label} className={`nav-link ${active === item.label ? "active" : ""}`} onClick={() => { onChange(item.label); onClose(); }}><span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.count && <b>{item.count}</b>}</button>)}
      <p className="nav-heading nav-spacer">Manage</p>
      {navigation.slice(3).map((item) => <button key={item.label} className={`nav-link ${active === item.label ? "active" : ""}`} onClick={() => { onChange(item.label); onClose(); }}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></button>)}
    </nav>
    <div className="upgrade-card"><span className="upgrade-mark">PRO</span><h3>Make every space count</h3><p>Your workspace utilization is up 12% this month.</p><button onClick={() => onChange("Analytics")}>View insights <span>-&gt;</span></button></div>
    <div className="profile"><span className="avatar">AK</span><span><b>Amna Khan</b><small>Space Admin</small></span><button aria-label="Open profile menu">...</button></div>
  </aside>;
}

function Topbar({ onMenu, onBook }: { onMenu: () => void; onBook: () => void }) {
  return <header className="topbar"><div className="topbar-left"><button className="menu-button" onClick={onMenu} aria-label="Open navigation">Menu</button><label className="global-search"><span>Search</span><input aria-label="Search workspace" placeholder="Rooms, bookings or people" /><kbd>Ctrl K</kbd></label></div><div className="topbar-actions"><button className="help-button">Help center</button><button className="notification-button" aria-label="Notifications"><span>3</span></button><button className="primary-button" onClick={onBook}><b>+</b> New booking</button></div></header>;
}

function StatCard({ label, value, change, tone }: { label: string; value: string; change: string; tone: string }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{label.slice(0, 2).toUpperCase()}</div><div><p>{label}</p><strong>{value}</strong><small>{change}</small></div></article>;
}

function Calendar({ resource, setResource, visible, view, setView }: { resource: string; setResource: (value: string) => void; visible: typeof seedBookings; view: string; setView: (value: string) => void }) {
  return <section className="calendar-panel">
    <div className="calendar-header"><div><p className="section-kicker">Availability calendar</p><h2>July 20 - 24, 2026</h2></div><div className="calendar-actions"><button className="square-button" aria-label="Previous week">&lt;</button><button className="today-button">Today</button><button className="square-button" aria-label="Next week">&gt;</button><div className="view-tabs">{["Day", "Week", "Month"].map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{item}</button>)}</div></div></div>
    <div className="filter-row"><label><span>Resource</span><select value={resource} onChange={(event) => setResource(event.target.value)}><option>All resources</option>{resources.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label><span>Location</span><select><option>Main Campus</option><option>North Wing</option><option>Innovation Hub</option></select></label><label><span>Capacity</span><select><option>Any capacity</option><option>1-4 people</option><option>5-10 people</option><option>10+ people</option></select></label><button className="filter-button">Filters <b>2</b></button></div>
    <div className="calendar-scroll"><div className="calendar-grid"><div className="calendar-corner" />{DAYS.map(([day, date], index) => <div key={day} className={`day-header ${index === 4 ? "today" : ""}`}><span>{day}</span><b>{date}</b><small>{index === 4 ? "Today" : ""}</small></div>)}<div className="time-column">{TIMES.map((time) => <span key={time}>{time}</span>)}</div>{DAYS.map(([day], dayIndex) => <div className="day-column" key={day}>{TIMES.slice(0, -1).map((time) => <div className="time-slot" key={time} />)}{dayIndex === 4 && <div className="current-time"><span>11:42</span></div>}{visible.filter((item) => item.day === dayIndex).map((item) => <button className="booking-card" key={item.id} style={{ top: `${(item.start - 8) * 72 + 7}px`, height: `${item.duration * 72 - 8}px`, background: item.color }}><i style={{ background: resources.find((entry) => entry.name === item.resource)?.color }} /><span><b>{item.title}</b><small>{item.resource}</small><em>{item.owner}</em></span></button>)}</div>)}</div></div>
  </section>;
}

function TodayPanel({ onBook }: { onBook: () => void }) {
  return <aside className="today-panel"><div className="panel-title"><div><p className="section-kicker">Your day</p><h2>Today</h2></div><span>3 bookings</span></div><article className="next-booking"><div className="next-top"><span>Up next</span><small>Starts in 2h 18m</small></div><h3>Research interview</h3><p>Focus Pod 04</p><div className="meeting-meta"><span><b>02:00</b><small>Start</small></span><i /><span><b>03:30</b><small>End</small></span></div><div className="attendees"><span className="mini-avatar">AK</span><span className="mini-avatar blue">OH</span><p>2 attendees</p></div><button className="checkin-button">Check in now</button></article><div className="timeline"><div className="timeline-item done"><span>09:00</span><i /><p><b>Product stand-up</b><small>Atlas Room</small></p></div><div className="timeline-item"><span>02:00</span><i /><p><b>Research interview</b><small>Focus Pod 04</small></p></div><div className="timeline-item"><span>04:30</span><i /><p><b>Weekly review</b><small>Atlas Room</small></p></div></div><button className="secondary-wide" onClick={onBook}>+ Add another booking</button></aside>;
}

function ResourceStrip({ onSelect }: { onSelect: (value: string) => void }) {
  return <section className="resources-section"><div className="section-title"><div><p className="section-kicker">Book in seconds</p><h2>Available right now</h2></div><button>View all resources -&gt;</button></div><div className="resource-grid">{resources.map((item, index) => <button key={item.name} className="resource-card" onClick={() => onSelect(item.name)}><div className={`resource-visual visual-${index + 1}`}><span>{item.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><b>Available</b></div><div className="resource-content"><div><h3>{item.name}</h3><p>{item.meta}</p></div><span className="arrow">-&gt;</span><div className="amenities"><span>{index === 1 ? "Lab" : index === 3 ? "Equipment" : "Room"}</span><span>{index === 2 ? "Quiet" : "Screen"}</span></div></div></button>)}</div></section>;
}

function SectionPreview({ active, onBook }: { active: string; onBook: () => void }) {
  const copy = sectionCopy[active];
  const cards = active === "Analytics" ? [["Utilization", "68%", "+12% this month"], ["Peak hour", "2 PM", "Most requested"], ["No-show rate", "4.2%", "Down 1.8%"]] : active === "Team & access" ? [["Members", "84", "76 active"], ["Access groups", "7", "3 restricted"], ["Pending invites", "4", "Review access"]] : active === "Resources" ? [["Rooms", "18", "12 available"], ["Equipment", "24", "20 available"], ["Labs", "6", "3 available"]] : active === "Settings" ? [["Booking window", "90 days", "Workspace default"], ["Buffer time", "10 min", "Between bookings"], ["Reminders", "Enabled", "Email and check-in"]] : [["Upcoming", "3", "Next at 2 PM"], ["This month", "12", "18 total hours"], ["No-shows", "0", "Perfect record"]];
  return <div className="section-page"><div className="section-hero"><div><p className="section-kicker">{copy.eyebrow}</p><h1>{copy.title}</h1><p>{copy.body}</p></div><button className="primary-button" onClick={onBook}>+ New booking</button></div><div className="preview-stats">{cards.map(([label, value, detail], index) => <article key={label}><span className={`preview-icon color-${index + 1}`}>{label.slice(0, 2).toUpperCase()}</span><p>{label}</p><strong>{value}</strong><small>{detail}</small></article>)}</div><section className="management-card"><div className="management-head"><div><p className="section-kicker">Overview</p><h2>{active === "Resources" ? "Resource directory" : active === "Team & access" ? "Member access" : active === "Settings" ? "Workspace preferences" : active === "Analytics" ? "Utilization trend" : "Upcoming reservations"}</h2></div><button>Export</button></div><div className="table-head"><span>Name</span><span>Status</span><span>Details</span><span>Action</span></div>{resources.slice(0, 3).map((item, index) => <div className="table-row" key={item.name}><span><i className={`row-avatar color-${index + 1}`}>{item.name[0]}</i><b>{active === "Team & access" ? ["Amna Khan", "Omar Hassan", "Maya Ali"][index] : item.name}</b></span><span><em>Active</em></span><span>{active === "Settings" ? "Configured" : item.meta}</span><button>Manage</button></div>)}</section></div>;
}

function BookingModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="section-kicker">Create reservation</p><h2 id="booking-title">Book a resource</h2></div><button onClick={onClose} aria-label="Close booking form">x</button></div><p className="modal-copy">Reserve a space for Friday, July 24. Availability is checked instantly.</p><form onSubmit={onSubmit}><label><span>Booking title</span><input name="title" required placeholder="Team planning session" autoFocus /></label><label><span>Resource</span><select name="resource">{resources.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><div className="form-row"><label><span>Date</span><input value="Friday, July 24" readOnly /></label><label><span>Time</span><input value="4:00 PM - 5:00 PM" readOnly /></label></div><label><span>Attendees</span><input type="number" min="1" max="20" defaultValue="4" /></label><div className="availability-check"><span>OK</span><p><b>This time is available</b><small>No conflicts or buffer restrictions found.</small></p></div><div className="modal-actions"><button type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Confirm booking</button></div></form></section></div>;
}

export default function BookingDashboard() {
  const [bookings, setBookings] = useState(seedBookings);
  const [resource, setResource] = useState("All resources");
  const [active, setActive] = useState("Calendar");
  const [view, setView] = useState("Week");
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const visible = useMemo(() => resource === "All resources" ? bookings : bookings.filter((item) => item.resource === resource), [bookings, resource]);
  function submitBooking(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const selected = String(data.get("resource")); setBookings((current) => [...current, createMockBooking(selected, String(data.get("title")))]); setModal(false); setNotice(`${selected} booked for Friday at 4:00 PM.`); window.setTimeout(() => setNotice(""), 3500); }
  function selectResource(value: string) { setResource(value); setActive("Calendar"); window.scrollTo({ top: 250, behavior: "smooth" }); }
  return <main className="app-shell" id="top"><Sidebar active={active} onChange={setActive} open={menu} onClose={() => setMenu(false)} /><section className="content-shell"><Topbar onMenu={() => setMenu(true)} onBook={() => setModal(true)} />{active === "Calendar" ? <div className="dashboard"><section className="dashboard-hero"><div><div className="welcome-line"><span>Friday, July 24</span><i />Main Campus</div><h1>Good morning, Amna.</h1><p>Here is what is happening across your workspace today.</p></div><button className="primary-button hero-button" onClick={() => setModal(true)}>+ Book a resource</button></section><section className="stats-grid"><StatCard label="Available now" value="12" change="of 24 resources" tone="green" /><StatCard label="Bookings today" value="18" change="6 starting soon" tone="blue" /><StatCard label="Utilization" value="68%" change="12% above average" tone="violet" /><StatCard label="Pending approvals" value="04" change="Requires your review" tone="amber" /></section><div className="workspace-grid"><Calendar resource={resource} setResource={setResource} visible={visible} view={view} setView={setView} /><TodayPanel onBook={() => setModal(true)} /></div><ResourceStrip onSelect={selectResource} /></div> : <SectionPreview active={active} onBook={() => setModal(true)} />}</section>{menu && <button className="mobile-overlay" onClick={() => setMenu(false)} aria-label="Close navigation overlay" />}{modal && <BookingModal onClose={() => setModal(false)} onSubmit={submitBooking} />}{notice && <div className="toast"><span>OK</span>{notice}</div>}</main>;
}

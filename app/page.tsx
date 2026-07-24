"use client";

import { useMemo, useState } from "react";

type Booking = { id:number; resource:string; title:string; start:number; duration:number; owner:string; color:string; day:number };
const resources = [
  {name:"Atlas Room",meta:"North Wing · 8 people",color:"#16805d"},
  {name:"Horizon Lab",meta:"Innovation Hub · 20 people",color:"#4263eb"},
  {name:"Focus Pod 04",meta:"Level 2 · 2 people",color:"#8b5cc7"},
  {name:"Media Kit A",meta:"Equipment Store",color:"#db7b28"},
];
const seed:Booking[] = [
  {id:1,resource:"Atlas Room",title:"Product stand-up",start:9,duration:1,owner:"Maya + 5",color:"#dff5ec",day:0},
  {id:2,resource:"Horizon Lab",title:"Robotics workshop",start:11,duration:2,owner:"Omar + 14",color:"#e4eaff",day:0},
  {id:3,resource:"Focus Pod 04",title:"Research interview",start:14,duration:1.5,owner:"You + 1",color:"#f0e8ff",day:0},
  {id:4,resource:"Atlas Room",title:"Design critique",start:10,duration:1.5,owner:"Lina + 6",color:"#dff5ec",day:1},
  {id:5,resource:"Media Kit A",title:"Campaign shoot",start:13,duration:2,owner:"Samir + 3",color:"#fff0df",day:2},
  {id:6,resource:"Horizon Lab",title:"Open lab hours",start:9.5,duration:3,owner:"Aisha",color:"#e4eaff",day:3},
  {id:7,resource:"Atlas Room",title:"Partner meeting",start:15,duration:1,owner:"Ibrahim + 4",color:"#dff5ec",day:4},
];
const days=[["Mon","20"],["Tue","21"],["Wed","22"],["Thu","23"],["Fri","24"]];
const times=["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM"];

export default function Home(){
  const [bookings,setBookings]=useState(seed),[resource,setResource]=useState("All resources"),[active,setActive]=useState("Calendar"),[view,setView]=useState("Week"),[modal,setModal]=useState(false),[menu,setMenu]=useState(false),[notice,setNotice]=useState("");
  const visible=useMemo(()=>resource==="All resources"?bookings:bookings.filter(x=>x.resource===resource),[bookings,resource]);
  function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const data=new FormData(e.currentTarget),selected=String(data.get("resource")),info=resources.find(x=>x.name===selected);setBookings(x=>[...x,{id:Date.now(),resource:selected,title:String(data.get("title")),start:16,duration:1,owner:"You",color:`${info?.color??"#16805d"}20`,day:4}]);setModal(false);setNotice(`${selected} booked for Friday at 4:00 PM.`);window.setTimeout(()=>setNotice(""),3500)}
  return <main className="shell">
    <aside className={`sidebar ${menu?"open":""}`}>
      <button className="close" onClick={()=>setMenu(false)}>×</button><div className="brand"><span className="logo"><i/><i/><i/></span>SpaceSync</div>
      <div className="workspace"><span>Z</span><p><b>Zeppelin Labs</b><small>Main workspace</small></p><i>⌄</i></div>
      <nav><p className="nav-title">Workspace</p>{[["Calendar","▦"],["My bookings","◷"],["Resources","◇"]].map(([l,i])=><button className={active===l?"nav active":"nav"} key={l} onClick={()=>{setActive(l);setMenu(false)}}><i>{i}</i>{l}{l==="My bookings"&&<span>3</span>}</button>)}<p className="nav-title manage">Manage</p>{[["Analytics","⌁"],["Team & access","♙"],["Settings","⚙"]].map(([l,i])=><button className={active===l?"nav active":"nav"} key={l} onClick={()=>{setActive(l);setMenu(false)}}><i>{i}</i>{l}</button>)}</nav>
      <div className="insight"><span>✦</span><b>Make every space count</b><p>Your workspace is 68% utilized this week.</p><button onClick={()=>setActive("Analytics")}>View insights →</button></div>
      <div className="profile"><span>AK</span><p><b>Amna Khan</b><small>Space Admin</small></p><i>•••</i></div>
    </aside>
    <section className="main"><header><button className="hamburger" onClick={()=>setMenu(true)}>☰</button><label className="search"><span>⌕</span><input placeholder="Search spaces, bookings, people..."/><kbd>⌘ K</kbd></label><div className="actions"><button className="bell">♢<i/></button><button className="new" onClick={()=>setModal(true)}>＋ New booking</button></div></header>
      <div className="page"><div className="heading"><div><p className="eyebrow">Friday, July 24</p><h1>Find your space</h1><p>See what&apos;s available and book a resource in seconds.</p></div><div className="available"><i/><p><b>12 spaces available</b><small>Right now across Main Campus</small></p></div></div>
      {active!=="Calendar"?<section className="placeholder"><span>{active==="Analytics"?"⌁":"◇"}</span><h2>{active}</h2><p>This frontend section is ready for the next design pass. Return to the calendar to explore the booking flow.</p><button onClick={()=>setActive("Calendar")}>Back to calendar</button></section>:<>
        <section className="filters"><label><span>Resource</span><select value={resource} onChange={e=>setResource(e.target.value)}><option>All resources</option>{resources.map(x=><option key={x.name}>{x.name}</option>)}</select></label><label><span>Building</span><select><option>Main Campus</option><option>North Wing</option></select></label><label><span>Capacity</span><select><option>Any size</option><option>1–4 people</option><option>5–10 people</option></select></label><button className="more">⚙ More filters <b>2</b></button></section>
        <section className="calendar"><div className="toolbar"><div className="date"><button>‹</button><button>›</button><h2>July 20 – 24, 2026</h2><button className="today">Today</button></div><div className="views">{["Day","Week","Month"].map(x=><button className={view===x?"selected":""} onClick={()=>setView(x)} key={x}>{x}</button>)}</div></div><div className="calendar-scroll"><div className="grid"><div className="corner"/>{days.map(([d,n],i)=><div className={`day-head ${i===4?"current":""}`} key={d}><span>{d}</span><b>{n}</b></div>)}<div className="time-col">{times.map(x=><span key={x}>{x}</span>)}</div>{days.map(([d],di)=><div className="day-col" key={d}>{times.slice(0,-1).map(x=><div className="time-cell" key={x}/>)}{di===4&&<div className="now"><span>11:42</span></div>}{visible.filter(x=>x.day===di).map(x=><button className="booking" key={x.id} style={{top:`${(x.start-8)*68+8}px`,height:`${x.duration*68-8}px`,background:x.color}}><i style={{background:resources.find(r=>r.name===x.resource)?.color}}/><b>{x.title}</b><small>{x.resource}</small><span>{x.owner}</span></button>)}</div>)}</div></div></section>
        <section className="below"><div><div className="section-head"><div><p className="eyebrow">Your schedule</p><h2>Coming up next</h2></div><button onClick={()=>setActive("My bookings")}>View all →</button></div><div className="upcoming"><div className="date-card"><b>24</b><span>JUL</span></div><div className="details"><span>Confirmed</span><h3>Research interview</h3><p>◷ 2:00 – 3:30 PM · ◇ Focus Pod 04</p></div><button>Check in</button><i>•••</i></div></div><div><div className="section-head"><div><p className="eyebrow">Live availability</p><h2>Free right now</h2></div></div><div className="resource-list">{resources.slice(0,3).map(x=><button key={x.name} onClick={()=>{setResource(x.name);window.scrollTo({top:180,behavior:"smooth"})}}><span style={{color:x.color,background:`${x.color}16`}}>◇</span><p><b>{x.name}</b><small>{x.meta}</small></p><i>Book →</i></button>)}</div></div></section>
      </>}</div>
    </section>
    {menu&&<button className="overlay" onClick={()=>setMenu(false)}/>} {modal&&<div className="modal-wrap" onMouseDown={()=>setModal(false)}><section className="modal" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setModal(false)}>×</button><p className="eyebrow">New reservation</p><h2>Book a space</h2><p className="intro">Choose a resource and we&apos;ll hold Friday at 4:00 PM for you.</p><form onSubmit={submit}><label>Booking title<input name="title" required placeholder="e.g. Team planning session" autoFocus/></label><label>Resource<select name="resource">{resources.map(x=><option key={x.name}>{x.name}</option>)}</select></label><div className="form-row"><label>Date<input value="Jul 24, 2026" readOnly/></label><label>Time<input value="4:00 – 5:00 PM" readOnly/></label></div><label>Attendees<input type="number" min="1" max="20" defaultValue="4"/></label><div className="conflict"><span>✓</span><p><b>This time is available</b><small>No conflicts or buffer restrictions.</small></p></div><button className="confirm">Confirm booking <span>→</span></button></form></section></div>}{notice&&<div className="toast"><span>✓</span>{notice}</div>}
  </main>
}

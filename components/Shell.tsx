"use client";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Moon,Sun,Menu,X,ArrowUpRight,Command,Activity,Pause,Play} from "lucide-react";
import {identity,nav} from "@/data/content";

export default function Shell({children}:{children:React.ReactNode}){
 const [light,setLight]=useState(false),[hidden,setHidden]=useState(false),[paused,setPaused]=useState(false);
 const menu=useRef<HTMLDialogElement>(null),palette=useRef<HTMLDialogElement>(null),cursor=useRef<HTMLDivElement>(null),bar=useRef<HTMLDivElement>(null);
 const path=usePathname();
 useEffect(()=>{menu.current?.close();palette.current?.close()},[path]);
 useEffect(()=>{
  setLight(document.documentElement.dataset.theme==="light");
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  setPaused(reduced);
  let last=window.scrollY;let raf=0;
  const scroll=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const y=window.scrollY;setHidden(y>last&&y>500);last=y;if(bar.current)bar.current.style.transform="scaleX("+(y/Math.max(1,document.documentElement.scrollHeight-innerHeight))+")"})};
  const move=(e:PointerEvent)=>{if(cursor.current){cursor.current.style.transform="translate3d("+e.clientX+"px,"+e.clientY+"px,0)";cursor.current.classList.toggle("active",!!(e.target as Element).closest("a,button"))}};
  const key=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key==="k"){e.preventDefault();if(palette.current?.open)palette.current.close();else palette.current?.showModal()}};
  addEventListener("scroll",scroll,{passive:true});addEventListener("pointermove",move);addEventListener("keydown",key);
  return()=>{cancelAnimationFrame(raf);removeEventListener("scroll",scroll);removeEventListener("pointermove",move);removeEventListener("keydown",key)};
 },[]);
 useEffect(()=>{
  document.documentElement.dataset.motion=paused?"paused":"active";
  if(paused)return;
  let stop:undefined|(()=>void);let disposed=false;
  import("lenis").then(({default:Lenis})=>{if(disposed)return;const lenis=new Lenis({duration:1.05,anchors:true,smoothWheel:true});let id=0;const frame=(t:number)=>{lenis.raf(t);id=requestAnimationFrame(frame)};id=requestAnimationFrame(frame);stop=()=>{cancelAnimationFrame(id);lenis.destroy()}});
  return()=>{disposed=true;stop?.()};
 },[paused]);
 const theme=()=>{const value=!light;setLight(value);document.documentElement.dataset.theme=value?"light":"dark";try{localStorage.setItem("signal-theme",value?"light":"dark")}catch{}};
 return <>
 <a href="#main" className="skip-link">Skip to content</a>
 <div className="scroll-progress" ref={bar}/>
 <div className="cursor-ring" ref={cursor} aria-hidden="true"/>
 <header className={"nav-wrap "+(hidden?"nav-hidden":"")}><nav className="navbar container" aria-label="Main navigation">
 <Link className="brand" href="/" aria-label="Shubham Bhat home"><span className="brand-icon"><span aria-hidden="true">sb</span></span><span>Shubham Bhat</span></Link>
 <div className="nav-links">{nav.map(([label,id])=><Link key={id} href={"/#"+id}>{label}</Link>)}</div>
 <div className="nav-actions"><button className="icon-button theme-button" onClick={theme} aria-label={light?"Switch to dark theme":"Switch to light theme"}>{light?<Moon size={17}/>:<Sun size={17}/>}</button><a className="nav-contact" href={"mailto:"+identity.email}>Let’s talk <ArrowUpRight size={14}/></a><button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={()=>menu.current?.showModal()}><Menu size={21}/></button></div>
 </nav></header>
 {children}
 <footer className="footer container"><Link className="brand" href="/"><Activity size={22}/> Shubham Bhat</Link><span>© {new Date().getFullYear()} Shubham Bhat</span><div className="footer-controls"><button className="quiet-button" onClick={()=>setPaused(!paused)}>{paused?<Play size={13}/>:<Pause size={13}/>} {paused?"Resume motion":"Pause motion"}</button><button className="quiet-button" onClick={()=>palette.current?.showModal()} aria-label="Open command palette"><Command size={13}/> K</button><a href="#main">Back to top ↑</a></div></footer>
 <dialog ref={menu} className="menu-dialog" onClick={e=>{if(e.target===e.currentTarget)menu.current?.close()}}><button className="icon-button dialog-close" onClick={()=>menu.current?.close()} aria-label="Close navigation"><X/></button><p className="eyebrow">FIND YOUR SIGNAL</p>{nav.map(([label,id],i)=><Link key={id} onClick={()=>menu.current?.close()} href={"/#"+id}><span>0{i+1}</span>{label}<ArrowUpRight/></Link>)}</dialog>
 <dialog ref={palette} className="command-dialog" onClick={e=>{if(e.target===e.currentTarget)palette.current?.close()}}><div className="dialog-heading"><h2>Follow the signal</h2><button className="icon-button" onClick={()=>palette.current?.close()} aria-label="Close command palette"><X size={20}/></button></div><p>Jump to a section. Escape to close.</p>{[...nav,["Black Hat","black-hat"],["Skills","skills"],["GitHub","github"]].map(([label,id])=><Link key={id} href={"/#"+id} onClick={()=>palette.current?.close()}>{label}<ArrowUpRight size={16}/></Link>)}<small>Signal found. Keep questioning the green cells.</small></dialog>
 </>;
}

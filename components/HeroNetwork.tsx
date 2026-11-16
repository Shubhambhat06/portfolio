"use client";
import dynamic from "next/dynamic";
import {useEffect,useState} from "react";
import {research} from "@/data/content";
const Scene=dynamic(()=>import("./NetworkScene"),{ssr:false});
export default function HeroNetwork(){const [ready,setReady]=useState(false),[paused,setPaused]=useState(false),[selected,setSelected]=useState(2);
 useEffect(()=>{const observer=new MutationObserver(()=>setPaused(document.documentElement.dataset.motion==="paused"));observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-motion"]});setPaused(document.documentElement.dataset.motion==="paused");let timer:ReturnType<typeof setTimeout>|undefined;if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&innerWidth>767){const canvas=document.createElement("canvas");if(canvas.getContext("webgl2")||canvas.getContext("webgl"))timer=setTimeout(()=>setReady(true),2400)}return()=>{observer.disconnect();clearTimeout(timer)}},[]);
 const coords=[[26,31],[73,25],[84,59],[56,82],[19,68]];
 return <div className="network-visual">
 <div className="network-topline"><span><i className="status-dot"/> IR-BOUND DETECTION NETWORK</span><span>FIG. 001</span></div>
 <div className="network-stage">
 {ready&&!paused&&<div className="three-layer"><Scene/></div>}
 <div className="radar-ring ring-one"/><div className="radar-ring ring-two"/><div className="radar-ring ring-three"/><div className="radar-cross horizontal"/><div className="radar-cross vertical"/>
 <svg className="network-lines" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="signal"><stop stopColor="#ff8d87"/><stop offset="1" stopColor="#8d7af4"/></linearGradient></defs>{coords.map(([x,y],i)=><g key={i}><line x1="50" y1="50" x2={x} y2={y} stroke={selected===i?"url(#signal)":"#6b567d"} strokeWidth={selected===i?.4:.18} strokeDasharray={selected===i?"0":"1 1"}/><circle r=".65" fill="#c2a1fb"><animateMotion dur={3+i*.5+"s"} repeatCount="indefinite" path={"M 50 50 L "+x+" "+y}/></circle></g>)}</svg>
 <div className="ir-core"><span>IR</span><small>ONE CONTRACT</small></div>
 {research.platforms.map((p,i)=><button key={p.name} onClick={()=>setSelected(i)} className={"platform-node node-"+i+(selected===i?" selected":"")} style={{left:coords[i][0]+"%",top:coords[i][1]+"%"}} aria-pressed={selected===i}><span className="node-mark">{p.name.slice(0,1)}</span><span>{p.name}<small>{p.language}</small></span></button>)}
 <span className="orbit-label">SEMANTICS PRESERVED</span>
 </div>
 <div className="network-bottom"><span>INPUT → CLASSIFY → TRANSLATE</span><span className="network-output">{research.platforms[selected].language} <i/> ATT&CK BOUND</span></div>
 </div>
}

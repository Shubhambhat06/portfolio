import {Search,ShieldCheck,Waypoints,Code2,Database} from "lucide-react";
export default function ProjectArt({kind}:{kind:string}){return <div className={"project-art art-"+kind} aria-hidden="true">
 {kind==="search"?<div className="search-art"><div className="mock-search"><Search size={15}/><span>find code that understands intent</span><kbd>↵</kbd></div><div className="code-result"><span className="code-language">PYTHON <b>0.94</b></span><code><em>def</em> semantic_search(query):<br/>&nbsp; vector = encoder(query)<br/>&nbsp; <em>return</em> index.search(vector)</code></div><div className="code-ghost"/></div>
 :kind==="map"?<div className="map-art">{Array.from({length:64},(_,i)=><i key={i} style={{opacity:((i*7)%11+2)/13,transform:"translateY("+Math.sin(i)*5+"px)"}}/>)}<span className="map-annotation">42 / 58<br/><small>ENTITIES RESOLVED</small></span></div>
 :kind==="scan"?<div className="scan-art"><div className="scan-circle"><ShieldCheck size={54} strokeWidth={1}/></div><span className="scan-label">FIND → EXPLAIN → REMEDIATE</span></div>
 :kind==="chart"?<div className="chart-art">{Array.from({length:22},(_,i)=><i key={i} style={{height:(18+Math.pow(i/21,2)*105+Math.sin(i)*8)+"px"}}/>)}<span>LOG-SCALE / ENSEMBLE</span></div>
 :kind==="wave"?<div className="wave-art">{Array.from({length:52},(_,i)=><i key={i} style={{height:((i===30||i===31)?110:12+Math.abs(Math.sin(i*1.7))*30)+"px"}}/>)}<span className="anomaly-label">ANOMALY DETECTED</span></div>
 :kind==="network"?<div className="mini-network"><Waypoints size={100} strokeWidth={.7}/><span>CONTROL PLANE → DATA PLANE</span></div>
 :<div className="web-art"><div><Code2 size={28}/><i/><i/><i/></div><div><Database size={20}/><i/><i/></div></div>}
 <span className="art-caption">CONCEPTUAL VIEW</span>
 </div>}

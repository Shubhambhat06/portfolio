"use client";
import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import {motion,useReducedMotion} from "framer-motion";
import {ArrowUpRight,ArrowDown,ArrowRight,Check,Shield,GitBranch,Terminal,Copy,CheckCheck,ExternalLink,Radio,ChevronDown} from "lucide-react";
import {identity,roles,research,talk,projects,filters,about,skills,technologies,journey,recognition,todos,contact} from "@/data/content";
import HeroNetwork from "./HeroNetwork";
import ProjectArt from "./ProjectArt";
import GitHubSection from "./GitHubSection";
import ContactForm from "./ContactForm";

function SectionLabel({number,children}:{number:string;children:React.ReactNode}){return <div className="section-label"><span>{number}</span><p>{children}</p><i/></div>}
function Notes({items}:{items:readonly string[]}){return <details className="source-notes"><summary>Source notes <ChevronDown size={14}/></summary>{items.map(n=><p key={n}>{n}</p>)}</details>}
function Reveal({children,className=""}:{children:React.ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.65,ease:[.22,1,.36,1]}}>{children}</motion.div>}

export default function Portfolio(){
 const [filter,setFilter]=useState("All"),[safe,setSafe]=useState(true),[copied,setCopied]=useState(false);
 const pipeline=useRef<HTMLDivElement>(null);
 useEffect(()=>{let revert:undefined|(()=>void);let disposed=false;Promise.all([import("gsap"),import("gsap/ScrollTrigger")]).then(([{gsap},{ScrollTrigger}])=>{if(disposed)return;gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();mm.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)",()=>{if(!pipeline.current)return;gsap.fromTo(".pipeline-progress",{scaleX:0},{scaleX:1,ease:"none",scrollTrigger:{trigger:pipeline.current,start:"top 45%",end:"bottom 25%",scrub:true}})});revert=()=>mm.revert()});return()=>{disposed=true;revert?.()}},[]);
 const copy=async()=>{try{await navigator.clipboard.writeText(identity.email);setCopied(true);setTimeout(()=>setCopied(false),2500)}catch{window.location.href="mailto:"+identity.email}};
 return <main id="main">
 <section className="studio-hero" aria-labelledby="hero-title">
   <div className="studio-stage container">
     <div className="studio-copy">
       <p className="studio-kicker"><i/> Detection engineering &amp; applied AI</p>
       <h1 id="hero-title">Shubham<br/><em>Bhat.</em></h1>
       <p className="studio-intro">I build security systems that preserve the meaning of a detection across platforms.</p>
       <div className="studio-actions"><a className="studio-primary" href="#projects">Explore my work</a><a className="studio-link" href="#research">Read the research</a></div>
     </div>
     <figure className="signal-object">
       <img src={(process.env.NEXT_PUBLIC_BASE_PATH || "")+"/signal-knot.webp"} width="1200" height="1120" fetchPriority="high" alt="A continuous copper filament woven into a three-dimensional knot"/>
       <figcaption><i/> Signal study <span>/</span> Continuous loop</figcaption>
     </figure>
   </div>
   <div className="studio-foot container"><span>Bengaluru, India</span><a href="#black-hat">Black Hat Arsenal · India 2026</a></div>
 </section>

 <section id="research" className="section container research-section">
 <SectionLabel number="01">THE QUESTION BEHIND THE RESEARCH</SectionLabel>
 <Reveal className="research-heading"><div><p className="eyebrow violet">FEATURED RESEARCH / NL-SIEM</p><h2>The heatmap is green.<br/><span className="muted-heading">Is your detection working?</span></h2></div><p>{research.description}</p></Reveal>
 <Reveal><div className="research-console">
 <div className="console-toolbar"><span><i className="status-dot"/> COVERAGE INTEGRITY LAB</span><span className="mono">INTERACTIVE DEMONSTRATION</span></div>
 <div className="drift-grid"><div className="drift-story"><span className="micro-label">01 / THE SILENT FAILURE</span><h3>{safe?"Preserve the intent.":"A label isn’t a detection."}</h3><p>{safe?"Classify ATT&CK before generation. Bind the meaning to the IR. Replay and validate the translated rule before trusting it.":"A query can keep its ATT&CK label and pass syntax checks while silently losing the behavior it was meant to detect."}</p><div className="segmented" role="group" aria-label="Coverage workflow"><button aria-pressed={!safe} onClick={()=>setSafe(false)}>Traditional translation</button><button aria-pressed={safe} onClick={()=>setSafe(true)}>NL-SIEM <Check size={13}/></button></div></div>
 <div className={"heatmap-panel "+(safe?"protected":"drifted")}><div className="heatmap-heading"><span>DOCUMENTED COVERAGE</span><span className="mint">MARKED COVERED</span></div><div className="coverage-grid">{Array.from({length:70},(_,i)=><span key={i} className={i%13===0?"soft":""}/>)}</div><div className="detection-result"><span className={"result-icon "+(safe?"":"failure")}>{safe?<CheckCheck size={19}/>:<span>!</span>}</span><div><strong>{safe?"Detection contract preserved":"Coverage drift exposed"}</strong><small>{safe?"Replay → validate → analyst review":"The heatmap stays green. The rule misses."}</small></div><span className="result-state">{safe?"IR BOUND":"MISMATCH"}</span></div></div>
 </div><div className="console-footnote">Illustrative workflow, not live telemetry. Execution-backed validation covers Elastic and Wazuh; no claim of zero measured drift.</div>
 </div></Reveal>
 <details className="network-disclosure"><summary>Explore the five translation targets</summary><HeroNetwork/></details>
 <div className="pipeline-block" ref={pipeline}><div className="pipeline-title"><p className="eyebrow">ONE DETECTION. ONE CONTRACT. FIVE PLATFORMS.</p><span>NL → ATT&CK → IR → SIEM</span></div><div className="pipeline-track"><div className="pipeline-progress"/>{research.pipeline.map((s,i)=><div className="pipeline-step" key={s.label}><span className="step-number">0{i+1}</span><h4>{s.label}</h4><p>{s.detail}</p>{i<4&&<ArrowRight size={15}/>}</div>)}</div><div className="platform-chips">{research.platforms.map(p=><span key={p.name}>{p.name}<small>{p.language}</small></span>)}</div></div>
 <div className="metrics-row">{research.metrics.map(m=><div key={m.label}><strong>{m.value}</strong><span>{m.label}</span><p>{m.note}</p></div>)}</div>
 <div className="research-paper"><div><span className="eyebrow">THE PAPER / {research.status.toUpperCase()}</span><h3>{research.paper}</h3><p>{research.authors} · {research.affiliation}</p></div><a className="button secondary" href={research.repo} target="_blank" rel="noreferrer">Explore the repository <ArrowUpRight size={16}/></a></div>
 
 </section>

 <section id="black-hat" className="blackhat-section"><div className="container"><SectionLabel number="02">FROM RESEARCH TO THE WORLD STAGE</SectionLabel><div className="blackhat-content"><div className="blackhat-copy"><p className="eyebrow">BLACK HAT ARSENAL / INDIA 2026</p><h2>From the SOC.<br/>To the <span className="serif-word">Arsenal.</span></h2><p>{talk.description}</p><div className="talk-meta"><span><Radio size={15}/> {talk.date}</span><span>Co-presented with {talk.copresenter}</span></div><a className="text-link" href={research.repo} target="_blank" rel="noreferrer">Meet the project behind the talk <ArrowUpRight size={17}/></a></div><div className="arsenal-ticket"><div className="ticket-header"><span className="ticket-bh">BLACK HAT<span>ARSENAL</span></span><ArrowUpRight size={28}/></div><div className="ticket-middle"><span className="eyebrow">INDIA / 2026</span><h3>NL-SIEM</h3><p>DETECTION WITHOUT<br/>LOSING THE INTENT.</p></div><div className="ticket-tear"/><div className="ticket-bottom"><div><small>PRESENTER</small><strong>Shubham Bhat</strong></div><span className="barcode" aria-hidden="true"/></div><span className="ticket-label">PORTFOLIO COMMEMORATIVE CARD</span></div></div></div></section>

 <section id="projects" className="section container"><SectionLabel number="03">SELECTED WORK</SectionLabel><Reveal className="section-heading"><div><h2>Built to answer<br/><span className="muted-heading">better questions.</span></h2></div><p>From retrieval to infrastructure.<br/>A collection of problems, decisions,<br/>and the systems that followed.</p></Reveal>
 <div className="project-filters" role="group" aria-label="Filter projects">{filters.map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}{f===filter&&<span>{projects.filter(p=>f==="All"||p.category.includes(f)).length.toString().padStart(2,"0")}</span>}</button>)}</div>
 <p className="sr-only" aria-live="polite">{projects.filter(p=>filter==="All"||p.category.includes(filter)).length} projects shown</p>
 <div className="project-grid">{projects.filter(p=>filter==="All"||p.category.includes(filter)).map((p,i)=><motion.article layout initial={{opacity:0}} animate={{opacity:1}} key={p.slug} className={"project-card "+(p.art==="web"?"compact-project":"")}><Link href={"/projects/"+p.slug+"/"} className="project-card-link"><ProjectArt kind={p.art}/><div className="project-card-copy"><div className="card-kicker"><span>{p.category.join(" / ")}</span><ArrowUpRight size={22}/></div><h3>{p.short}</h3><p>{p.title}</p><div className="card-bottom"><span>{p.stack.slice(0,3).join(" · ")}</span><span className="view-label">VIEW CASE STUDY <ArrowUpRight size={12}/></span></div></div></Link></motion.article>)}</div>
 <div className="projects-end"><span>Curiosity is the common thread.</span><a className="text-link" href={identity.github} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={15}/></a></div>
 
 </section>

 <section id="about" className="section about-section"><div className="container"><SectionLabel number="04">THE PERSON BEHIND THE SIGNAL</SectionLabel><div className="about-grid"><Reveal className="about-identity"><div className="identity-art"><span className="identity-coordinate">12.9716° N / 77.5946° E<span>UNIVERSITY CITY / BENGALURU</span></span><div className="monogram">S<span>B</span><i/></div><div className="identity-signature">Shubham Bhat<span>SECURITY × APPLIED AI</span></div></div></Reveal><Reveal className="about-copy"><p className="eyebrow violet">LOOKS RIGHT ≠ IS RIGHT</p><h2>{about.title}</h2>{about.paragraphs.map((p,i)=><p key={i} className={i===1?"philosophy":""}>{p}</p>)}<div className="about-bottom"><span><i className="status-dot"/> CURRENTLY BUILDING</span><p>{research.current}</p></div></Reveal></div></div></section>

 <section id="skills" className="section container"><SectionLabel number="05">CAPABILITY, WITH RECEIPTS</SectionLabel><div className="section-heading"><h2>Evidence over<br/><span className="muted-heading">endorsements.</span></h2><p>Honest depth. Proof beside every claim.<br/>Select a skill to see the work behind it.</p></div><div className="skill-list">{skills.map((s,i)=><a className="skill-row" key={s.name} href={s.href.startsWith("/") ? (process.env.NEXT_PUBLIC_BASE_PATH || "") + s.href : s.href}><span className="skill-index">0{i+1}</span><h3>{s.name}</h3><span className={"depth "+(s.level==="FAMILIAR"?"familiar":"")}>{s.level}</span><p>{s.proof}</p><ArrowUpRight size={19}/></a>)}</div></section>
 <div className="tech-marquee" aria-label="Technology stack"><div>{[...technologies,...technologies].map((t,i)=><span key={i} aria-hidden={i>=technologies.length}>{t}<i>✳</i></span>)}</div></div>

 <section id="journey" className="section container"><SectionLabel number="06">LEARNING / BUILDING / SHARING</SectionLabel><div className="journey-grid"><div><h2>Beyond<br/><span className="muted-heading">the code.</span></h2><p className="journey-intro">The best way to understand something is to build it. The next best is to teach it.</p></div><div className="timeline">{journey.map((j,i)=><Reveal className="timeline-item" key={j.role}><span className="timeline-dot"/><span className="eyebrow">{j.org}</span><h3>{j.role}</h3><p>{j.detail}</p></Reveal>)}</div></div>
 <div className="recognition-heading"><span className="eyebrow">RECOGNITION</span><i/></div><div className="recognition-grid">{recognition.map((r,i)=><div className="recognition-card" key={r.title}><span className="recognition-icon">{i===0?<Radio size={21}/>:<span>✳</span>}</span><span className="recognition-year">{r.year}</span><h3>{r.title}</h3><p>{r.detail}</p></div>)}</div></section>
 <GitHubSection/>
 <section id="contact" className="section contact-section container"><SectionLabel number="08">START A CONVERSATION</SectionLabel><div className="contact-grid"><div><p className="eyebrow"><i className="status-dot"/> GOOD QUESTIONS ARE ALWAYS WELCOME</p><h2>Let’s talk<br/><span className="gradient-text">detection.</span><ArrowUpRight className="contact-arrow" strokeWidth={1}/></h2><p>{contact.description}</p><div className="email-row"><a href={"mailto:"+identity.email}>{identity.email}</a><button className="icon-button" onClick={copy} aria-label={copied?"Email copied":"Copy email address"}>{copied?<Check size={17}/>:<Copy size={17}/>}</button><span className="sr-only" aria-live="polite">{copied?"Email address copied":""}</span></div><div className="social-links"><a href={identity.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a></div></div><ContactForm/></div></section>
 </main>;
}

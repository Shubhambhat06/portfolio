
export type Project = {
 slug:string; title:string; short:string; category:string[]; subtitle:string;
 problem:string; approach:string[]; result:string; stack:string[];
 metrics:{value:string;label:string}[]; repo:string|null; art:string; note?:string;
};
export const identity = {
 name:"Shubham Dattatraya Bhat", short:"Shubham Bhat", initials:"SB",
 email:"shubhambhat003@gmail.com", github:"https://github.com/Shubhambhat06",
 linkedin:"https://www.linkedin.com/in/shubham-bhat-aab037344/",
 tagline:"Detecting what you think you detect.",
 description:"Detection engineer and applied AI researcher. B.Tech CSE (AI/ML) at PES University. Building systems that make security coverage more than a green square.",
 origin:"https://shubhambhat06.github.io/portfolio"
};
const repo=(name:string)=>identity.github+"/"+name;
export const nav=[["Research","research"],["Work","projects"],["About","about"],["Contact","contact"]] as const;
export const roles=["Detection Engineer","AI × Security Researcher","Black Hat Arsenal Presenter","Building NL-SIEM"];
export const research={
 title:"NL-SIEM", subtitle:"The heatmap is green. Is your detection working?",
 paper:"Detecting What You Think You Detect: Cross-Platform SIEM Query Generation and Prevention of ATT&CK Coverage Drift using Intermediate Representation and LLMs",
 authors:"Bhat, S.D. & Swetha P.", status:"Preprint under review", affiliation:"PESU C-ISFCR",
 repo:repo("Cross-SIEM-Query-Translation-Framework"),
 description:"A detection can pass every syntax check and still catch nothing. NL-SIEM carries ATT&CK identity through a shared intermediate representation, so the meaning of a detection travels with its query.",
 story:"A coverage heatmap can stay green while the detection behind it silently stops working once it is ported to another SIEM. I named this failure mode ATT&CK Coverage Drift, then built a multi-agent framework to prevent it by design.",
 pipeline:[{label:"Describe",detail:"Natural-language detection"},{label:"Classify",detail:"Multi-technique ATT&CK"},{label:"Preserve",detail:"Platform-agnostic IR"},{label:"Translate",detail:"5 independent SIEM agents"},{label:"Validate",detail:"Syntax + execution-backed"}],
 platforms:[{name:"Splunk",language:"SPL"},{name:"QRadar",language:"AQL"},{name:"Elastic",language:"ES|QL"},{name:"Sentinel",language:"KQL"},{name:"Wazuh",language:"XML"}],
 metrics:[{value:"91.4%",label:"Syntactic validity",note:"Author-reported syntax validity; not detection correctness."},{value:"0.67",label:"BLEU-4",note:"Author-reported translation similarity."},{value:"241",label:"Benchmark records",note:"SIEMBench benchmark size."},{value:"5",label:"SIEM platforms",note:"Translation targets. Execution-backed validation covers Elastic and Wazuh."}],
 current:"Extending multi-technique ATT&CK classification and Splunk / QRadar / Sentinel connectivity. Elastic and Wazuh have live, SOC-validated connectors.",
 notes:[
 "TODO: Add the public paper URL.",
 "TODO: Confirm publication status: the README has an Accepted badge but describes the paper as under review.",
 "TODO: Reconcile the brief’s headline metrics with the current README evaluation table.",
 "TODO: Confirm roadmap wording: the README lists a Splunk connector with live validation pending."
 ]
};
export const talk={
 title:"From the SOC. To the Arsenal.",
 event:"Black Hat Arsenal", edition:"India 2026", date:"30 October 2026", isoDate:"2026-10-30",
 role:"Presenter", copresenter:"Dr Swetha P.",
 description:"A live demonstration of NL-SIEM: translating detections across SIEM platforms without losing MITRE ATT&CK coverage.",
 notes:["TODO: Add the official session link and public recording.","TODO: Add an approved stage photograph."]
};
export const projects:Project[]=[
 {slug:"semantic-code-search",title:"Semantic Code Search Engine",short:"Search by meaning.",category:["ML","Full-Stack"],subtitle:"CodeBERT × FAISS · 51,000 snippets",problem:"Keyword search does not understand code semantics. A query like “sort a list” misses idiomatic implementations that share no vocabulary.",approach:["Fine-tuned a CodeBERT bi-encoder with InfoNCE contrastive loss on CodeSearchNet across Python, Java, and Go.","Indexed 51,000 snippets with FAISS IndexFlatIP.","Shipped ranked results, inline previews, and per-language filters with FastAPI and React."],result:"8.06 ms median retrieval and 9.76 ms P95, with 0.7972 MRR@10 (rounded to 0.80).",stack:["Python","CodeBERT","FAISS","FastAPI","React"],metrics:[{value:"51K",label:"Code snippets"},{value:"8.06 ms",label:"Median retrieval"},{value:"0.80",label:"MRR@10"}],repo:repo("Semantic-code-search"),art:"search",note:"Latency measures retrieval only, excluding query encoding. MRR@10 was measured on 200 held-out pairs."},
 {slug:"aadhaar-service-demand",title:"Aadhaar Service Demand & Infrastructure Stress",short:"Find the hidden gaps.",category:["Data"],subtitle:"Entity resolution × geospatial analysis",problem:"Inconsistent state and district names in UIDAI datasets break joins against GeoJSON boundaries.",approach:["Applied Unicode normalisation and RapidFuzz token_sort_ratio with threshold 85.","Joined cleaned records to district boundaries using GeoPandas.","Built four ratio-based infrastructure stress metrics with z-score and IQR outlier detection."],result:"Automatically resolved 42 of 58 name variants. High-volume districts do not uniformly show high update pressure, surfacing less obvious infrastructure gaps.",stack:["Python","GeoPandas","Pandas","RapidFuzz"],metrics:[{value:"42 / 58",label:"Name variants resolved"},{value:"4",label:"Stress metrics"}],repo:repo("aadhaar-demand-geospatial-analysis"),art:"map"},
 {slug:"web-vulnerability-scanner",title:"Web Vulnerability Scanner",short:"Findings into fixes.",category:["Security","Full-Stack"],subtitle:"Concurrent crawling × AI remediation",problem:"Scan output is usually a raw findings dump that developers must interpret themselves.",approach:["Built a multi-threaded BFS crawler with a thread-safe visited set.","Used SQLi and XSS payload injection with pattern-matched response analysis.","Turned findings into readable explanations and prioritised remediation using the OpenAI API."],result:"Structured JSON findings for CI/CD gating, paired with readable remediation reports.",stack:["Python","Flask","OpenAI API"],metrics:[],repo:null,art:"scan",note:"TODO: Add the repository URL; this project is described in the GitHub profile but no matching public repository was identified."},
 {slug:"movie-revenue-prediction",title:"Movie Box Office Revenue Prediction",short:"Model the long tail.",category:["ML","Data"],subtitle:"XGBoost × Random Forest · TMDB",problem:"Movie revenue is heavily right-skewed, allowing blockbuster outliers to dominate naive regression.",approach:["Applied a log-scale target transform.","Combined XGBoost and Random Forest with cross-validation and grid search.","Engineered multi-hot genres, cyclical seasonality, and budget normalisation."],result:"Optimised RMSE while limiting overfitting on outlier blockbusters.",stack:["Python","XGBoost","scikit-learn"],metrics:[],repo:repo("Movie-Box-Office-Revenue-Prediction"),art:"chart",note:"TODO: Add a reproducible numerical RMSE and evaluation context."},
 {slug:"log-anomaly-detection",title:"Distributed Real-Time Log Anomaly Detection",short:"Separate signal from noise.",category:["Security","Systems","ML"],subtitle:"Kafka × Isolation Forest × Redis",problem:"Streaming microservice logs need continuous feature extraction, anomaly detection, and alert deduplication.",approach:["Ingested logs through Apache Kafka and extracted rolling per-service features.","Scored windows with Isolation Forest.","Used Redis for alert deduplication and severity buckets, with a live Flask dashboard."],result:"A streaming pipeline that turns service logs into deduplicated anomaly alerts.",stack:["Python","Kafka","Isolation Forest","Redis","Flask"],metrics:[],repo:repo("log-anomally-detection"),art:"wave"},
 {slug:"sdn-traffic-control",title:"SDN Traffic Control & QoS",short:"Networks, programmable.",category:["Systems"],subtitle:"POX × Mininet × OpenFlow",problem:"Traffic policies need programmable protocol classification and forwarding control.",approach:["Built a Mininet network managed by a POX controller.","Handled PacketIn events and installed OpenFlow match-action rules.","Classified ICMP and TCP traffic and demonstrated forwarding and host-specific blocking."],result:"Controller-driven traffic classification and allowed-versus-blocked traffic scenarios.",stack:["Python","POX","Mininet","OpenFlow"],metrics:[],repo:repo("SDN-Based-Traffic-Control-and-QoS-Implementation-using-POX-and-Mininet"),art:"network"},
 {slug:"responsive-web-application",title:"Responsive Web Application Development",short:"Built for every viewport.",category:["Full-Stack"],subtitle:"React × Tailwind × Vite",problem:"Layouts need to stay usable across desktop, tablet, and mobile screens.",approach:["Composed reusable React components.","Built responsive layouts with Tailwind CSS.","Used Vite for development and production builds."],result:"A responsive frontend with modular components. Backend integration is listed as future work in the README.",stack:["JavaScript","React","Tailwind","Vite"],metrics:[],repo:repo("Responsive-Web-Application-Development"),art:"web"}
];
export const filters=["All","Security","ML","Data","Systems","Full-Stack"];
export const about={
 title:"I question the green squares.",
 paragraphs:["I’m Shubham, a B.Tech CSE student specialising in AI/ML at PES University. My work sits where security operations meet applied AI.","I’m drawn to problems where the answer that looks right and the answer that is right quietly diverge.","In a SOC, that showed up as detection rules that pass every check yet catch nothing. So I started building systems that make that failure structurally preventable."],
 portraitTodo:"TODO: Add an approved portrait.",
};
export const skills=[
 {name:"Security / Detection Engineering",level:"PRACTISED",proof:"NL-SIEM validated in SOC use. Live Elastic and Wazuh connectors.",href:"#research"},
 {name:"Machine Learning / Retrieval",level:"PRACTISED",proof:"CodeBERT fine-tuning, FAISS at 51K vectors, 0.80 MRR@10.",href:"/projects/semantic-code-search/"},
 {name:"Full-Stack Development",level:"PRACTISED",proof:"React, FastAPI, and Flask. Three shipped projects with frontend and API.",href:"#projects"},
 {name:"Geospatial Analysis",level:"PRACTISED",proof:"UIDAI pipeline, GeoPandas, and fuzzy entity resolution.",href:"/projects/aadhaar-service-demand/"},
 {name:"Distributed Systems",level:"FAMILIAR",proof:"Coursework and personal-project scale. Kafka streaming and Redis deduplication.",href:"/projects/log-anomaly-detection/"}
];
export const technologies=["Python","Java","C / C++","JavaScript","React","FastAPI","Flask","Tailwind","PyTorch","Elasticsearch","Postgres","Docker","Linux","Git"];
export const journey=[
 {role:"SOC Intern",org:"PESU C-ISFCR",detail:"Detection engineering, alert triage, incident investigation, and cross-platform coverage."},
 {role:"Teaching Assistant",org:"PES University",detail:"Digital Logic and Computer Design."},
 {role:"Competitive Programming Workshops",org:"Aura Club",detail:"Running workshops for 50+ participants."},
 {role:"Transformers & LLM Alignment",org:"AIML SIG",detail:"Sharing technical deep-dives with the student community."}
];
export const recognition=[
 {title:"Black Hat Arsenal",detail:"India 2026 · NL-SIEM Presenter",year:"2026"},
 {title:"MRD Scholarship",detail:"PES University",year:"2025 / 2026"},
 {title:"CNR Scholarship",detail:"PES University",year:"2025"}
];
export const todos={
 dates:"TODO: Confirm experience date ranges. Entries are grouped by role, not presented as a dated chronology.",
 demos:"TODO: Add verified live demo URLs and approved project screenshots.",
 form:"TODO: Configure NEXT_PUBLIC_FORMSPREE_ID to enable direct form delivery. Email composition works without a service.",
};
export const contact={title:"Let’s talk detection.",description:"Open to conversations on SIEM, threat detection, MITRE ATT&CK, and applying AI to security problems."};

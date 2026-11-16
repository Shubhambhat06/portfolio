import Portfolio from "@/components/Portfolio";
import {identity} from "@/data/content";
export default function Page(){const person={"@context":"https://schema.org","@type":"Person",name:identity.name,url:identity.origin,description:identity.description,sameAs:[identity.github,identity.linkedin],affiliation:{"@type":"Organization",name:"PES University"}};return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,"\\u003c")}}/><Portfolio/></>}

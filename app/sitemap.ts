import {identity,projects} from "@/data/content";
export const dynamic="force-static";
export default function sitemap(){return [{url:identity.origin,priority:1},...projects.map(p=>({url:identity.origin+"/projects/"+p.slug+"/",priority:0.7}))]}
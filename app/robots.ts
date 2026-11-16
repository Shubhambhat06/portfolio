import {identity} from "@/data/content";
export const dynamic="force-static";
export default function robots(){return {rules:{userAgent:"*",allow:"/"},sitemap:identity.origin+"/sitemap.xml"}}
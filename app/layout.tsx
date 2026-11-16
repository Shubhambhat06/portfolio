import type {Metadata} from "next";
import {identity} from "@/data/content";
import Shell from "@/components/Shell";
import "./globals.css";
export const metadata:Metadata={metadataBase:new URL(identity.origin),title:{default:"Shubham Bhat — Detection Engineering & Applied AI",template:"%s · Shubham Bhat"},description:identity.description,openGraph:{title:"Detecting what you think you detect.",description:identity.description,type:"website",images:["/icon.svg"]},twitter:{card:"summary_large_image"},icons:{icon:(process.env.NEXT_PUBLIC_BASE_PATH || "")+"/icon.svg"}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body ><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem("signal-theme")||"dark"}catch{}`}}/><Shell>{children}</Shell></body></html>}

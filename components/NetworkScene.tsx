"use client";
import {Canvas,useFrame} from "@react-three/fiber";
import {Float} from "@react-three/drei";
import {useMemo,useRef} from "react";
import type {Group} from "three";
function Cloud(){const ref=useRef<Group>(null);const points=useMemo(()=>Array.from({length:56},(_,i)=>{const phi=Math.acos(1-2*(i+.5)/56),theta=Math.PI*(1+Math.sqrt(5))*i;return [2.35*Math.sin(phi)*Math.cos(theta),2.35*Math.cos(phi),2.35*Math.sin(phi)*Math.sin(theta)] as [number,number,number]}),[]);useFrame(({clock,pointer})=>{if(ref.current){ref.current.rotation.y=clock.elapsedTime*.035+pointer.x*.14;ref.current.rotation.x=pointer.y*.08}});return <group ref={ref}><Float speed={.7} rotationIntensity={.12} floatIntensity={.2}><mesh><icosahedronGeometry args={[1.65,1]}/><meshBasicMaterial color="#9d79d0" wireframe transparent opacity={.12}/></mesh>{points.map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[i%5===0?.035:.018,6,6]}/><meshBasicMaterial color={i%3===0?"#ff8e88":"#a494d9"} transparent opacity={.7}/></mesh>)}</Float></group>}
export default function NetworkScene(){return <Canvas camera={{position:[0,0,6.8],fov:48}} dpr={[1,1.5]} gl={{alpha:true,antialias:false,powerPreference:"low-power"}} aria-hidden="true"><Cloud/></Canvas>}

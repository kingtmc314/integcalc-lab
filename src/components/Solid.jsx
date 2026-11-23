import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Play,Pause,RotateCcw} from 'lucide-react';
import {cn,ln} from '../lib/solver';
import {useLanguage} from '../i18n';
export default function Solid({input,externalSweep=null,slicePosition=null}) {
 const {t}=useLanguage(),host=useRef(null),api=useRef(null),[error,setError]=useState(false),[sweep,setSweep]=useState(1),[playing,setPlaying]=useState(false),[speed,setSpeed]=useState(1),[orbit,setOrbit]=useState(false),orbitRef=useRef(false);
 useEffect(()=>{orbitRef.current=orbit;},[orbit]);
 useEffect(()=>{let id,last;function frame(time){if(last&&playing)setSweep(x=>{const next=x+(time-last)/7000*speed;if(next>=1){setPlaying(false);return 1;}return next;});last=time;id=requestAnimationFrame(frame);}if(playing)id=requestAnimationFrame(frame);return()=>cancelAnimationFrame(id);},[playing,speed]);
 useEffect(()=>{const box=host.current;if(!box)return;setError(false);let renderer,raf,controls,observer;const scene=new THREE.Scene();scene.background=new THREE.Color('#f5f7f3');
 try {
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));box.appendChild(renderer.domElement);
 const camera=new THREE.PerspectiveCamera(40,1,.01,1000),a=cn(input.a),b=cn(input.b),offset=cn(input.axisValue||'0'),vertical=['y-axis','x=h'].includes(input.axis),varY=input.variable==='y';
 if(!isFinite(a)||!isFinite(b)||!isFinite(offset)||a>=b)throw Error('invalid');
 const samples=Array.from({length:65},(_,i)=>{const x=a+(b-a)*i/64;return {v:x,f:ln(input.f,x,input.variable),g:ln(input.g||'0',x,input.variable)};});
 if(samples.some(p=>!isFinite(p.f)||!isFinite(p.g)))throw Error('invalid');
 function point(v,d,theta){const x=varY?d:v,y=varY?v:d;return vertical?new THREE.Vector3(offset+(x-offset)*Math.cos(theta),y,(x-offset)*Math.sin(theta)):new THREE.Vector3(x,offset+(y-offset)*Math.cos(theta),(y-offset)*Math.sin(theta));}
 const bound=new THREE.Box3();for(const p of samples)for(const d of [p.f,p.g])for(let j=0;j<4;j++)bound.expandByPoint(point(p.v,d,j*Math.PI/2));const center=bound.getCenter(new THREE.Vector3()),size=Math.max(...bound.getSize(new THREE.Vector3()).toArray(),1);
 camera.position.copy(center).add(new THREE.Vector3(size*1.7,size*1.3,size*2));controls=new OrbitControls(camera,renderer.domElement);controls.target.copy(center);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=size*.5;controls.maxDistance=size*8;controls.update();
 scene.add(new THREE.HemisphereLight(0xffffff,0xa0b5a1,2.8));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(5,8,6);scene.add(light);
 const group=new THREE.Group();scene.add(group);const material=new THREE.MeshStandardMaterial({color:'#4f957b',roughness:.35,metalness:.06,transparent:true,opacity:.78,side:THREE.DoubleSide});
 function build(amount){while(group.children.length){const child=group.children.pop();child.geometry?.dispose();}
 const vertices=[],indices=[];const steps=48,thetaMax=Math.max(.001,amount)*Math.PI*2;
 function surf(which){const start=vertices.length/3;for(let i=0;i<samples.length;i++)for(let j=0;j<=steps;j++){const p=samples[i],q=point(p.v,p[which],j/steps*thetaMax);vertices.push(q.x,q.y,q.z);}for(let i=0;i<samples.length-1;i++)for(let j=0;j<steps;j++){const u=start+i*(steps+1)+j;indices.push(u,u+1,u+steps+1,u+1,u+steps+2,u+steps+1);}}
 surf('f');surf('g');
 function cap(tIndex){const p=samples[tIndex],start=vertices.length/3;for(let j=0;j<=steps;j++)for(const d of [p.f,p.g]){const q=point(p.v,d,j/steps*thetaMax);vertices.push(q.x,q.y,q.z);}for(let j=0;j<steps;j++){const u=start+2*j;indices.push(u,u+1,u+2,u+1,u+3,u+2);}}cap(0);cap(samples.length-1);
 for(const theta of [0,thetaMax]){const start=vertices.length/3;for(const p of samples)for(const d of [p.f,p.g]){const q=point(p.v,d,theta);vertices.push(q.x,q.y,q.z);}for(let i=0;i<samples.length-1;i++){const u=start+2*i;indices.push(u,u+1,u+2,u+1,u+3,u+2);}}
 const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geom.setIndex(indices);geom.computeVertexNormals();group.add(new THREE.Mesh(geom,material));}
 build(externalSweep??sweep);
 const axisLength=size*.95;const axisBase=new THREE.Vector3(0,0,0);const colors=['#729b87','#c8874b','#7984b6'];
 ['X','Y','Z'].forEach((label,i)=>{const end=new THREE.Vector3();end.setComponent(i,axisLength);const geom=new THREE.BufferGeometry().setFromPoints([axisBase,end]);scene.add(new THREE.Line(geom,new THREE.LineBasicMaterial({color:colors[i]})));const c=document.createElement('canvas');c.width=128;c.height=128;const ctx=c.getContext('2d');ctx.font='bold 70px sans-serif';ctx.fillStyle=colors[i];ctx.textAlign='center';ctx.fillText(label,64,88);const texture=new THREE.CanvasTexture(c),sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,depthTest:false}));sprite.position.copy(end).addScalar(size*.03);sprite.scale.setScalar(size*.15);scene.add(sprite);});
 const rotStart=vertical?new THREE.Vector3(offset,center.y-size*.7,0):new THREE.Vector3(center.x-size*.7,offset,0),rotEnd=vertical?new THREE.Vector3(offset,center.y+size*.7,0):new THREE.Vector3(center.x+size*.7,offset,0);const rotGeom=new THREE.BufferGeometry().setFromPoints([rotStart,rotEnd]);const line=new THREE.Line(rotGeom,new THREE.LineDashedMaterial({color:'#bd7565',dashSize:size*.035,gapSize:size*.025}));line.computeLineDistances();scene.add(line);
 api.current={build};
 const resize=()=>{const w=box.clientWidth,h=box.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};observer=new ResizeObserver(resize);observer.observe(box);resize();
 const draw=()=>{controls.autoRotate=orbitRef.current;controls.autoRotateSpeed=.8;controls.update();renderer.render(scene,camera);raf=requestAnimationFrame(draw);};draw();
 }catch {setError(true);renderer?.domElement?.remove();}
 return()=>{cancelAnimationFrame(raf);observer?.disconnect();controls?.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material){const mats=Array.isArray(o.material)?o.material:[o.material];for(const m of mats){m.map?.dispose();m.dispose();}}});renderer?.dispose();renderer?.domElement?.remove();api.current=null;};
 },[input.f,input.g,input.a,input.b,input.axis,input.axisValue,input.variable]);
 useEffect(()=>{api.current?.build(externalSweep??sweep);},[externalSweep,sweep]);
 return <div className="solid-component"><div className="solid-canvas" ref={host} aria-label={t('solidTitle')}>{error&&<p className="solid-error">{t('webglError')}</p>}</div><div className="solid-caption"><span>{t('solidHint')}</span><span>X · Y · Z</span></div>{externalSweep===null&&<div className="solid-controls"><div className="control-line"><button className="icon-button" onClick={()=>{if(sweep>=1)setSweep(0);setPlaying(!playing);}} aria-label={t(playing?'pause':'play')}>{playing?<Pause size={16}/>:<Play size={16}/>}</button><button className="icon-button" onClick={()=>{setSweep(0);setPlaying(true);}} aria-label={t('replay')}><RotateCcw size={15}/></button><input type="range" min="0" max="1" step=".01" value={sweep} aria-label={t('sweep')} onChange={e=>{setPlaying(false);setSweep(Number(e.target.value));}}/><span className="mono">{Math.round(sweep*100)}%</span><select value={speed} aria-label={t('speed')} onChange={e=>setSpeed(Number(e.target.value))}>{[.25,.5,.75,1,2].map(s=><option key={s} value={s}>{s}×</option>)}</select></div><div className="sweep-buttons">{[0,.25,.5,.75,1].map(v=><button key={v} className={sweep===v?'selected':''} onClick={()=>{setPlaying(false);setSweep(v);}}>{v*100}%</button>)}<button className={orbit?'selected':''} onClick={()=>setOrbit(!orbit)}>{t('rotate')}</button></div></div>}</div>;
}

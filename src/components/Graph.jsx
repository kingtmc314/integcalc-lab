import React,{useMemo,useState,useEffect,useRef,useId} from 'react';
import {Plus,Minus,Maximize2} from 'lucide-react';
import {ln,cn} from '../lib/solver';
import {useLanguage} from '../i18n';
export default function Graph({input,stage=3,phase=0.5,compact=false,showControls=true}) {
 const {t}=useLanguage(),clip=useId().replace(/:/g,''),svg=useRef(null),pointers=useRef(new Map());
 const data=useMemo(()=>{const a=cn(input.a),b=cn(input.b);if(!isFinite(a)||!isFinite(b)||a>=b)return null;
 const points=Array.from({length:181},(_,i)=>{const v=a+(b-a)*i/180;return {v,f:ln(input.f,v,input.variable),g:ln(input.g||'0',v,input.variable)};});
 if(points.some(p=>!isFinite(p.f)||!isFinite(p.g)))return null;
 const vals=points.flatMap(p=>[p.f,p.g]),min=Math.min(...vals),max=Math.max(...vals),pad=(max-min||1)*.22,span=b-a;
 const base=input.variable==='y'?{x0:min-pad,x1:max+pad,y0:a-span*.15,y1:b+span*.15}:{x0:a-span*.15,x1:b+span*.15,y0:min-pad,y1:max+pad};return {a,b,points,base};},[input.f,input.g,input.a,input.b,input.variable]);
 const [view,setView]=useState(null);useEffect(()=>setView(data?.base||null),[data]);
 if(!data||!view)return <div className="graph-empty">{t('graphInvalid')}</div>;
 const W=640,H=compact?330:390,P=45;
 const X=x=>P+(x-view.x0)/(view.x1-view.x0)*(W-2*P),Y=y=>H-P-(y-view.y0)/(view.y1-view.y0)*(H-2*P);
 const pt=(v,dep)=>input.variable==='y'?`${X(dep)},${Y(v)}`:`${X(v)},${Y(dep)}`;
 const path=data.points.map((p,i)=>`${i?'L':'M'}${pt(p.v,p.f)}`).join(' '),path2=data.points.map((p,i)=>`${i?'L':'M'}${pt(p.v,p.g)}`).join(' '),region=path+' '+[...data.points].reverse().map(p=>'L'+pt(p.v,p.g)).join(' ')+' Z';
 const zoom=(factor,cx=(view.x0+view.x1)/2,cy=(view.y0+view.y1)/2)=>setView(v=>({x0:cx+(v.x0-cx)*factor,x1:cx+(v.x1-cx)*factor,y0:cy+(v.y0-cy)*factor,y1:cy+(v.y1-cy)*factor}));
 function tickVals(lo,hi){const raw=(hi-lo)/6,base=10**Math.floor(Math.log10(raw)),step=[1,2,5,10].map(x=>x*base).find(x=>x>=raw)||base*10;return Array.from({length:Math.min(20,Math.ceil((hi-lo)/step)+1)},(_,i)=>Math.ceil(lo/step)*step+i*step).filter(x=>x<=hi);}
 const xs=tickVals(view.x0,view.x1),ys=tickVals(view.y0,view.y1),xf=Math.max(P,Math.min(W-P,X(0))),yf=Math.max(P,Math.min(H-P,Y(0)));
 const count=stage===2?Math.floor(8+phase*36):stage===1?1:0;
 function slice(i){const dx=(data.b-data.a)/(count||1),v=stage===1?data.a+(data.b-data.a)*(.2+.6*phase):data.a+i*dx,thick=stage===1?(data.b-data.a)*.028:dx*.96;const f=ln(input.f,v+(stage===1?0:dx/2),input.variable),g=ln(input.g||'0',v+(stage===1?0:dx/2),input.variable);if(input.variable==='y')return <rect key={i} x={X(Math.min(f,g))} y={Y(v+thick)} width={Math.abs(X(f)-X(g))} height={Math.abs(Y(v+thick)-Y(v))} className="slice"/>;return <rect key={i} x={X(v)} y={Y(Math.max(f,g))} width={Math.abs(X(v+thick)-X(v))} height={Math.abs(Y(f)-Y(g))} className="slice"/>;}
 const screenPoint=e=>{const r=svg.current.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top,w:r.width,h:r.height};};
 function move(e){if(!pointers.current.has(e.pointerId))return;const before=[...pointers.current.values()],p=screenPoint(e);pointers.current.set(e.pointerId,p);const after=[...pointers.current.values()];if(after.length===1){const old=before[0],dx=(p.x-old.x)/p.w*(view.x1-view.x0),dy=(p.y-old.y)/p.h*(view.y1-view.y0);setView(v=>({x0:v.x0-dx,x1:v.x1-dx,y0:v.y0+dy,y1:v.y1+dy}));}else if(after.length===2){const distance=q=>Math.hypot(q[0].x-q[1].x,q[0].y-q[1].y);const factor=distance(before)/distance(after);if(isFinite(factor))zoom(Math.max(.8,Math.min(1.2,factor)));}}
 return <div className={'graph-wrap '+(compact?'compact':'')}><svg ref={svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t('graphTitle')} onPointerDown={e=>{if(!showControls)return;svg.current.setPointerCapture(e.pointerId);pointers.current.set(e.pointerId,screenPoint(e));}} onPointerMove={move} onPointerUp={e=>pointers.current.delete(e.pointerId)} onPointerCancel={e=>pointers.current.delete(e.pointerId)} onDoubleClick={()=>setView(data.base)} onWheel={e=>{if(showControls)zoom(e.deltaY>0?1.1:.9);}} style={{touchAction:showControls?'none':'auto'}}>
 <defs><clipPath id={clip}><rect x={P} y={P} width={W-2*P} height={H-2*P}/></clipPath><linearGradient id={clip+'fill'} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5a947c" stopOpacity=".27"/><stop offset="1" stopColor="#5a947c" stopOpacity=".09"/></linearGradient></defs>
 <g className="grid-lines">{xs.map(x=><line key={x} x1={X(x)} x2={X(x)} y1={P} y2={H-P}/>)}{ys.map(y=><line key={y} y1={Y(y)} y2={Y(y)} x1={P} x2={W-P}/>)}</g>
 <g className="graph-axes"><line x1={P} x2={W-P+8} y1={yf} y2={yf}/><line x1={xf} x2={xf} y1={P-8} y2={H-P}/></g>
 <g className="tick-labels">{xs.map(x=><text key={x} x={X(x)} y={H-P+21} textAnchor="middle">{Number(x.toPrecision(4))}</text>)}{ys.map(y=><text key={y} x={P-10} y={Y(y)+4} textAnchor="end">{Number(y.toPrecision(4))}</text>)}<text x={W-P+15} y={yf+4}>x</text><text x={xf+9} y={P-8}>y</text></g>
 <g clipPath={`url(#${clip})`}><path d={region} fill={`url(#${clip+'fill'})`} opacity={stage===2?.35:1}/>{count>0&&Array.from({length:count},(_,i)=>slice(i))}<path d={path} className="curve first"/><path d={path2} className="curve second"/>
 {input.axis&&<line className="rotation-line" x1={['y-axis','x=h'].includes(input.axis)?X(cn(input.axisValue||'0')):P} x2={['y-axis','x=h'].includes(input.axis)?X(cn(input.axisValue||'0')):W-P} y1={['y-axis','x=h'].includes(input.axis)?P:Y(cn(input.axisValue||'0'))} y2={['y-axis','x=h'].includes(input.axis)?H-P:Y(cn(input.axisValue||'0'))}/>}</g>
 </svg>{showControls&&<div className="graph-controls"><button className="icon-button" onClick={()=>zoom(.8)} aria-label={t('zoomIn')}><Plus size={16}/></button><button className="icon-button" onClick={()=>zoom(1.25)} aria-label={t('zoomOut')}><Minus size={16}/></button><button className="icon-button" onClick={()=>setView(data.base)} aria-label={t('fit')}><Maximize2 size={15}/></button></div>}
 <div className="graph-legend"><span><i className="legend-dot green"/>f({input.variable})</span><span><i className="legend-dot amber"/>g({input.variable})</span>{count>0&&<span><i className="legend-dot violet"/>{t('sliceLabel')}</span>}</div></div>;
}

import { cn, ln, normalize, toTex, exactIntegral, nerdamer, specialValues } from './cas.js';
export { cn, ln, toTex };
export class MathIssue extends Error { constructor(code) { super(code); this.code=code; } }
export function methodFor(p) {
  const parallel = p.variable==='y' ? ['y-axis','x=h'].includes(p.axis) : ['x-axis','y=k'].includes(p.axis);
  if(!parallel) return 'shell';
  try { return nerdamer(`(${normalize(p.g||'0')})-(${normalize(p.axisValue||'0')})`).toString()==='0' ? 'disk':'washer'; } catch { return 'washer'; }
}
function sampleRoots(expr, variable, a, b) {
  const roots=[]; let prev=ln(expr,a,variable), px=a;
  for(let i=1;i<=700;i++) {
    const x=a+(b-a)*i/700, val=ln(expr,x,variable);
    if(Number.isFinite(val)&&Number.isFinite(prev)) {
      if(prev*val<0) { let lo=px, hi=x, fl=prev; for(let j=0;j<48;j++){const m=(lo+hi)/2,v=ln(expr,m,variable); if(fl*v<=0)hi=m;else{lo=m;fl=v;}} roots.push((lo+hi)/2); }
      else if(Math.abs(val)<1e-10&&Math.abs(prev)>1e-7) roots.push(x);
    }
    prev=val;px=x;
  }
  return roots.filter(x=>x>a+1e-8&&x<b-1e-8).filter((x,i,all)=>!all.slice(0,i).some(r=>Math.abs(r-x)<1e-7));
}
function certifyRoot(expr, variable, value) {
  const candidates=[];
  try { if(!/sin|cos|tan|exp|log/.test(expr)&&expr.length<160) candidates.push(...nerdamer.solveEquations(normalize(expr),variable).map(String)); } catch {}
  for(let d=1;d<=24;d++){
    candidates.push(`${Math.round(value*d)}/${d}`);
    candidates.push(`(${Math.round(value/Math.PI*d)}/${d})*pi`);
  }
  for(const c of candidates) {
    if(Math.abs(cn(c)-value)>1e-7)continue;
    try { const r=nerdamer(normalize(expr)).sub(variable,c).toString(); if(nerdamer(specialValues(r)).simplify().toString()==='0')return nerdamer(c).toString(); } catch {}
  }
  return null;
}
function splitPoints(expressions,p,a,b) {
  const points=[{value:a,exact:p.a},{value:b,exact:p.b}];
  for(const expr of expressions)for(const value of sampleRoots(expr,p.variable,a,b)) {
    if(!points.some(q=>Math.abs(q.value-value)<1e-7))points.push({value,exact:certifyRoot(expr,p.variable,value)});
  }
  return points.sort((x,y)=>x.value-y.value);
}
function integralTex(expr,p,a=p.a,b=p.b) { try { expr=nerdamer(normalize(expr)).toString(); } catch {} return `\\int_{${toTex(a)}}^{${toTex(b)}}\\left(${toTex(expr)}\\right)\\,d${p.variable}`; }
export async function solve(input, kind='area') {
  const p={...input,g:input.g.trim()||'0',axisValue:input.axis?.includes('=')?input.axisValue:'0'};
  const a=cn(p.a),b=cn(p.b),axis=cn(p.axisValue||'0'),v=p.variable;
  if(!Number.isFinite(a)||!Number.isFinite(b)||a>=b)throw new MathIssue('boundsError');
  if(!Number.isFinite(axis))throw new MathIssue('axisError');
  for(let i=0;i<=120;i++){const x=a+(b-a)*i/120;if(!Number.isFinite(ln(p.f,x,v))||!Number.isFinite(ln(p.g,x,v)))throw new MathIssue('domainError');}
  const method=kind==='area'?'area':methodFor(p),difference=`(${p.f})-(${p.g})`,k=p.axisValue||'0';
  if(method==='shell'&&a<axis&&b>axis)throw new MathIssue('shellCrossError');
  const exprs=[difference];
  if(method==='washer'||method==='disk')exprs.push(`(${p.f})-(${k})`,`(${p.g})-(${k})`,`(${p.f})+(${p.g})-2*(${k})`);
  const points=splitPoints(exprs,p,a,b),segments=[];
  for(let i=0;i<points.length-1;i++) {
    const lo=points[i],hi=points[i+1],mid=(lo.value+hi.value)/2,f=ln(p.f,mid,v),g=ln(p.g,mid,v);
    const top=f>=g?p.f:p.g,bot=f>=g?p.g:p.f;
    let expression;
    if(method==='area')expression=`(${top})-(${bot})`;
    else if(method==='shell') expression=`2*pi*(${mid>=axis?`${v}-(${k})`:`(${k})-${v}`})*((${top})-(${bot}))`;
    else {
      const fR=`(${p.f})-(${k})`,gR=`(${p.g})-(${k})`,outer=Math.abs(f-axis)>=Math.abs(g-axis)?fR:gR;
      const inside=(f-axis)*(g-axis)<=0?'0':Math.abs(f-axis)>=Math.abs(g-axis)?gR:fR;
      expression=`pi*((${outer})^2-(${inside})^2)`;
    }
    let exact=null,anti=null;
    try { anti=nerdamer(`integrate(${normalize(expression)},${v})`).toString(); if(anti.includes('integrate('))anti=null; }catch{}
    if(lo.exact&&hi.exact&&anti)exact=await exactIntegral(expression,v,lo.exact,hi.exact);
    if(exact?.exact.includes('integrate(')||exact?.exact.includes('NaN'))exact=null;
    // Numerical quadrature is a hidden consistency check, never a displayed answer.
    if(exact) {
      const n=2400,h=(hi.value-lo.value)/n;
      let check=ln(expression,lo.value,v)+ln(expression,hi.value,v);
      for(let j=1;j<n;j++)check+=(j%2?4:2)*ln(expression,lo.value+j*h,v);
      check*=h/3;
      const actual=cn(exact.exact);
      if(!Number.isFinite(actual)||actual < -1e-10 || Math.abs(actual-check)>1e-4*Math.max(1,Math.abs(check))) {exact=null;anti=null;}
    }
    segments.push({lo:lo.value,hi:hi.value,loExact:lo.exact,hiExact:hi.exact,expression,anti,exact});
  }
  const symbol=kind==='area'?'A':'V';
  const formula=segments.every(s=>s.loExact&&s.hiExact)?`${symbol}=${segments.map(s=>integralTex(s.expression,p,s.loExact,s.hiExact)).join('+')}`:
    `${symbol}=${kind==='area'?`\\int_{${toTex(p.a)}}^{${toTex(p.b)}}\\left|${toTex(difference)}\\right|\\,d${v}`:method==='shell'?`2\\pi\\int_{${toTex(p.a)}}^{${toTex(p.b)}}|${v}-(${toTex(k)})|\\,\\left|${toTex(difference)}\\right|\\,d${v}`:`\\pi\\int_{${toTex(p.a)}}^{${toTex(p.b)}}(R(${v})^2-r(${v})^2)\\,d${v}`}`;
  let exact=null,latex=null;
  if(segments.every(s=>s.exact)) {
    try { exact=nerdamer(segments.map(s=>`(${s.exact.exact})`).join('+')).toString();latex=nerdamer(exact).toTeX().replace(/\\mathrm\{log\}/g,'\\ln').replace(/\\log/g,'\\ln'); }catch{}
  }
  const antiTex=segments.every(s=>s.anti&&s.loExact&&s.hiExact)?segments.map(s=>s.anti?`\\left[${toTex(s.anti)}\\right]_{${toTex(s.loExact||p.a)}}^{${toTex(s.hiExact||p.b)}}`:null).filter(Boolean).join('+'):'';
  return {input:p,kind,method,segments,formula,exact,latex,antiTex,closed:!!exact};
}
export const defaults={area:{f:'x',g:'x^2',a:'0',b:'1',variable:'x',axis:'x-axis',axisValue:'0'},volume:{f:'sqrt(1-x^2)',g:'0',a:'-1',b:'1',variable:'x',axis:'x-axis',axisValue:'0'}};

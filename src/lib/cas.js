import nerdamer from 'nerdamer/all.js';
import { evaluate, parse, compile } from 'mathjs';
async function AR() { return nerdamer; }
export function normalize(s) { return s.replace(/\barcsin\b/g,'asin').replace(/\barccos\b/g,'acos').replace(/\barctan\b/g,'atan').replace(/\bln\s*\(/g,'log('); }
export function cn(s) { try { const v = evaluate(normalize(String(s))); return typeof v === 'number' && Number.isFinite(v) ? v : NaN; } catch { return NaN; } }
const compiled = new Map();
export function ln(s, v, variable='x') { try { if(!compiled.has(s)){if(compiled.size>300)compiled.clear();compiled.set(s,compile(normalize(s)));} const a=compiled.get(s).evaluate({[variable]:v}); return typeof a==='number'&&Number.isFinite(a)?a:NaN; } catch { return NaN; } }
export function toTex(s) { try { return parse(normalize(s)).toTex().replace(/\\mathrm\{log\}/g,'\\ln'); } catch { return s; } }
function Nhe(t, e) {
  for (t = Math.abs(t), e = Math.abs(e); e; ) [t, e] = [e, t % e];
  return t;
}
function $v(t) {
  let e = t;
  return (
    (e = e.replace(/(-?\d+)\*sqrt\((\d+)\)\^\(-1\)/g, (r, n, i) => {
      const o = parseInt(n),
        u = parseInt(i),
        f = Nhe(Math.abs(o), u),
        c = o / f,
        l = u / f;
      return l === 1 ? `${c}*sqrt(${u})` : `(${c}/${l})*sqrt(${u})`;
    })),
    (e = e.replace(/\bsqrt\((\d+)\)\^\(-1\)/g, (r, n) => {
      const i = parseInt(n);
      return `sqrt(${i})/${i}`;
    })),
    e
  );
}
function She(t) {
  return t.replace(/\bln\s*\(/g, "log(");
}
function Dhe(t) {
  let e = t;
  return (
    (e = e.replace(/\bsqrt\(0\)/g, "(0)")),
    (e = e.replace(/\bsqrt\(1\)/g, "(1)")),
    (e = e.replace(/\bsqrt\(4\)/g, "(2)")),
    (e = e.replace(/\bsqrt\(9\)/g, "(3)")),
    (e = e.replace(/\bsqrt\(16\)/g, "(4)")),
    (e = e.replace(/\bcos\(\(1\/6\)\*pi\)/g, "(sqrt(3)/2)")),
    (e = e.replace(/\bcos\(pi\/6\)/g, "(sqrt(3)/2)")),
    (e = e.replace(/\bcos\(\(1\/4\)\*pi\)/g, "(sqrt(2)/2)")),
    (e = e.replace(/\bcos\(pi\/4\)/g, "(sqrt(2)/2)")),
    (e = e.replace(/\bcos\(\(1\/3\)\*pi\)/g, "(1/2)")),
    (e = e.replace(/\bcos\(pi\/3\)/g, "(1/2)")),
    (e = e.replace(/\bcos\(\(1\/2\)\*pi\)/g, "(0)")),
    (e = e.replace(/\bcos\(pi\/2\)/g, "(0)")),
    (e = e.replace(/\bcos\(pi\)/g, "(-1)")),
    (e = e.replace(/\bcos\(\(2\/3\)\*pi\)/g, "(-1/2)")),
    (e = e.replace(/\bcos\(2\*pi\/3\)/g, "(-1/2)")),
    (e = e.replace(/\bcos\(\(3\/4\)\*pi\)/g, "(-sqrt(2)/2)")),
    (e = e.replace(/\bcos\(3\*pi\/4\)/g, "(-sqrt(2)/2)")),
    (e = e.replace(/\bcos\(\(5\/6\)\*pi\)/g, "(-sqrt(3)/2)")),
    (e = e.replace(/\bcos\(5\*pi\/6\)/g, "(-sqrt(3)/2)")),
    (e = e.replace(/\bsin\(0\)/g, "(0)")),
    (e = e.replace(/\bsin\(\(1\/6\)\*pi\)/g, "(1/2)")),
    (e = e.replace(/\bsin\(pi\/6\)/g, "(1/2)")),
    (e = e.replace(/\bsin\(\(1\/4\)\*pi\)/g, "(sqrt(2)/2)")),
    (e = e.replace(/\bsin\(pi\/4\)/g, "(sqrt(2)/2)")),
    (e = e.replace(/\bsin\(\(1\/3\)\*pi\)/g, "(sqrt(3)/2)")),
    (e = e.replace(/\bsin\(pi\/3\)/g, "(sqrt(3)/2)")),
    (e = e.replace(/\bsin\(\(1\/2\)\*pi\)/g, "(1)")),
    (e = e.replace(/\bsin\(pi\/2\)/g, "(1)")),
    (e = e.replace(/\bsin\(pi\)/g, "(0)")),
    (e = e.replace(/\bsin\(\(2\/3\)\*pi\)/g, "(sqrt(3)/2)")),
    (e = e.replace(/\bsin\(2\*pi\/3\)/g, "(sqrt(3)/2)")),
    (e = e.replace(/\bsin\(\(3\/4\)\*pi\)/g, "(sqrt(2)/2)")),
    (e = e.replace(/\bsin\(3\*pi\/4\)/g, "(sqrt(2)/2)")),
    (e = e.replace(/\bsin\(\(5\/6\)\*pi\)/g, "(1/2)")),
    (e = e.replace(/\bsin\(5\*pi\/6\)/g, "(1/2)")),
    (e = e.replace(/\bsec\(0\)/g, "(1)")),
    (e = e.replace(/\bsec\(\(1\/4\)\*pi\)/g, "(sqrt(2))")),
    (e = e.replace(/\bsec\(pi\/4\)/g, "(sqrt(2))")),
    (e = e.replace(/\bsec\(\(1\/3\)\*pi\)/g, "(2)")),
    (e = e.replace(/\bsec\(pi\/3\)/g, "(2)")),
    (e = e.replace(/\bsec\(\(1\/6\)\*pi\)/g, "(2*sqrt(3)/3)")),
    (e = e.replace(/\bsec\(pi\/6\)/g, "(2*sqrt(3)/3)")),
    (e = e.replace(/\bcsc\(\(1\/2\)\*pi\)/g, "(1)")),
    (e = e.replace(/\bcsc\(pi\/2\)/g, "(1)")),
    (e = e.replace(/\bcsc\(\(1\/6\)\*pi\)/g, "(2)")),
    (e = e.replace(/\bcsc\(pi\/6\)/g, "(2)")),
    (e = e.replace(/\basin\(0\)/g, "(0)")),
    (e = e.replace(/\basin\(1\)/g, "(pi/2)")),
    (e = e.replace(/\basin\(-1\)/g, "(-pi/2)")),
    (e = e.replace(/\basin\(1\/2\)/g, "(pi/6)")),
    (e = e.replace(/\basin\(-1\/2\)/g, "(-pi/6)")),
    (e = e.replace(/\basin\(sqrt\(2\)\/2\)/g, "(pi/4)")),
    (e = e.replace(/\basin\(sqrt\(3\)\/2\)/g, "(pi/3)")),
    (e = e.replace(/\bacos\(0\)/g, "(pi/2)")),
    (e = e.replace(/\bacos\(1\)/g, "(0)")),
    (e = e.replace(/\bacos\(-1\)/g, "(pi)")),
    (e = e.replace(/\bacos\(1\/2\)/g, "(pi/3)")),
    (e = e.replace(/\bacos\(-1\/2\)/g, "(2*pi/3)")),
    (e = e.replace(/\bacos\(sqrt\(2\)\/2\)/g, "(pi/4)")),
    (e = e.replace(/\bacos\(sqrt\(3\)\/2\)/g, "(pi/6)")),
    (e = e.replace(/\batan\(0\)/g, "(0)")),
    (e = e.replace(/\batan\(1\)/g, "(pi/4)")),
    (e = e.replace(/\batan\(-1\)/g, "(-pi/4)")),
    (e = e.replace(/\batan\(sqrt\(3\)\)/g, "(pi/3)")),
    (e = e.replace(/\batan\(-sqrt\(3\)\)/g, "(-pi/3)")),
    (e = e.replace(/\batan\(1\/sqrt\(3\)\)/g, "(pi/6)")),
    (e = e.replace(/\batan\(sqrt\(3\)\/3\)/g, "(pi/6)")),
    (e = e.replace(/\blog\(1\)/g, "(0)")),
    (e = e.replace(/\blog\(e\)/g, "(1)")),
    (e = e.replace(/\blog\(sec\(0\)\)/g, "(0)")),
    (e = e.replace(/\blog\(sqrt\((\d+)\)\)/g, (r, n) => `((1/2)*log(${n}))`)),
    e
  );
}
function Ehe(t) {
  return /\blog\([2-9]\b/.test(t) ||
    /\blog\(\d{2,}/.test(t) ||
    /\bsqrt\([2-9]\b/.test(t) ||
    /\bsqrt\(\d{2,}/.test(t)
    ? !0
    : [
        /\blog\(/.test(t),
        /\bpi\b/.test(t),
        /\be\b|\be\^|e\^/.test(t),
        /\b(asin|acos|atan)\(/.test(t),
        /\bsqrt\(/.test(t),
      ].filter(Boolean).length > 1;
}
async function xm(t, e, r, n) {
  try {
    const i = await AR();
    if (!i) return null;
    const o = She(t),
      u = i(`integrate(${o}, ${e})`).toString(),
      f = i(`(${u})`).sub(e, n).toString(),
      c = i(`(${u})`).sub(e, r).toString(),
      l = i(`(${f}) - (${c})`).toString(),
      d = Dhe(l);
    let m;
    Ehe(d) ? (m = i(d).toString()) : (m = i(d).simplify().toString());
    const h = $v(m),
      y = i(h)
        .toTeX()
        .replace(/\\mathrm\{log\}/g, "\\ln")
        .replace(/\\log/g, "\\ln");
    return { exact: h, latex: y };
  } catch {
    return null;
  }
}

export { xm as exactIntegral, Dhe as specialValues, $v as rationalize, nerdamer };

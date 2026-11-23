import {areaPresets,volumePresets} from './presets-original.js';
const copy={
 a1:[['Line & parabola','直線與拋物線'],['Start with the simplest region between two curves.','從最簡單的兩曲線間區域開始。'],['The curves meet at x=0 and x=1.','兩曲線於 x=0 與 x=1 相交。']],
 a2:[['Sine & cosine','正弦與餘弦'],['Compare two trigonometric curves over a full bounded lobe.','比較兩條三角函數曲線間的一個完整有界區域。'],['Use the exact bounds π/4 and 5π/4.','使用精確上下界 π/4 與 5π/4。']],
 a3:[['Cubic & line','三次曲線與直線'],['A symmetric region where the curves switch order.','一個對稱且曲線位置互換的區域。'],['Split at x=0; signed areas would cancel.','須在 x=0 分段，否則有向面積會互相抵消。']],
 a4:[['Parabolic arch','拋物線弓形'],['Find the region between a downward parabola and the axis.','求開口向下的拋物線與坐標軸之間的面積。'],['The interval ends at the two roots.','區間兩端是拋物線的零點。']],
 a5:[['Exponential & tangent','指數函數與切線'],['Compare an exponential with its tangent at the origin.','比較指數函數與它在原點處的切線。'],['eˣ lies above x+1 for x>0.','當 x>0 時，eˣ 位於 x+1 上方。']],
 a6:[['Two parabolas','兩條拋物線'],['An enclosed region between opposing parabolas.','求兩條拋物線所圍成的區域面積。'],['Subtract x² from 2x−x².','用 2x−x² 減去 x²。']],
 a7:[['One sine arch','一個正弦弓形'],['Integrate a positive sine arch from 0 to π.','對 0 至 π 之間的正弦弓形積分。'],['Its exact area is 2.','精確面積為 2。']],
 a8:[['Logarithm & line','自然對數與直線'],['A region with an exact exponential bound.','探索使用指數常數作上界的區域。'],['Keep the upper bound e in symbolic form.','上界 e 應保留為符號形式。']],
 a9:[['Inverse tangent','反正切函數'],['An inverse trigonometric integral with a logarithmic term.','含自然對數項的反三角函數積分。'],['Integration by parts gives π/4−ln(2)/2.','分部積分得到 π/4−ln(2)/2。']],
 a10:[['Inverse sine','反正弦函數'],['Integrate arcsin over its unit interval.','在單位區間積分反正弦函數。'],['The endpoint value is π/2; retain exact constants.','端點函數值為 π/2，應保留精確常數。']],
 a11:[['Exponential × sine','指數乘以正弦'],['Combine exponential growth with a trigonometric factor.','結合指數增長與三角函數。'],['Repeated integration by parts resolves the product.','重複使用分部積分可求出此乘積的原函數。']],
 a12:[['Inverse tangent + exponential','反正切加上指數'],['A mixed exact expression involving π, e and ln.','答案同時包含 π、e 與自然對數。'],['Use linearity to integrate both terms separately.','利用線性性質，將兩項分開積分。']],
 v1:[['A sphere from semicircles','半圓旋轉形成球體'],['Revolve a unit semicircle around the x-axis.','將單位半圓繞 x 軸旋轉。'],['Disk radii satisfy R²=1−x².','圓盤半徑滿足 R²=1−x²。']],
 v2:[['A cone from a line','直線旋轉形成圓錐'],['A sloping line generates a cone of height 2.','將斜直線旋轉，形成高為 2 的圓錐。'],['The radius changes linearly with position.','半徑隨位置線性變化。']],
 v3:[['Parabola revolution','拋物線旋轉體'],['Revolve y=x² about the x-axis over [0,2].','將 y=x² 在 [0,2] 內繞 x 軸旋轉。'],['Squaring the radius gives x⁴, not x².','半徑平方是 x⁴，而非 x²。']],
 v4:[['Washers between curves','兩曲線間的墊圈'],['Revolve the line–parabola region about the x-axis.','將直線與拋物線間的區域繞 x 軸旋轉。'],['Outer radius x; inner radius x² on [0,1].','在 [0,1]，外半徑為 x，內半徑為 x²。']],
 v5:[['Parabolic cylindrical shells','拋物線圓柱殼'],['Revolve the region under x² around the y-axis.','將 x² 下方區域繞 y 軸旋轉。'],['Shell radius is x and shell height is x².','薄殼半徑是 x，高度是 x²。']],
 v6:[['Hollow cylinder','空心圓柱'],['Constant radii make a simple washer stack.','固定內外半徑形成簡單的墊圈堆疊。'],['Subtract the inner circular area from the outer one.','將外圓面積減去內圓面積。']],
 v7:[['Sine revolution','正弦旋轉體'],['Rotate one positive sine arch about the x-axis.','將一個正弦弓形繞 x 軸旋轉。'],['Use the half-angle identity for sin²(x).','對 sin²(x) 使用半角公式。']],
 v8:[['Linear cylindrical shells','直線圓柱殼'],['Use shells to revolve the region under y=2x.','以圓柱殼法旋轉 y=2x 下方區域。'],['Multiply circumference 2πx by height 2x.','將周長 2πx 乘以高度 2x。']],
 v9:[['Inverse-sine revolution','反正弦旋轉體'],['A curved solid with an inverse trigonometric radius.','探索半徑由反三角函數決定的立體。'],['The exact result contains both π and π².','精確結果同時包含 π 與 π²。']],
 v10:[['Exponential revolution','指數旋轉體'],['An exponentially growing radius creates a flaring solid.','指數增長的半徑形成逐漸擴張的立體。'],['The squared radius is e²ˣ.','半徑平方為 e²ˣ。']],
};
export const presets=[...areaPresets.map(p=>({...p,kind:'area'})),...volumePresets.map(p=>({...p,kind:'volume'}))].map(p=>({...p,copy:copy[p.id],variable:p.wrt||'x'}));
export function presetInput(p){return {f:p.f,g:p.g,a:p.a,b:p.b,variable:p.variable,axis:p.axis||'x-axis',axisValue:p.axisValue||'0'};}

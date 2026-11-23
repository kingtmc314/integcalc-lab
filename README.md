# IntegCalc Lab — 教學版 3.0

React + Vite 的雙語積分教學網站。正式網站位於 https://kingtmc314.github.io/integcalc-lab/ 。

## 開發與驗證

本資料夾是完整、可獨立啟動的網站原始碼，不需要 Expo 手機版專案。

```bash
npm ci
npm run dev
npm test
npm run build
```

`dist/` 是 GitHub Pages 靜態部署檔案；Vite 使用相對路徑，導覽採用 hash 路由，支援 `/integcalc-lab/` 子路徑。

桌面與手機瀏覽器自動檢查需有 Chromium：

```bash
node scripts/browser-check.mjs
# 驗證其他服務或正式網站：
TEST_URL=https://kingtmc314.github.io/integcalc-lab node scripts/browser-check.mjs
```

腳本預設 Chromium 位於 `/usr/bin/chromium`；其他環境可自行調整該路徑。

## 功能

網站提供兩曲線面積、旋轉體體積、x/y 積分、四種旋轉軸、22 個雙語例題、原有公式參考、LaTeX 顯示與複製、互動平面圖及帶 X/Y/Z 標籤的 WebGL 旋轉體。

推導動畫共六個階段：確認區域、取出切片、切片加總、取極限建立積分、求原函數、代入上下界。面積、圓盤、墊圈與圓柱殼都提供同步幾何、公式與繁中／英文說明；計算器亦能以實際輸入產生對應動畫。支援播放、暫停、重播、逐步切換、進度拖曳及 0.25×、0.5×、0.75×、1×、2×。

## 主要來源

`src/lib/cas.js` 保存從既有部署恢復的符號積分與特殊值規則，並修正函數特殊值替換時未加括號的問題，例如 `asin(1)^2` 必須轉成 `(pi/2)^2`。`src/lib/solver.js` 負責曲線排序、精確交點確認、分段積分和半徑判斷。數值積分僅用作內部一致性檢查，從不當作精確答案顯示。

`src/components/Derivation.jsx` 實作推導播放器；`Graph.jsx` 提供曲線與矩形切片；`Solid.jsx` 提供 Three.js 旋轉體。`src/i18n.jsx`、`src/lib/presets.js` 和 `src/lib/formulas.js` 分別管理介面、例題及公式文字的雙語内容。切換語言後，已產生的步驟也會即時更新。

## 誠實處理限制

計算器要求有限實數上下界，且曲線在區間內有定義；公式參考中的瑕積分並不表示計算器可以處理所有瑕積分。無法取得可確認的閉式或精確分段端點時，保留未求值定積分，明確提示，而不顯示冒充精確的小數。

圓柱殼區間若跨越旋轉軸，可能重複計算重疊殼層，網站會要求分開區域或改用垂直切片。3D 需要瀏覽器具備可用 WebGL；若不可用，顯示雙語提示，平面圖與符號推導仍可使用。

## 本次驗證

33 個數學回歸測試通過，包括全部 22 題、反三角平方、軸偏移、半徑順序、穿軸墊圈、精確根及混合函數。22 項 Chromium 桌面／390px 手機布局與操作檢查通過；這是瀏覽器模擬手機驗證，並非實體 iPhone 硬體測試。

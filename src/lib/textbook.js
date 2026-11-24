import { formulaSections } from './formulas-original.js';
import { methodFor } from './solver.js';
import { presets, presetInput } from './presets.js';

// Explicit theorem IDs are shared by the overview, reference and derivation.
// Ordinary rules, identities and examples are labelled as formulas, not theorems.
const theorems = {
  'FTC Part 1': {
    kind: 'theorem', number: '1.1',
    condition: ['The integrand is continuous on the closed interval; the derivative statement applies in its interior.', '被積函數在閉區間上連續；導數結論適用於區間內部。'],
    conditionTex: 'f\\in C([a,b]),\\quad a<x<b',
    contextTex: [
      'a:\\ \\text{fixed lower endpoint},\\quad x:\\ \\text{variable upper endpoint}',
      'a:\\ \\text{固定下端點},\\quad x:\\ \\text{變動上端點}',
    ],
  },
  'FTC Part 2': {
    kind: 'theorem', number: '1.2',
    condition: ['The integrand is continuous on the closed interval and F is an antiderivative.', '被積函數在閉區間上連續，且 F 為原函數。'],
    conditionTex: 'f\\in C([a,b]),\\quad a<b,\\quad F^{\\prime}=f',
    contextTex: [
      'a:\\ \\text{lower endpoint},\\quad b:\\ \\text{upper endpoint}',
      'a:\\ \\text{下端點},\\quad b:\\ \\text{上端點}',
    ],
  },
  'Mean Value Theorem': {
    kind: 'theorem', number: '1.3',
    condition: ['A continuous function on a non-degenerate closed interval attains its integral average at an interior point.', '連續函數在非零長度閉區間上的積分平均值，可於區間內某一點取得。'],
    conditionTex: 'f\\in C([a,b]),\\quad a<b',
    contextTex: [
      'c\\in(a,b):\\ \\text{a point attaining the average value}',
      'c\\in(a,b):\\ \\text{取得平均值的某一點}',
    ],
  },
};

export const textbookSections = formulaSections.map((section, si) => ({
  ...section,
  groups: section.groups.map((group, gi) => ({
    ...group,
    rows: group.rows.map((row, ri) => ({
      ...row,
      reference: section.id === 'properties' && theorems[row.name]
        ? theorems[row.name]
        : { kind: 'formula', number: `${si + 1}.${gi + 1}.${ri + 1}` },
    })),
  })),
}));

function techniqueKeys(preset) {
  // Tags describe the published teaching hint, not a guess about the CAS algorithm.
  const hint = (preset.copy?.[2]?.[0] || '').toLowerCase();
  if (hint.includes('repeated integration by parts')) return ['repeatedByParts'];
  if (hint.includes('integration by parts')) return ['integrationByParts'];
  if (hint.includes('half-angle')) return ['halfAngle'];
  if (hint.includes('linearity')) return ['linearity'];
  if (hint.startsWith('split at')) return ['splitIntervals'];
  return [];
}

const methods = new Map(presets.map(preset => [preset.id, {
  method: preset.kind === 'area' ? 'area' : methodFor(presetInput(preset)),
  techniques: techniqueKeys(preset),
}]));

export function exampleMethods(preset) {
  return methods.get(preset.id) || {
    method: preset.kind === 'area' ? 'area' : methodFor(presetInput(preset)),
    techniques: techniqueKeys(preset),
  };
}

export function exampleTagKeys(preset) {
  const { method, techniques } = exampleMethods(preset);
  return [method === 'area' ? 'areaMethod' : method, ...techniques];
}

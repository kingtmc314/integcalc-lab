import test from 'node:test';
import assert from 'node:assert/strict';
import { textbookSections, exampleMethods, exampleTagKeys } from '../src/lib/textbook.js';
import { presets, presetInput } from '../src/lib/presets.js';
import { methodFor } from '../src/lib/solver.js';

const theoremNumbers = new Map([
  ['FTC Part 1', '1.1'],
  ['FTC Part 2', '1.2'],
  ['Mean Value Theorem', '1.3'],
]);

function rows(sections = textbookSections) {
  return sections.flatMap(section => section.groups.flatMap(group =>
    group.rows.map(row => ({ section: section.id, group: group.heading, row }))));
}

function theorem(name) {
  const matches = rows().filter(({ section, row }) => section === 'properties' && row.name === name);
  assert.equal(matches.length, 1, `${name} must appear exactly once`);
  return matches[0].row;
}

function referenceSnapshot(sections = textbookSections) {
  return rows(sections).map(({ section, group, row }) =>
    [section, group, row.name, row.reference.kind, row.reference.number]);
}

function assertBilingual(pair, label) {
  assert.ok(Array.isArray(pair), `${label} must be a language pair`);
  assert.equal(pair.length, 2, `${label} must contain English and Traditional Chinese`);
  for (const value of pair) assert.equal(typeof value, 'string', label);
  assert.match(pair[0], /[A-Za-z]{2,}/, `${label}: English text`);
  assert.match(pair[1], /\p{Script=Han}/u, `${label}: Chinese text`);
  assert.notEqual(pair[0], pair[1], `${label}: languages must not be duplicated`);
}

test('only FTC1, FTC2, and integral MVT are labelled theorems with stable IDs', () => {
  const labelled = rows().filter(({ row }) => row.reference.kind === 'theorem');
  assert.deepEqual(labelled.map(({ section, row }) => [section, row.name, row.reference.number]), [
    ['properties', 'FTC Part 1', '1.1'],
    ['properties', 'FTC Part 2', '1.2'],
    ['properties', 'Mean Value Theorem', '1.3'],
  ]);
  for (const { section, row } of rows()) {
    const expected = section === 'properties' && theoremNumbers.get(row.name);
    assert.equal(row.reference.kind, expected ? 'theorem' : 'formula', row.name);
    if (expected) assert.equal(row.reference.number, expected, row.name);
  }
});

test('every formula reference is unique across all reference tabs', () => {
  assert.deepEqual(textbookSections.map(section => section.id),
    ['properties', 'techniques', 'elementary', 'popular']);
  const seen = new Set();
  for (const { section, row } of rows()) {
    const { kind, number } = row.reference;
    assert.match(number, kind === 'theorem' ? /^1\.[123]$/ : /^\d+\.\d+\.\d+$/,
      `${section}: ${row.name}`);
    assert.ok(!seen.has(number), `duplicate reference ${number} in ${section}: ${row.name}`);
    seen.add(number);
  }
});

test('reference numbering is deterministic on repeated access and module evaluation', async () => {
  const expected = referenceSnapshot();
  for (let pass = 0; pass < 3; pass++) {
    // Access examples and tabs in reverse order, without modifying their exported data.
    for (const preset of [...presets].reverse()) {
      exampleMethods(preset);
      exampleTagKeys(preset);
    }
    for (const section of [...textbookSections].reverse()) rows([section]);
    assert.deepEqual(referenceSnapshot(), expected);
    const fresh = await import(`../src/lib/textbook.js?textbook-regression=${pass}`);
    assert.deepEqual(referenceSnapshot(fresh.textbookSections), expected);
  }
});

test('the catalogue contains all 22 distinct presets', () => {
  assert.equal(presets.length, 22);
  assert.equal(new Set(presets.map(preset => preset.id)).size, 22);
  assert.equal(presets.filter(preset => preset.kind === 'area').length, 12);
  assert.equal(presets.filter(preset => preset.kind === 'volume').length, 10);
});

for (const preset of presets) {
  test(`${preset.id}: primary teaching tag agrees with the area/solver method`, () => {
    // Primary tags come from geometry, not a hand-maintained per-preset method table.
    const expected = preset.kind === 'area' ? 'area' : methodFor(presetInput(preset));
    const expectedTag = expected === 'area' ? 'areaMethod' : expected;
    assert.equal(exampleMethods(preset).method, expected);
    assert.equal(exampleTagKeys(preset)[0], expectedTag);
    const baseline = exampleTagKeys(preset);
    for (let pass = 0; pass < 3; pass++) {
      assert.deepEqual(exampleTagKeys(preset), baseline);
      assert.deepEqual(exampleTagKeys({ ...preset }), baseline);
    }
  });
}

test('secondary tags reflect only the documented canonical teaching hints', () => {
  // These are pedagogical hints, not assertions about which algorithm the CAS executes.
  const documented = new Map([
    ['a3', ['splitIntervals', /^Split at x=0/i]],
    ['a9', ['integrationByParts', /^Integration by parts/i]],
    ['a11', ['repeatedByParts', /^Repeated integration by parts/i]],
    ['a12', ['linearity', /linearity/i]],
    ['v7', ['halfAngle', /half-angle/i]],
  ]);
  for (const preset of presets) {
    const expected = documented.get(preset.id);
    if (expected) assert.match(preset.copy[2][0], expected[1], `${preset.id}: canonical hint`);
    const techniques = expected ? [expected[0]] : [];
    assert.deepEqual(exampleMethods(preset).techniques, techniques, preset.id);
    assert.deepEqual(exampleTagKeys(preset).slice(1), techniques, preset.id);
  }
});

for (const name of theoremNumbers.keys()) {
  test(`${name}: conditions and mathematical context are English/Traditional Chinese`, () => {
    const { reference } = theorem(name);
    assertBilingual(reference.condition, `${name} condition`);
    assertBilingual(reference.contextTex, `${name} context`);
    assert.match(reference.condition[0], /continuous.*closed interval/i);
    assert.match(reference.condition[1], /連續/);
    assert.match(reference.condition[1], /閉區間/);
    assert.match(reference.conditionTex, /f\\in C\(\[a,b\]\)/);
  });
}

test('FTC1 states the interior inequality and fixed/variable endpoint roles', () => {
  const { reference } = theorem('FTC Part 1');
  assert.match(reference.conditionTex, /a<x<b/);
  assert.match(reference.condition[0], /derivative.*interior/i);
  assert.match(reference.condition[1], /導數結論.*區間內部/);
  assert.match(reference.contextTex[0], /a:.*fixed lower endpoint.*x:.*variable upper endpoint/);
  assert.match(reference.contextTex[1], /a:.*固定下端點.*x:.*變動上端點/);
});

test('FTC2 assumes ordered bounds and an antiderivative', () => {
  const { reference } = theorem('FTC Part 2');
  assert.match(reference.conditionTex, /a<b/);
  assert.ok(reference.conditionTex.includes('F^{\\prime}=f'));
  assert.match(reference.condition[0], /F is an antiderivative/);
  assert.match(reference.condition[1], /F 為原函數/);
  assert.match(reference.contextTex[0], /a:.*lower endpoint.*b:.*upper endpoint/);
  assert.match(reference.contextTex[1], /a:.*下端點.*b:.*上端點/);
});

test('integral MVT requires a non-degenerate interval and an interior average-value point', () => {
  const { reference, tex } = theorem('Mean Value Theorem');
  assert.match(reference.conditionTex, /a<b/);
  assert.match(reference.condition[0], /non-degenerate.*integral average.*interior point/i);
  assert.match(reference.condition[1], /非零長度.*積分平均值.*區間內/);
  for (const context of reference.contextTex) assert.ok(context.includes('c\\in(a,b)'));
  assert.match(reference.contextTex[0], /point attaining the average value/);
  assert.match(reference.contextTex[1], /取得平均值的某一點/);
  assert.ok(tex.includes('\\exists\\, c\\in(a,b)'));
  assert.ok(tex.includes('f(c)=\\dfrac{1}{b-a}\\displaystyle\\int_a^b'));
});

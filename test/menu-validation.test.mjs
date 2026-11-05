import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMenu, loadMenus } from '../scripts/validate-menus.mjs';

test('Tüm mevcut menüler eksiksiz ve sıralı', () => { assert.ok(loadMenus().length); });
test('Eksik gün, yinelenen tarih ve boş öğün reddedilir', () => {
  for (const mutate of [m => m.days.pop(), m => m.days[1].day = 1, m => m.days[0].dinner = [], m => m.days[0].breakfast = ['okunamadı']]) {
    const menu = structuredClone(loadMenus()[0]);
    mutate(menu);
    assert.throws(() => validateMenu(menu, `${menu.year}-${String(menu.month).padStart(2, '0')}.json`));
  }
});
test('Şubat ayı ve artık yıl gün sayısı doğrulanır', () => {
  for (const [year, count] of [[2027, 28], [2028, 29]]) {
    const menu = { year, month: 2, source: 'Test', sharedBreakfast: ['Su'], sharedDinner: ['Su'], days: Array.from({length: count}, (_, i) => ({day: i + 1, breakfast: ['Yumurta'], dinner: ['Çorba']})) };
    assert.equal(validateMenu(menu, `${year}-02.json`).days.length, count);
    menu.days.push({day: count + 1, breakfast: ['Yumurta'], dinner: ['Çorba']});
    assert.throws(() => validateMenu(menu, `${year}-02.json`));
  }
});

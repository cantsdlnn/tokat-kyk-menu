import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
export function validateMenu(menu, filename) {
  const fail = message => { throw new Error(`${filename}: ${message}`); };
  if (!menu || !Number.isInteger(menu.year) || menu.year < 2020 || menu.year > 2100 || !Number.isInteger(menu.month) || menu.month < 1 || menu.month > 12) fail('Geçersiz yıl/ay');
  const expected = `${menu.year}-${String(menu.month).padStart(2, '0')}.json`;
  if (filename !== expected) fail(`Dosya adı ${expected} olmalı`);
  if (typeof menu.source !== 'string' || !menu.source.trim()) fail('Kaynak açıklaması eksik');
  const validItems = (items, name) => {
    if (!Array.isArray(items) || items.length === 0) fail(`${name} boş`);
    for (const item of items) {
      if (typeof item !== 'string' || !item.trim() || /[<>]|\bTODO\b|\?\?\?|belirsiz|okunamadı/i.test(item)) fail(`${name}: boş, HTML içeren veya doğrulanmamış yemek`);
    }
  };
  validItems(menu.sharedBreakfast, 'Ortak kahvaltı');
  validItems(menu.sharedDinner, 'Ortak akşam');
  const count = new Date(Date.UTC(menu.year, menu.month, 0)).getUTCDate();
  if (!Array.isArray(menu.days) || menu.days.length !== count) fail(`${count} günün tamamı bulunmalı`);
  menu.days.forEach((day, index) => {
    if (day.day !== index + 1) fail(`Eksik, tekrar eden veya sırasız gün: ${index + 1}`);
    validItems(day.breakfast, `${day.day}. gün kahvaltı`);
    validItems(day.dinner, `${day.day}. gün akşam`);
  });
  return menu;
}

export function loadMenus() {
  const folder = path.join(root, 'data/menus');
  const files = readdirSync(folder).filter(file => file.endsWith('.json')).sort();
  if (!files.length) throw new Error('En az bir menü dosyası gerekli');
  return files.map(file => validateMenu(JSON.parse(readFileSync(path.join(folder, file), 'utf8')), file));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const menus = loadMenus();
  console.log(`${menus.length} ay, ${menus.reduce((sum, menu) => sum + menu.days.length, 0)} gün doğrulandı.`);
}

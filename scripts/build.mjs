import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadMenus, root } from './validate-menus.mjs';

const menus = loadMenus();
const source = readFileSync(path.join(root, 'src/index.html'), 'utf8');
const marker = '/* MENU_DATA */';
if (source.split(marker).length !== 2) throw new Error('Menü veri yer tutucusu tam bir kez bulunmalı');
const html = source.replace(marker, () => JSON.stringify(menus).replaceAll('<', '\\u003c'));
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
for (const [, script] of scripts) new Function(script);
writeFileSync(path.join(root, 'dist/index.html'), html.trimEnd() + '\n');
console.log(`Yayın dosyası hazır: ${menus.length} ay.`);

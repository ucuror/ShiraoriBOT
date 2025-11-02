#!/usr/bin/env node
// Utilitas untuk mengatur global.owner di config.js tanpa edit manual
// Penggunaan:
//   node set-owner.js 62812...,62895...
//   npm run setup:owner -- 62812...,62895...
//   OWNER=62812...,62895... node set-owner.js

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const configPath = path.join(projectRoot, 'config.js');

function parseOwners(argvOwners) {
  const raw = argvOwners || process.env.OWNER || '';
  if (!raw.trim()) return [];
  return raw
    .split(/[\s,]+/)
    .map(s => s.replace(/[^0-9]/g, '')) // hanya digit
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i); // unik
}

function updateOwnerNumbers(owners) {
  const src = fs.readFileSync(configPath, 'utf8');

  // Cari baris deklarasi global.owner = [ ... ]
  const ownerRegex = /(global\.owner\s*=\s*)\[[^\]]*\]/;
  if (!ownerRegex.test(src)) {
    throw new Error('Tidak menemukan deklarasi global.owner di config.js');
  }

  const ownersQuoted = owners.map(o => `'${o}'`).join(', ');
  const replaced = src.replace(ownerRegex, `$1[${ownersQuoted}]`);
  fs.writeFileSync(configPath, replaced, 'utf8');
}

function main() {
  const argInput = process.argv.slice(2).join(',');
  const owners = parseOwners(argInput);
  if (!owners.length) {
    console.error('Masukkan minimal satu nomor owner.');
    console.error('Contoh: npm run setup:owner -- 6281234567890,628987654321');
    process.exit(1);
  }

  if (!fs.existsSync(configPath)) {
    console.error('File config.js tidak ditemukan:', configPath);
    process.exit(1);
  }

  try {
    updateOwnerNumbers(owners);
    console.log('Berhasil memperbarui global.owner di config.js =>', owners);
  } catch (e) {
    console.error('Gagal memperbarui owner:', e.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

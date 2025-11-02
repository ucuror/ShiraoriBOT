# Panduan Bot WhatsApp (ShiraoriBOT)

Dokumen ini menjelaskan cara memasang dan menjalankan bot WhatsApp berbasis Baileys pada Linux/Termux tanpa menjalankan proses panjang di sini. Anda akan menjalankannya sendiri pada lingkungan Anda.

## 1) Prasyarat
- Node.js LTS (disarankan v14+). Cek dengan: `node -v` dan `npm -v`
- FFmpeg (untuk fitur media/stiker). Cek dengan: `ffmpeg -version`
- ImageMagick (untuk beberapa fitur gambar). Cek dengan: `convert -version` atau `magick -version`

Catatan: Di Windows, tambahkan FFmpeg & ImageMagick ke PATH. Di Termux gunakan paket dari pkg/apt.

## 2) Instalasi
- Clone repo ini atau salin foldernya
- Masuk ke direktori proyek
- Pasang dependensi:
  ```bash
  npm install
  ```

## 3) Konfigurasi Nomor Owner
Anda dapat mengatur nomor owner dengan dua cara:

A. Lewat skrip (disarankan)
```bash
# Format: nomor dipisah koma/spasi, gunakan kode negara (tanpa +)
npm run setup:owner -- 6281234567890,628987654321
```
Contoh lain:
```bash
node set-owner.js 6281234567890 628987654321
# atau pakai env
OWNER=6281234567890,628987654321 node set-owner.js
```

B. Manual edit
- Buka file `config.js`
- Ubah baris:
  ```js
  global.owner  = ['6281351047727', '380942618992']
  ```
  menjadi nomor Anda, misal:
  ```js
  global.owner  = ['6281234567890']
  ```

## 4) Menjalankan Bot (Anda jalankan di mesin Anda)
- Mulai bot:
  ```bash
  npm start
  # atau
  node index.js --autoread
  ```
- Pertama kali jalan, Anda akan diminta memindai QR di terminal. Buka WhatsApp > Perangkat Tertaut > Tautkan Perangkat, lalu scan QR tersebut.
- Setelah tertaut, bot aktif di nomor yang digunakan.

Opsi argumen berguna (opsional):
- `--self` mode self
- `--restrict` aktifkan fitur admin group (gunakan bijak)
- `--big-qr` jika QR kecil tidak terbaca

Contoh:
```bash
node index.js --self --autoread
```

## 5) Kustomisasi
- Ubah nomor owner, packname stiker, dan setting lain di `config.js`
- Kustom menu/fitur di folder `plugins/` (mis: `plugins/menu.js`)

## 6) Troubleshooting
- Gagal scan QR: pastikan waktu sistem benar dan koneksi stabil
- Error FFmpeg/ImageMagick: pastikan sudah terinstal dan ada di PATH
- Diblokir/ban: gunakan fitur terbatas secukupnya (`--restrict` dapat berisiko jika spam)
- Versi Baileys lawas: proyek ini memakai `@adiwajshing/baileys@^3.5.3`. Jika WhatsApp mengubah protokol, pertimbangkan upgrade dan sesuaikan kode.

## 7) Keamanan
- Jangan commit atau membagikan file sesi/login
- Jangan menempelkan token/apikey rahasia di repo publik

## 8) Perintah Ringkas
- Pasang deps: `npm install`
- Set owner: `npm run setup:owner -- 62812xxxx`
- Jalan bot: `npm start`

Selamat mencoba! Jika butuh bantuan lebih lanjut, lihat README.md asli atau tanya kembali di sini.

# 📱 PANDUAN INSTALASI BOT WHATSAPP PRIVATE DI TERMUX

Panduan lengkap cara memasang dan menjalankan Bot WhatsApp Private di HP Android menggunakan Termux.

---

## 📋 DAFTAR ISI

1. [Persyaratan](#persyaratan)
2. [Instalasi Termux](#instalasi-termux)
3. [Instalasi Bot (Cara Otomatis)](#instalasi-bot-cara-otomatis)
4. [Instalasi Bot (Cara Manual)](#instalasi-bot-cara-manual)
5. [Konfigurasi Bot](#konfigurasi-bot)
6. [Menjalankan Bot](#menjalankan-bot)
7. [Cara Menggunakan Bot](#cara-menggunakan-bot)
8. [Troubleshooting](#troubleshooting)
9. [Tips & Trik](#tips--trik)

---

## 📦 PERSYARATAN

### Yang Anda Butuhkan:

✅ **HP Android** (minimal Android 7.0)  
✅ **Aplikasi Termux** (download dari F-Droid atau GitHub)  
✅ **WhatsApp** yang sudah terinstall  
✅ **Koneksi Internet** yang stabil  
✅ **Ruang penyimpanan** minimal 500MB  

### ⚠️ PENTING:

- **JANGAN** download Termux dari Google Play Store (versi lama dan tidak didukung)
- Download Termux dari:
  - **F-Droid**: https://f-droid.org/en/packages/com.termux/
  - **GitHub**: https://github.com/termux/termux-app/releases

---

## 🚀 INSTALASI TERMUX

### Langkah 1: Download dan Install Termux

1. Buka browser di HP Anda
2. Kunjungi: https://f-droid.org/en/packages/com.termux/
3. Download dan install aplikasi Termux
4. Buka aplikasi Termux

### Langkah 2: Update Termux

Setelah membuka Termux, jalankan perintah berikut satu per satu:

```bash
pkg update -y
```

Tunggu sampai selesai, lalu:

```bash
pkg upgrade -y
```

Jika ada pertanyaan, ketik `y` dan tekan Enter.

### Langkah 3: Berikan Izin Penyimpanan

```bash
termux-setup-storage
```

Akan muncul popup, klik **"Izinkan"** atau **"Allow"**.

---

## 🤖 INSTALASI BOT (CARA OTOMATIS)

### Cara Tercepat dan Termudah! ⚡

Jalankan perintah berikut di Termux:

```bash
pkg install -y git nodejs && git clone https://github.com/YOURUSERNAME/bot-wa-private.git && cd bot-wa-private && bash install-termux.sh
```

**Script otomatis akan:**
- ✅ Install semua dependencies yang dibutuhkan
- ✅ Setup bot secara otomatis
- ✅ Siap digunakan!

Setelah selesai, lanjut ke [Konfigurasi Bot](#konfigurasi-bot)

---

## 🔧 INSTALASI BOT (CARA MANUAL)

Jika cara otomatis tidak berhasil, ikuti langkah manual berikut:

### Langkah 1: Install Git dan Node.js

```bash
pkg install -y git nodejs
```

Tunggu sampai instalasi selesai (bisa memakan waktu 5-10 menit tergantung koneksi internet).

### Langkah 2: Download Bot

Ada 2 cara:

#### Cara A: Clone dari GitHub (Jika sudah upload ke GitHub)

```bash
git clone https://github.com/YOURUSERNAME/bot-wa-private.git
cd bot-wa-private
```

#### Cara B: Buat Folder Manual

```bash
mkdir bot-wa-private
cd bot-wa-private
```

Lalu copy semua file bot ke folder ini:
- `bot-wa-private.js`
- `config-private.js`
- `package-private.json`

### Langkah 3: Rename File Package

```bash
mv package-private.json package.json
```

### Langkah 4: Install Dependencies

```bash
npm install
```

Tunggu sampai semua package terinstall (bisa memakan waktu 5-15 menit).

---

## ⚙️ KONFIGURASI BOT

### Langkah 1: Edit File Konfigurasi

Buka file `config-private.js` dengan nano editor:

```bash
nano config-private.js
```

### Langkah 2: Ganti Nomor Owner

Cari baris ini:

```javascript
ownerNumber: ['6281234567890'],
```

Ganti `6281234567890` dengan nomor WhatsApp Anda (tanpa + dan tanpa spasi).

**Contoh:**
- Nomor WA Anda: +62 812-3456-7890
- Tulis di config: `6281234567890`

```javascript
ownerNumber: ['6281234567890'], // Ganti dengan nomor Anda
```

### Langkah 3: Ganti Nama Owner (Opsional)

```javascript
ownerName: 'Nama Anda', // Ganti dengan nama Anda
```

### Langkah 4: Ganti Nama Bot (Opsional)

```javascript
botName: 'Bot Pribadi Saya', // Ganti dengan nama bot yang Anda inginkan
```

### Langkah 5: Simpan File

- Tekan `CTRL + X`
- Tekan `Y`
- Tekan `Enter`

---

## 🎮 MENJALANKAN BOT

### Cara 1: Jalankan Bot

```bash
node bot-wa-private.js
```

atau

```bash
npm start
```

### Cara 2: Scan QR Code

Setelah menjalankan bot, akan muncul **QR Code** di layar Termux.

**Langkah Scan QR Code:**

1. Buka WhatsApp di HP Anda
2. Tap titik tiga (⋮) di pojok kanan atas
3. Pilih **"Perangkat Tertaut"** atau **"Linked Devices"**
4. Tap **"Tautkan Perangkat"** atau **"Link a Device"**
5. Scan QR Code yang muncul di Termux

### Cara 3: Bot Berhasil Terhubung

Jika berhasil, akan muncul pesan:

```
✅ Bot berhasil terhubung!
📞 Nomor Owner: 6281234567890
🤖 Mode: PRIVATE
```

**🎉 SELAMAT! Bot Anda sudah aktif!**

---

## 💬 CARA MENGGUNAKAN BOT

### Daftar Perintah (Command)

Kirim pesan ke bot dari nomor owner Anda:

| Command | Fungsi |
|---------|--------|
| `.menu` atau `.help` | Menampilkan menu bantuan |
| `.ping` | Cek kecepatan respon bot |
| `.runtime` | Cek berapa lama bot berjalan |
| `.info` | Informasi tentang bot |
| `.owner` | Info kontak owner |

### Contoh Penggunaan:

1. Buka chat dengan nomor bot (nomor yang di-scan QR)
2. Ketik: `.menu`
3. Bot akan membalas dengan daftar perintah

### ⚠️ PENTING:

- Bot **HANYA** merespon pesan dari nomor owner yang sudah diatur di `config-private.js`
- Pesan dari nomor lain akan diabaikan
- Ini adalah mode **PRIVATE** untuk keamanan

---

## 🔧 TROUBLESHOOTING

### ❌ Problem: QR Code tidak muncul

**Solusi:**
```bash
rm -rf auth_info
node bot-wa-private.js
```

### ❌ Problem: Bot tidak merespon

**Solusi:**
1. Pastikan nomor owner di `config-private.js` sudah benar
2. Nomor harus format: `628xxx` (tanpa + dan spasi)
3. Restart bot:
   ```bash
   # Tekan CTRL+C untuk stop
   node bot-wa-private.js
   ```

### ❌ Problem: Error saat npm install

**Solusi:**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### ❌ Problem: Bot terputus terus

**Solusi:**
1. Pastikan koneksi internet stabil
2. Jangan minimize Termux terlalu lama
3. Gunakan Termux:Boot untuk auto-start (advanced)

### ❌ Problem: Command tidak dikenali

**Solusi:**
- Pastikan menggunakan prefix yang benar (default: `.`)
- Contoh: `.menu` bukan `menu`
- Cek di `config-private.js` prefix yang digunakan

---

## 💡 TIPS & TRIK

### 1. Agar Bot Tetap Berjalan

Bot akan berhenti jika Termux ditutup. Untuk menjaga bot tetap berjalan:

**Cara A: Gunakan Screen (Recommended)**

Install screen:
```bash
pkg install screen
```

Jalankan bot dengan screen:
```bash
screen -S botwa
node bot-wa-private.js
```

Untuk keluar tanpa stop bot:
- Tekan `CTRL + A`, lalu tekan `D`

Untuk kembali ke session:
```bash
screen -r botwa
```

**Cara B: Gunakan PM2**

Install PM2:
```bash
npm install -g pm2
```

Jalankan bot dengan PM2:
```bash
pm2 start bot-wa-private.js --name "bot-wa"
pm2 save
```

Lihat status:
```bash
pm2 status
```

Stop bot:
```bash
pm2 stop bot-wa
```

### 2. Auto Start Bot Saat HP Restart

Install Termux:Boot dari F-Droid, lalu:

```bash
mkdir -p ~/.termux/boot
nano ~/.termux/boot/start-bot.sh
```

Isi dengan:
```bash
#!/data/data/com.termux/files/usr/bin/bash
cd ~/bot-wa-private
node bot-wa-private.js
```

Simpan dan beri izin:
```bash
chmod +x ~/.termux/boot/start-bot.sh
```

### 3. Update Bot

Jika ada update bot:

```bash
cd bot-wa-private
git pull
npm install
node bot-wa-private.js
```

### 4. Backup Data Bot

Backup folder `auth_info` untuk menyimpan session:

```bash
cp -r auth_info auth_info_backup
```

### 5. Multiple Owner

Edit `config-private.js`:

```javascript
ownerNumber: ['6281234567890', '6289876543210'],
```

### 6. Ganti Prefix

Edit `config-private.js`:

```javascript
prefix: '!', // Ganti dari . ke !
```

Sekarang command jadi: `!menu`, `!ping`, dll.

### 7. Matikan Auto Read

Edit `config-private.js`:

```javascript
autoRead: false, // Ganti dari true ke false
```

### 8. Cek Log Error

Jika bot error, cek log:

```bash
node bot-wa-private.js 2>&1 | tee bot.log
```

Log akan tersimpan di `bot.log`.

---

## 📞 BANTUAN & DUKUNGAN

### Jika Masih Bermasalah:

1. **Baca ulang panduan** dari awal
2. **Cek error message** yang muncul di Termux
3. **Pastikan semua langkah** sudah diikuti dengan benar
4. **Cek koneksi internet** Anda

### Informasi Tambahan:

- **Node.js Version**: Minimal v16.0.0
- **Termux Version**: Terbaru dari F-Droid
- **WhatsApp**: Versi terbaru

---

## 📝 CATATAN PENTING

⚠️ **PERHATIAN:**

1. **Jangan share QR Code** ke orang lain
2. **Jangan share file `auth_info`** ke orang lain
3. **Backup session** secara berkala
4. **Gunakan bot dengan bijak**
5. **Jangan spam** atau melanggar TOS WhatsApp
6. **Bot ini untuk penggunaan pribadi**, bukan untuk spam atau hal ilegal

---

## 🎯 KESIMPULAN

Sekarang Anda sudah punya Bot WhatsApp Private yang berjalan di HP Anda!

**Ringkasan Singkat:**

1. ✅ Install Termux dari F-Droid
2. ✅ Update Termux: `pkg update && pkg upgrade`
3. ✅ Install Git & Node.js: `pkg install git nodejs`
4. ✅ Download bot
5. ✅ Install dependencies: `npm install`
6. ✅ Edit config: `nano config-private.js`
7. ✅ Jalankan bot: `node bot-wa-private.js`
8. ✅ Scan QR Code
9. ✅ Bot siap digunakan!

---

## 📜 LISENSI

MIT License - Bebas digunakan untuk keperluan pribadi.

---

## 🙏 TERIMA KASIH

Terima kasih telah menggunakan Bot WhatsApp Private!

Jika ada pertanyaan atau masalah, jangan ragu untuk bertanya.

**Selamat menggunakan bot! 🎉**

---

**Dibuat dengan ❤️ untuk pengguna Termux**

*Last Updated: 2025*

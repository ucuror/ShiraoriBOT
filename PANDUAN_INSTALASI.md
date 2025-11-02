# 🤖 Panduan Instalasi ShiraoriBOT - Bot WhatsApp

## 📋 Daftar Isi
- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Bot](#menjalankan-bot)
- [Fitur Utama](#fitur-utama)
- [Troubleshooting](#troubleshooting)

## 🔧 Persyaratan

### Persyaratan Sistem
- **Node.js** versi 16 atau lebih tinggi
- **npm** atau **yarn**
- **Git**
- **FFmpeg** (untuk pemrosesan media)
- **ImageMagick** (untuk editing gambar)

### Untuk Windows:
```bash
# Install Node.js dari https://nodejs.org
# Install Git dari https://git-scm.com
# Install FFmpeg: https://ffmpeg.org/download.html
# Install ImageMagick: https://imagemagick.org/script/download.php#windows
```

### Untuk Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install nodejs npm git ffmpeg imagemagick
```

### Untuk Android (Termux):
```bash
pkg install nodejs npm git ffmpeg imagemagick
```

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
Bot akan membuat file database otomatis saat pertama kali dijalankan.

## ⚙️ Konfigurasi

### 1. Edit File config.js
```javascript
// Buka file config.js dan sesuaikan pengaturan
global.owner = ['62812345678'] // Nomor owner (ganti dengan nomor Anda)
global.mods = ['62812345678']  // Nomor moderator
global.prems = []              // Nomor premium user

// API Keys (optional untuk fitur tertentu)
global.APIs = {
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz',
  // Tambahkan API key lainnya jika diperlukan
}

global.APIKeys = {
  'https://api.xteam.xyz': 'YOUR_API_KEY',
  // Masukkan API key Anda di sini
}
```

### 2. Pengaturan Bot
```javascript
// Nama dan informasi bot
global.namebot = 'ShiraoriBOT'
global.nameowner = 'Nama Owner'
global.packname = 'Sticker by'
global.author = 'ShiraoriBOT'

// Pengaturan lainnya
global.multiplier = 69 // Multiplier XP
global.rpg = true      // Aktifkan mode RPG
global.wait = '_Tunggu sedang diproses..._'
```

## 🚀 Menjalankan Bot

### Menjalankan Bot
```bash
npm start
```

### Atau menggunakan PM2 (untuk produksi)
```bash
# Install PM2
npm install -g pm2

# Jalankan bot dengan PM2
pm2 start main.js --name "shiraoribot"

# Monitor bot
pm2 monit

# Restart bot
pm2 restart shiraoribot

# Stop bot
pm2 stop shiraoribot
```

### Pertama Kali Menjalankan
1. Jalankan bot dengan `npm start`
2. Bot akan menampilkan QR code di terminal
3. Scan QR code dengan WhatsApp Web di ponsel Anda
4. Tunggu hingga bot terhubung
5. Bot siap digunakan!

## 🌟 Fitur Utama

### 💬 Command Dasar
- `.menu` - Menampilkan daftar command
- `.owner` - Info owner
- `.speed` - Cek kecepatan bot
- `.ping` - Test koneksi

### 🎮 Game & Hiburan
- `.tictactoe` - Main TicTacToe
- `.tebakgambar` - Tebak gambar
- `.suit` - Suit/gunting batu kertas
- `.casino` - Main casino

### 🔧 Tools & Utilities
- `.stiker` - Buat stiker dari gambar/video
- `.toimg` - Stiker ke gambar
- `.translate` - Translate teks
- `.weather` - Info cuaca

### 📱 Downloader
- `.ytmp3` - Download audio YouTube
- `.ytmp4` - Download video YouTube
- `.tiktok` - Download video TikTok
- `.instagram` - Download dari Instagram

### 👥 Group Management
- `.kick` - Kick member
- `.add` - Add member
- `.promote` - Promote ke admin
- `.demote` - Demote dari admin
- `.group` - Setting grup

### 🎨 AI & Sticker
- `.chatgpt` - Chat dengan AI
- `.attp` - Animated text to picture
- `.sticker` - Buat stiker

## 🛠️ Troubleshooting

### Bot Tidak Connect
```bash
# Hapus folder session dan coba lagi
rm -rf session_database.json
npm start
```

### Error FFmpeg
```bash
# Windows: Download FFmpeg dan add ke PATH
# Linux: sudo apt install ffmpeg
# Termux: pkg install ffmpeg
```

### Error ImageMagick
```bash
# Windows: Install ImageMagick
# Linux: sudo apt install imagemagick
# Termux: pkg install imagemagick
```

### Bot Lemot/Tidak Responsif
```bash
# Restart bot
pm2 restart shiraoribot

# Atau jika tidak pakai PM2
# Ctrl+C lalu npm start lagi
```

### Database Corrupt
```bash
# Backup database lama
mv session_database.json session_database.json.backup

# Jalankan bot (akan buat database baru)
npm start
```

## 📱 Deploy ke Heroku

### 1. Persiapan
```bash
# Install Heroku CLI
# Login ke Heroku
heroku login
```

### 2. Deploy
```bash
# Buat aplikasi Heroku
heroku create nama-bot-wa-anda

# Set buildpacks
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
heroku buildpacks:add --index 3 https://github.com/DuckyTeam/heroku-buildpack-imagemagick

# Deploy
git push heroku main

# Lihat logs
heroku logs --tail
```

## 🔐 Keamanan

- Jangan share QR code atau file session
- Ganti nomor owner di config.js
- Gunakan API key pribadi
- Backup database secara berkala

## 📞 Support

Jika mengalami kendala:
1. Cek file log untuk error
2. Pastikan semua dependencies terinstall
3. Cek koneksi internet
4. Restart bot

## 🎯 Tips Penggunaan

1. **Untuk Owner**: Gunakan command dengan prefix `.` (titik)
2. **Auto Backup**: Bot otomatis backup database setiap 10 menit
3. **Plugin Custom**: Tambah plugin di folder `plugins/`
4. **Monitor**: Gunakan PM2 untuk monitoring bot
5. **Update**: `git pull` untuk update bot

---

**Selamat menggunakan ShiraoriBOT! 🎉**

> Bot ini memiliki 400+ command dan fitur lengkap untuk grup WhatsApp Anda.
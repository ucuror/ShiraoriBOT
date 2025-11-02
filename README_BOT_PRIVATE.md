# 🤖 BOT WHATSAPP PRIVATE

Bot WhatsApp sederhana untuk penggunaan pribadi yang hanya merespon owner. Cocok untuk dijalankan di HP menggunakan Termux.

---

## ✨ FITUR

- ✅ **Mode Private** - Hanya merespon nomor owner
- ✅ **Auto Read** - Otomatis membaca pesan
- ✅ **Ringan & Cepat** - Tidak banyak dependencies
- ✅ **Mudah Dikonfigurasi** - Cukup edit 1 file
- ✅ **Multi-Device** - Menggunakan Baileys terbaru
- ✅ **Command Dasar** - Menu, ping, runtime, info

---

## 📋 PERSYARATAN

- HP Android (minimal Android 7.0)
- Aplikasi Termux (dari F-Droid)
- WhatsApp
- Koneksi Internet
- Ruang penyimpanan minimal 500MB

---

## 🚀 INSTALASI CEPAT

### Untuk Termux (HP Android):

```bash
# 1. Install Git dan Node.js
pkg install -y git nodejs

# 2. Clone repository (jika sudah di GitHub)
git clone https://github.com/YOURUSERNAME/bot-wa-private.git
cd bot-wa-private

# 3. Jalankan script instalasi otomatis
bash install-termux.sh
```

### Atau Manual:

```bash
# 1. Install dependencies
npm install

# 2. Edit konfigurasi
nano config-private.js
# Ganti nomor owner dengan nomor WA Anda

# 3. Jalankan bot
node bot-wa-private.js
```

---

## ⚙️ KONFIGURASI

Edit file `config-private.js`:

```javascript
module.exports = {
    // Ganti dengan nomor WhatsApp Anda (tanpa + dan spasi)
    ownerNumber: ['6281234567890'], // ⚠️ GANTI INI!
    
    // Ganti dengan nama Anda
    ownerName: 'Owner Bot',
    
    // Nama bot
    botName: 'Bot WA Private',
    
    // Auto read pesan
    autoRead: true,
}
```

**Format Nomor:**
- ❌ Salah: `+62 812-3456-7890`
- ✅ Benar: `6281234567890`

---

## 🎮 CARA MENGGUNAKAN

### 1. Jalankan Bot

```bash
node bot-wa-private.js
```

### 2. Scan QR Code

- Buka WhatsApp
- Tap titik tiga (⋮) → **Perangkat Tertaut**
- Tap **Tautkan Perangkat**
- Scan QR Code di Termux

### 3. Kirim Command

Kirim pesan ke bot dari nomor owner:

| Command | Fungsi |
|---------|--------|
| `.menu` | Tampilkan menu |
| `.ping` | Cek kecepatan bot |
| `.runtime` | Cek uptime bot |
| `.info` | Info bot |
| `.owner` | Info owner |

---

## 📁 STRUKTUR FILE

```
bot-wa-private/
├── bot-wa-private.js       # File utama bot
├── config-private.js       # Konfigurasi bot
├── package-private.json    # Dependencies
├── install-termux.sh       # Script instalasi
├── PANDUAN_TERMUX.md       # Panduan lengkap
├── README_BOT_PRIVATE.md   # File ini
└── auth_info/              # Session WhatsApp (auto-generated)
```

---

## 🔧 TROUBLESHOOTING

### Bot tidak merespon?

1. Cek nomor owner di `config-private.js` sudah benar
2. Format nomor: `628xxx` (tanpa + dan spasi)
3. Restart bot: `CTRL+C` lalu `node bot-wa-private.js`

### QR Code tidak muncul?

```bash
rm -rf auth_info
node bot-wa-private.js
```

### Error saat npm install?

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 💡 TIPS

### Agar Bot Tetap Berjalan

**Gunakan Screen:**

```bash
pkg install screen
screen -S botwa
node bot-wa-private.js
# Tekan CTRL+A lalu D untuk detach
```

Kembali ke session:
```bash
screen -r botwa
```

**Atau Gunakan PM2:**

```bash
npm install -g pm2
pm2 start bot-wa-private.js --name "bot-wa"
pm2 save
```

### Multiple Owner

Edit `config-private.js`:

```javascript
ownerNumber: ['6281234567890', '6289876543210'],
```

### Ganti Prefix

Edit `config-private.js`:

```javascript
prefix: '!', // Ganti dari . ke !
```

Command jadi: `!menu`, `!ping`, dll.

---

## 📚 DOKUMENTASI LENGKAP

Untuk panduan instalasi lengkap dan detail, baca:

📖 **[PANDUAN_TERMUX.md](PANDUAN_TERMUX.md)**

Panduan tersebut mencakup:
- Instalasi step-by-step
- Troubleshooting lengkap
- Tips & trik
- FAQ

---

## ⚠️ CATATAN PENTING

- ⚠️ Bot ini **HANYA** untuk penggunaan pribadi
- ⚠️ **JANGAN** gunakan untuk spam atau hal ilegal
- ⚠️ **JANGAN** share QR Code atau folder `auth_info`
- ⚠️ Gunakan dengan bijak dan tidak melanggar TOS WhatsApp
- ⚠️ Backup folder `auth_info` secara berkala

---

## 🛠️ TEKNOLOGI

- **Baileys** - Library WhatsApp Multi-Device
- **Node.js** - Runtime JavaScript
- **Chalk** - Terminal styling
- **Pino** - Logger

---

## 📝 LISENSI

MIT License - Bebas digunakan untuk keperluan pribadi.

---

## 🙏 TERIMA KASIH

Terima kasih telah menggunakan Bot WhatsApp Private!

Jika ada pertanyaan atau masalah:
1. Baca [PANDUAN_TERMUX.md](PANDUAN_TERMUX.md)
2. Cek bagian Troubleshooting
3. Pastikan semua langkah instalasi sudah benar

---

## 📞 SUPPORT

Jika menemukan bug atau ingin request fitur:
- Buat issue di GitHub
- Atau hubungi developer

---

**Selamat menggunakan! 🎉**

*Dibuat dengan ❤️ untuk pengguna Termux*

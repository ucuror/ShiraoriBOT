# ⚡ QUICK START - BOT WHATSAPP PRIVATE

Panduan super cepat untuk memulai bot dalam 5 menit!

---

## 🎯 LANGKAH CEPAT (TERMUX)

### 1️⃣ Install Termux

Download dari F-Droid: https://f-droid.org/en/packages/com.termux/

### 2️⃣ Update Termux

```bash
pkg update -y && pkg upgrade -y
```

### 3️⃣ Install Git & Node.js

```bash
pkg install -y git nodejs
```

### 4️⃣ Download Bot

**Jika sudah di GitHub:**
```bash
git clone https://github.com/YOURUSERNAME/bot-wa-private.git
cd bot-wa-private
```

**Jika manual:**
```bash
mkdir bot-wa-private
cd bot-wa-private
# Copy semua file bot ke folder ini
```

### 5️⃣ Install Dependencies

```bash
mv package-private.json package.json
npm install
```

### 6️⃣ Edit Config

```bash
nano config-private.js
```

Ganti baris ini:
```javascript
ownerNumber: ['6281234567890'], // Ganti dengan nomor WA Anda
```

Simpan: `CTRL+X` → `Y` → `Enter`

### 7️⃣ Jalankan Bot

```bash
node bot-wa-private.js
```

### 8️⃣ Scan QR Code

1. Buka WhatsApp
2. Tap ⋮ → **Perangkat Tertaut**
3. Tap **Tautkan Perangkat**
4. Scan QR Code

### 9️⃣ Test Bot

Kirim pesan ke bot: `.menu`

---

## 🎉 SELESAI!

Bot sudah aktif dan siap digunakan!

---

## 📋 COMMAND LIST

| Command | Fungsi |
|---------|--------|
| `.menu` | Menu bantuan |
| `.ping` | Cek kecepatan |
| `.runtime` | Cek uptime |
| `.info` | Info bot |
| `.owner` | Info owner |

---

## 🔧 TROUBLESHOOTING CEPAT

### Bot tidak merespon?
```bash
# Cek config
nano config-private.js
# Pastikan nomor owner benar: 628xxx (tanpa + dan spasi)
```

### QR Code tidak muncul?
```bash
rm -rf auth_info
node bot-wa-private.js
```

### Error npm install?
```bash
rm -rf node_modules
npm cache clean --force
npm install
```

---

## 💡 TIPS CEPAT

### Agar bot tetap jalan:
```bash
pkg install screen
screen -S botwa
node bot-wa-private.js
# CTRL+A lalu D untuk keluar
```

Kembali ke bot:
```bash
screen -r botwa
```

---

## 📚 BUTUH BANTUAN LEBIH?

Baca panduan lengkap: **[PANDUAN_TERMUX.md](PANDUAN_TERMUX.md)**

---

**Selamat menggunakan! 🚀**

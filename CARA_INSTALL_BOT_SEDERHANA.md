# 🤖 Cara Install Bot WhatsApp Sederhana

## 📋 Yang Dibutuhkan
- Node.js versi 16+ ([Download disini](https://nodejs.org))
- NPM (sudah include dengan Node.js)
- Text editor (VS Code, Notepad++, dll)

## 🚀 Langkah Instalasi

### 1. Persiapan Folder
```bash
# Buat folder baru untuk bot
mkdir bot-whatsapp
cd bot-whatsapp
```

### 2. Copy File Bot
Salin file-file ini ke folder bot Anda:
- `bot-sederhana.js` (file utama bot)
- `package-bot-sederhana.json` (rename jadi `package.json`)

### 3. Install Dependencies
```bash
# Install semua package yang dibutuhkan
npm install
```

### 4. Edit Konfigurasi
Buka file `bot-sederhana.js` dan edit bagian config:

```javascript
const config = {
    botName: 'Bot WhatsApp Sederhana',
    ownerNumber: '62812345678@s.whatsapp.net', // ⭐ GANTI INI dengan nomor WhatsApp Anda
    prefix: '!', // Prefix command bot
}
```

**⚠️ PENTING**: Ganti `62812345678` dengan nomor WhatsApp Anda (tanpa tanda + dan spasi)

### 5. Jalankan Bot
```bash
npm start
```

### 6. Scan QR Code
1. Bot akan menampilkan QR Code di terminal
2. Buka WhatsApp di HP Anda
3. Pergi ke **Linked Devices** / **WhatsApp Web**
4. Scan QR Code yang muncul di terminal
5. Tunggu sampai muncul "✅ Bot WhatsApp terhubung!"

## 📱 Cara Menggunakan Bot

### Command yang Tersedia:
- `!ping` - Test apakah bot aktif
- `!hai` - Sapa bot
- `!menu` - Lihat semua command
- `!info` - Info tentang bot
- `!time` - Waktu sekarang
- `!sticker` - Buat sticker dari gambar (kirim gambar + caption !sticker)
- `!quote` - Quote inspiratif random
- `!joke` - Joke kocak random
- `!weather jakarta` - Info cuaca (butuh API key)
- `!translate en halo dunia` - Translate teks (butuh API key)

### Cara Test Bot:
1. Kirim pesan `!ping` ke bot
2. Bot akan reply `🏓 Pong!`
3. Kirim `!menu` untuk lihat semua command

## 🔧 Troubleshooting

### Error "Cannot find module"
```bash
# Hapus folder node_modules dan install ulang
rm -rf node_modules
npm install
```

### QR Code tidak muncul
```bash
# Install ulang baileys
npm uninstall @whiskeysockets/baileys
npm install @whiskeysockets/baileys@latest
```

### Bot tidak respon
- Pastikan bot masih jalan di terminal
- Cek koneksi internet
- Restart bot dengan Ctrl+C lalu `npm start` lagi

### Session error
```bash
# Hapus folder auth_info dan scan QR lagi
rm -rf auth_info
npm start
```

## 🎯 Tips Penggunaan

1. **Jangan close terminal** - Bot akan mati jika terminal ditutup
2. **Backup auth_info** - Folder ini berisi session WhatsApp Anda
3. **Test di chat pribadi dulu** - Sebelum add ke grup
4. **Ganti ownerNumber** - Supaya hanya Anda yang bisa akses fitur owner

## 🚀 Deploy ke VPS (Optional)

### Menggunakan PM2:
```bash
# Install PM2
npm install -g pm2

# Jalankan bot dengan PM2
pm2 start bot-sederhana.js --name "whatsapp-bot"

# Auto start saat server restart
pm2 startup
pm2 save

# Monitor bot
pm2 monit

# Restart bot
pm2 restart whatsapp-bot
```

## 📝 Menambah Fitur

### Tambah Command Baru:
Edit file `bot-sederhana.js`, tambahkan case baru di function `handleCommand`:

```javascript
case 'hello':
    await sock.sendMessage(from, {
        text: 'Hello! Saya bot WhatsApp'
    })
    break
```

### Fitur Grup (Admin Only):
```javascript
case 'announce':
    if (!isGroup) {
        await sock.sendMessage(from, { text: '❌ Command ini hanya untuk grup!' })
        return
    }

    // Cek admin
    const groupMetadata = await sock.groupMetadata(from)
    const isAdmin = groupMetadata.participants.some(p =>
        p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin')
    )

    if (!isAdmin) {
        await sock.sendMessage(from, { text: '❌ Hanya admin yang bisa announce!' })
        return
    }

    const announcement = args.join(' ')
    await sock.sendMessage(from, {
        text: `📢 *PENGUMUMAN*\n\n${announcement}`,
        mentions: groupMetadata.participants.map(p => p.id)
    })
    break
```

## 🔐 Keamanan

1. **Jangan share file auth_info** - Berisi session login Anda
2. **Ganti ownerNumber** - Supaya orang lain tidak bisa kontrol bot
3. **Backup kode bot** - Simpan di tempat aman
4. **Monitor aktivitas bot** - Cek log secara berkala

## ❓ FAQ

**Q: Bot bisa untuk berapa grup?**
A: Tidak terbatas, tapi jangan spam supaya tidak kena ban

**Q: Bisa jalan 24/7?**
A: Bisa, tapi butuh VPS atau komputer yang selalu nyala

**Q: Gratis selamanya?**
A: Ya, bot ini gratis. API external (cuaca, translate) mungkin bayar

**Q: Bisa kirim pesan otomatis?**
A: Bisa ditambahkan fiturnya dengan cron job atau scheduler

---

## 🎉 Selamat!

Bot WhatsApp Anda sudah siap digunakan!

**Support & Update:**
- Star repository ini jika membantu
- Report bug via Issues
- Contribution welcome!

**Happy Coding! 🚀**
const { makeWASocket, DisconnectReason, useMultiFileAuthState, downloadContentFromMessage } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const pino = require('pino')

// Konfigurasi bot sederhana
const config = {
    botName: 'Bot WhatsApp Sederhana',
    ownerNumber: '62812345678@s.whatsapp.net', // Ganti dengan nomor Anda
    prefix: '!',
}

// Fungsi utama bot
async function startBot() {
    // Setup auth state untuk menyimpan session
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info')

    // Buat koneksi WhatsApp
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['Bot WhatsApp', 'Desktop', '1.0.0']
    })

    // Event ketika credentials berubah
    sock.ev.on('creds.update', saveCreds)

    // Event ketika koneksi berubah
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('Connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect)

            if (shouldReconnect) {
                startBot()
            }
        } else if (connection === 'open') {
            console.log('✅ Bot WhatsApp terhubung!')
        }
    })

    // Event ketika menerima pesan
    sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0]

        // Skip jika pesan dari bot sendiri
        if (!message.message || message.key.fromMe) return

        // Ambil teks dari pesan
        const messageText = getMessageText(message)
        if (!messageText) return

        const from = message.key.remoteJid
        const isGroup = from.endsWith('@g.us')
        const sender = message.key.participant || message.key.remoteJid

        // Log pesan yang masuk
        console.log(`📨 Pesan dari ${sender}: ${messageText}`)

        // Cek apakah pesan dimulai dengan prefix
        if (!messageText.startsWith(config.prefix)) return

        // Parse command dan arguments
        const args = messageText.slice(config.prefix.length).trim().split(' ')
        const command = args.shift().toLowerCase()

        // Handler untuk berbagai command
        await handleCommand(sock, message, from, sender, command, args, isGroup)
    })

    return sock
}

// Fungsi untuk mengambil teks dari pesan
function getMessageText(message) {
    return (
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        message.message?.imageMessage?.caption ||
        message.message?.videoMessage?.caption ||
        ''
    )
}

// Handler untuk semua command
async function handleCommand(sock, message, from, sender, command, args, isGroup) {
    try {
        switch (command) {
            case 'ping':
                await sock.sendMessage(from, { text: '🏓 Pong!' })
                break

            case 'hai':
            case 'hello':
                await sock.sendMessage(from, {
                    text: `👋 Hai! Saya ${config.botName}\n\nKetik !menu untuk melihat daftar command`
                })
                break

            case 'menu':
                const menuText = `
🤖 *${config.botName}*

📋 *MENU COMMAND*
• !ping - Test bot
• !hai - Sapa bot
• !menu - Menu ini
• !info - Info bot
• !time - Waktu sekarang
• !sticker - Buat sticker dari gambar
• !quote - Quote random
• !joke - Joke random
• !weather [kota] - Info cuaca
• !translate [kode] [teks] - Translate
• !kick @user - Kick user (admin only)
• !add [nomor] - Add user (admin only)

💡 Prefix: ${config.prefix}
👨‍💻 Owner: ${config.ownerNumber.replace('@s.whatsapp.net', '')}
                `
                await sock.sendMessage(from, { text: menuText })
                break

            case 'info':
                const infoText = `
ℹ️ *INFO BOT*
• Nama: ${config.botName}
• Platform: WhatsApp
• Runtime: Node.js
• Library: Baileys
• Prefix: ${config.prefix}
• Status: Online ✅
                `
                await sock.sendMessage(from, { text: infoText })
                break

            case 'time':
                const now = new Date().toLocaleString('id-ID', {
                    timeZone: 'Asia/Jakarta',
                    dateStyle: 'full',
                    timeStyle: 'medium'
                })
                await sock.sendMessage(from, {
                    text: `🕐 *Waktu Sekarang*\n${now}`
                })
                break

            case 'sticker':
            case 'stiker':
                if (message.message?.imageMessage) {
                    const media = await downloadContentFromMessage(message.message.imageMessage, 'image')
                    let buffer = Buffer.from([])

                    for await (const chunk of media) {
                        buffer = Buffer.concat([buffer, chunk])
                    }

                    await sock.sendMessage(from, {
                        sticker: buffer,
                        mimetype: 'image/webp'
                    })
                } else {
                    await sock.sendMessage(from, {
                        text: '❌ Kirim gambar dengan caption !sticker untuk membuat sticker'
                    })
                }
                break

            case 'quote':
                const quotes = [
                    "Kesuksesan adalah persiapan bertemu dengan kesempatan.",
                    "Jangan menunggu kesempatan, ciptakanlah!",
                    "Mimpi tanpa tindakan hanyalah harapan.",
                    "Kegagalan adalah guru terbaik.",
                    "Hidup ini indah jika kita tahu cara menikmatinya."
                ]
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
                await sock.sendMessage(from, {
                    text: `💬 *Quote Hari Ini*\n\n"${randomQuote}"`
                })
                break

            case 'joke':
                const jokes = [
                    "Kenapa programmer selalu memakai kacamata? Karena mereka tidak bisa C# (see sharp)!",
                    "Apa bedanya kucing dan kopi? Kopi diminum, kucing di-ming!",
                    "Kenapa cicak bisa nempel di tembok? Karena pakai gecko!",
                    "Apa makanan kesukaan orang IT? Cookies dan Cache!",
                    "Kenapa WiFi putus-putus? Karena kangen sama modem!"
                ]
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
                await sock.sendMessage(from, {
                    text: `😂 *Joke Kocak*\n\n${randomJoke}`
                })
                break

            case 'weather':
                if (args.length === 0) {
                    await sock.sendMessage(from, {
                        text: '❌ Gunakan: !weather [nama kota]\nContoh: !weather Jakarta'
                    })
                    return
                }

                const city = args.join(' ')
                await sock.sendMessage(from, {
                    text: `🌤️ *Cuaca di ${city}*\n\n⚠️ Fitur cuaca memerlukan API key.\nSilakan daftarkan API key OpenWeatherMap di kode bot.`
                })
                break

            case 'translate':
                if (args.length < 2) {
                    await sock.sendMessage(from, {
                        text: '❌ Gunakan: !translate [kode bahasa] [teks]\nContoh: !translate en Halo dunia'
                    })
                    return
                }

                const langCode = args[0]
                const textToTranslate = args.slice(1).join(' ')
                await sock.sendMessage(from, {
                    text: `🌐 *Translate*\n\n⚠️ Fitur translate memerlukan API key.\nSilakan setup Google Translate API di kode bot.\n\nTeks: "${textToTranslate}"\nBahasa target: ${langCode}`
                })
                break

            // Command khusus grup
            case 'kick':
                if (!isGroup) {
                    await sock.sendMessage(from, { text: '❌ Command ini hanya untuk grup!' })
                    return
                }

                // Cek apakah user adalah admin
                const groupMetadata = await sock.groupMetadata(from)
                const isAdmin = groupMetadata.participants.some(p =>
                    p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin')
                )

                if (!isAdmin) {
                    await sock.sendMessage(from, { text: '❌ Hanya admin yang bisa menggunakan command ini!' })
                    return
                }

                await sock.sendMessage(from, {
                    text: '⚠️ Fitur kick memerlukan implementasi lebih lanjut untuk keamanan.'
                })
                break

            default:
                await sock.sendMessage(from, {
                    text: `❌ Command "${command}" tidak ditemukan.\nKetik !menu untuk melihat daftar command.`
                })
        }
    } catch (error) {
        console.error('Error handling command:', error)
        await sock.sendMessage(from, {
            text: '❌ Terjadi error saat memproses command.'
        })
    }
}

// Jalankan bot
console.log('🚀 Memulai Bot WhatsApp...')
startBot().catch(console.error)

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n👋 Bot dihentikan')
    process.exit(0)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})
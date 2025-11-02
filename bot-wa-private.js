/**
 * BOT WHATSAPP PRIVATE
 * Bot WhatsApp sederhana yang hanya merespon owner
 * Cocok untuk penggunaan pribadi di Termux
 */

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const pino = require('pino')
const chalk = require('chalk')
const fs = require('fs')
const config = require('./config-private')

// Waktu mulai bot
const startTime = Date.now()

// Fungsi untuk format waktu runtime
function runtime(seconds) {
    seconds = Number(seconds)
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor(seconds % (3600 * 24) / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)
    const dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " hari, ") : ""
    const hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : ""
    const mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " menit, ") : ""
    const sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : ""
    return dDisplay + hDisplay + mDisplay + sDisplay
}

// Fungsi untuk cek apakah pengirim adalah owner
function isOwner(sender) {
    return config.ownerNumber.includes(sender.split('@')[0])
}

// Fungsi untuk memulai bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
    const { version } = await fetchLatestBaileysVersion()

    console.log(chalk.green('╔═══════════════════════════════════╗'))
    console.log(chalk.green('║') + chalk.cyan('   BOT WHATSAPP PRIVATE v1.0      ') + chalk.green('║'))
    console.log(chalk.green('╚═══════════════════════════════════╝'))
    console.log(chalk.yellow('📱 Menghubungkan ke WhatsApp...'))

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['Bot WA Private', 'Chrome', '1.0.0']
    })

    // Event ketika koneksi berubah
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log(chalk.red('❌ Koneksi terputus!'), shouldReconnect ? chalk.yellow('Mencoba reconnect...') : chalk.red('Logged out!'))
            
            if (shouldReconnect) {
                startBot()
            }
        } else if (connection === 'open') {
            console.log(chalk.green('✅ Bot berhasil terhubung!'))
            console.log(chalk.cyan('📞 Nomor Owner: ') + chalk.white(config.ownerNumber.join(', ')))
            console.log(chalk.cyan('🤖 Mode: ') + chalk.white('PRIVATE'))
            console.log(chalk.yellow('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
        }
    })

    // Simpan kredensial
    sock.ev.on('creds.update', saveCreds)

    // Event ketika ada pesan masuk
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        try {
            if (type !== 'notify') return
            
            const m = messages[0]
            if (!m.message) return
            
            const messageType = Object.keys(m.message)[0]
            const body = m.message.conversation || 
                        m.message[messageType]?.text || 
                        m.message[messageType]?.caption || ''
            
            const from = m.key.remoteJid
            const sender = m.key.participant || m.key.remoteJid
            const isGroup = from.endsWith('@g.us')
            const pushname = m.pushName || 'Unknown'
            
            // Auto read pesan jika diaktifkan
            if (config.autoRead) {
                await sock.readMessages([m.key])
            }

            // Cek apakah pengirim adalah owner
            if (!isOwner(sender)) {
                console.log(chalk.red(`❌ Pesan dari non-owner diabaikan: ${pushname}`))
                return
            }

            // Log pesan dari owner
            console.log(chalk.cyan('📩 Pesan dari Owner:'), chalk.white(pushname))
            console.log(chalk.gray('   Pesan: ') + chalk.white(body))

            // Fungsi untuk reply pesan
            const reply = async (text) => {
                await sock.sendMessage(from, { text }, { quoted: m })
            }

            // Command handler
            const command = body.toLowerCase().trim()

            // Command: .menu atau .help
            if (command === '.menu' || command === '.help') {
                const menuText = `╔═══════════════════════════╗
║  🤖 BOT WA PRIVATE MENU  ║
╚═══════════════════════════╝

👋 Halo ${pushname}!

📋 *DAFTAR PERINTAH:*

🔹 *.menu* / *.help*
   Menampilkan menu ini

🔹 *.ping*
   Cek kecepatan respon bot

🔹 *.runtime*
   Cek berapa lama bot berjalan

🔹 *.info*
   Informasi tentang bot

🔹 *.owner*
   Info kontak owner

━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Bot ini hanya merespon owner
🔒 Mode: PRIVATE
━━━━━━━━━━━━━━━━━━━━━━━━━`
                await reply(menuText)
            }

            // Command: .ping
            else if (command === '.ping') {
                const timestamp = Date.now()
                await reply('Pong! 🏓')
                const latency = Date.now() - timestamp
                await reply(`⚡ Kecepatan: ${latency}ms`)
            }

            // Command: .runtime
            else if (command === '.runtime') {
                const uptime = process.uptime()
                const runtimeText = `⏱️ *RUNTIME BOT*\n\n🤖 Bot telah berjalan selama:\n${runtime(uptime)}`
                await reply(runtimeText)
            }

            // Command: .info
            else if (command === '.info') {
                const infoText = `╔═══════════════════════════╗
║    📱 INFO BOT WA PRIVATE    ║
╚═══════════════════════════╝

🤖 *Nama Bot:* ${config.botName}
👤 *Owner:* ${config.ownerName}
📞 *Nomor Owner:* ${config.ownerNumber.join(', ')}
🔒 *Mode:* Private
📖 *Versi:* 1.0.0
⚙️ *Platform:* Baileys Multi-Device

━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Bot ini dibuat untuk penggunaan pribadi
🔐 Hanya owner yang bisa menggunakan bot ini
━━━━━━━━━━━━━━━━━━━━━━━━━`
                await reply(infoText)
            }

            // Command: .owner
            else if (command === '.owner') {
                const ownerText = `👤 *INFORMASI OWNER*\n\n📛 Nama: ${config.ownerName}\n📞 Nomor: ${config.ownerNumber.join(', ')}\n\n💬 Hubungi owner untuk informasi lebih lanjut!`
                await reply(ownerText)
            }

            // Jika command tidak dikenali
            else if (body.startsWith('.')) {
                await reply(`❌ Command tidak ditemukan!\n\nKetik *.menu* untuk melihat daftar perintah.`)
            }

        } catch (error) {
            console.error(chalk.red('❌ Error handling message:'), error)
        }
    })

    return sock
}

// Jalankan bot
startBot().catch(err => {
    console.error(chalk.red('❌ Error starting bot:'), err)
    process.exit(1)
})

// Handle error
process.on('uncaughtException', (err) => {
    console.error(chalk.red('❌ Uncaught Exception:'), err)
})

process.on('unhandledRejection', (err) => {
    console.error(chalk.red('❌ Unhandled Rejection:'), err)
})

console.log(chalk.yellow('\n⚠️  Tekan CTRL+C untuk menghentikan bot\n'))

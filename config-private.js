/**
 * KONFIGURASI BOT WHATSAPP PRIVATE
 * 
 * Panduan:
 * 1. Ganti nomor owner dengan nomor WhatsApp Anda (tanpa +, tanpa spasi)
 * 2. Ganti nama owner dan nama bot sesuai keinginan
 * 3. Simpan file ini setelah diedit
 */

module.exports = {
    // ═══════════════════════════════════════════════════════
    // PENGATURAN OWNER
    // ═══════════════════════════════════════════════════════
    
    // Nomor WhatsApp owner (tanpa + dan tanpa spasi)
    // Contoh: ['6281234567890'] atau ['6281234567890', '6289876543210'] untuk multiple owner
    ownerNumber: ['6281234567890'], // ⚠️ GANTI DENGAN NOMOR ANDA!
    
    // Nama owner
    ownerName: 'Owner Bot', // ⚠️ GANTI DENGAN NAMA ANDA!
    
    // ═══════════════════════════════════════════════════════
    // PENGATURAN BOT
    // ═══════════════════════════════════════════════════════
    
    // Nama bot
    botName: 'Bot WA Private',
    
    // Auto read pesan (true = otomatis baca pesan, false = tidak)
    autoRead: true,
    
    // Prefix untuk command (default: .)
    prefix: '.',
    
    // ═══════════════════════════════════════════════════════
    // PENGATURAN TAMBAHAN
    // ═══════════════════════════════════════════════════════
    
    // Timezone
    timezone: 'Asia/Jakarta',
    
    // Bahasa
    language: 'id', // id = Indonesia, en = English
}

// ═══════════════════════════════════════════════════════
// CATATAN PENTING:
// ═══════════════════════════════════════════════════════
// 
// 1. Nomor owner HARUS dalam format: 62xxx (untuk Indonesia)
//    Contoh: 6281234567890 (TANPA tanda + dan TANPA spasi)
// 
// 2. Jika ingin menambah owner, pisahkan dengan koma:
//    ownerNumber: ['6281234567890', '6289876543210']
// 
// 3. Setelah mengedit file ini, restart bot dengan:
//    - Tekan CTRL+C untuk stop bot
//    - Jalankan lagi dengan: node bot-wa-private.js
// 
// 4. Jangan hapus tanda petik (' ') pada string!
// 
// ═══════════════════════════════════════════════════════

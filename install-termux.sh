#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# SCRIPT INSTALASI OTOMATIS BOT WHATSAPP PRIVATE UNTUK TERMUX
# ═══════════════════════════════════════════════════════════════

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fungsi untuk print dengan warna
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_header() {
    echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}  ${CYAN}$1${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
}

# Fungsi untuk cek apakah command tersedia
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Header
clear
echo ""
print_header "INSTALASI BOT WHATSAPP PRIVATE"
echo ""
print_info "Script ini akan menginstall semua yang dibutuhkan"
print_info "untuk menjalankan Bot WhatsApp Private di Termux"
echo ""
sleep 2

# ═══════════════════════════════════════════════════════════════
# LANGKAH 1: CEK DAN UPDATE TERMUX
# ═══════════════════════════════════════════════════════════════

print_header "LANGKAH 1: UPDATE TERMUX"
echo ""

print_info "Mengupdate package list..."
if pkg update -y; then
    print_success "Package list berhasil diupdate"
else
    print_error "Gagal update package list"
    exit 1
fi

echo ""
print_info "Mengupgrade packages..."
if pkg upgrade -y; then
    print_success "Packages berhasil diupgrade"
else
    print_warning "Beberapa packages mungkin gagal diupgrade, melanjutkan..."
fi

echo ""
sleep 1

# ═══════════════════════════════════════════════════════════════
# LANGKAH 2: INSTALL GIT
# ═══════════════════════════════════════════════════════════════

print_header "LANGKAH 2: INSTALL GIT"
echo ""

if command_exists git; then
    print_success "Git sudah terinstall"
    git --version
else
    print_info "Menginstall Git..."
    if pkg install -y git; then
        print_success "Git berhasil diinstall"
    else
        print_error "Gagal menginstall Git"
        exit 1
    fi
fi

echo ""
sleep 1

# ═══════════════════════════════════════════════════════════════
# LANGKAH 3: INSTALL NODE.JS
# ═══════════════════════════════════════════════════════════════

print_header "LANGKAH 3: INSTALL NODE.JS"
echo ""

if command_exists node; then
    print_success "Node.js sudah terinstall"
    node --version
    npm --version
else
    print_info "Menginstall Node.js..."
    print_warning "Ini mungkin memakan waktu 5-10 menit..."
    if pkg install -y nodejs; then
        print_success "Node.js berhasil diinstall"
        node --version
        npm --version
    else
        print_error "Gagal menginstall Node.js"
        exit 1
    fi
fi

echo ""
sleep 1

# ═══════════════════════════════════════════════════════════════
# LANGKAH 4: CEK FILE BOT
# ═══════════════════════════════════════════════════════════════

print_header "LANGKAH 4: CEK FILE BOT"
echo ""

# Cek apakah file-file bot ada
if [ -f "bot-wa-private.js" ] && [ -f "config-private.js" ] && [ -f "package-private.json" ]; then
    print_success "Semua file bot ditemukan"
else
    print_error "File bot tidak lengkap!"
    print_info "Pastikan file berikut ada di folder ini:"
    echo "  - bot-wa-private.js"
    echo "  - config-private.js"
    echo "  - package-private.json"
    exit 1
fi

echo ""
sleep 1

# ═══════════════════════════════════════════════════════════════
# LANGKAH 5: SETUP PACKAGE.JSON
# ═══════════════════════════════════════════════════════════════

print_header "LANGKAH 5: SETUP PACKAGE.JSON"
echo ""

if [ -f "package.json" ]; then
    print_warning "package.json sudah ada, akan di-backup..."
    mv package.json package.json.backup
    print_success "Backup dibuat: package.json.backup"
fi

print_info "Menyalin package-private.json ke package.json..."
cp package-private.json package.json
print_success "package.json berhasil dibuat"

echo ""
sleep 1

# ═══════════════════════════════════════════════════════════════
# LANGKAH 6: INSTALL DEPENDENCIES
# ═══════════════════════════════════════════════════════════════

print_header "LANGKAH 6: INSTALL DEPENDENCIES"
echo ""

print_info "Menginstall dependencies..."
print_warning "Ini mungkin memakan waktu 5-15 menit..."
print_info "Mohon bersabar dan jangan tutup Termux..."
echo ""

if npm install; then
    print_success "Semua dependencies berhasil diinstall"
else
    print_error "Gagal menginstall dependencies"
    print_info "Mencoba dengan npm cache clean..."
    npm cache clean --force
    if npm install; then
        print_success "Dependencies berhasil diinstall setelah clean cache"
    else
        print_error "Tetap gagal. Silakan coba manual dengan: npm install"
        exit 1
    fi
fi

echo ""
sleep 1

# ═══════════════════════════════════════════════════════════════
# LANGKAH 7: CEK KONFIGURASI
# ═══════════════════════════════════════════════════════════════

print_header "LANGKAH 7: CEK KONFIGURASI"
echo ""

print_warning "PENTING: Anda perlu mengedit file config-private.js"
print_info "Ganti nomor owner dengan nomor WhatsApp Anda"
echo ""
print_info "Untuk edit config, jalankan:"
echo -e "${YELLOW}  nano config-private.js${NC}"
echo ""
print_info "Cari baris: ownerNumber: ['6281234567890']"
print_info "Ganti dengan nomor WA Anda (tanpa + dan spasi)"
echo ""
print_info "Simpan dengan: CTRL+X, lalu Y, lalu Enter"
echo ""

read -p "Apakah Anda ingin edit config sekarang? (y/n): " edit_now

if [ "$edit_now" = "y" ] || [ "$edit_now" = "Y" ]; then
    nano config-private.js
    print_success "Config telah diedit"
else
    print_warning "Jangan lupa edit config sebelum menjalankan bot!"
fi

echo ""
sleep 1

# ═══════════════════════════════════════════════════════════════
# LANGKAH 8: SELESAI
# ═══════════════════════════════════════════════════════════════

print_header "INSTALASI SELESAI!"
echo ""

print_success "Bot WhatsApp Private berhasil diinstall!"
echo ""
print_info "Langkah selanjutnya:"
echo ""
echo -e "${CYAN}1.${NC} Edit konfigurasi (jika belum):"
echo -e "   ${YELLOW}nano config-private.js${NC}"
echo ""
echo -e "${CYAN}2.${NC} Jalankan bot:"
echo -e "   ${YELLOW}node bot-wa-private.js${NC}"
echo -e "   atau"
echo -e "   ${YELLOW}npm start${NC}"
echo ""
echo -e "${CYAN}3.${NC} Scan QR Code yang muncul dengan WhatsApp"
echo ""
echo -e "${CYAN}4.${NC} Bot siap digunakan!"
echo ""
print_info "Untuk bantuan lebih lanjut, baca: PANDUAN_TERMUX.md"
echo ""
print_success "Selamat menggunakan Bot WhatsApp Private! 🎉"
echo ""

# ═══════════════════════════════════════════════════════════════
# INFORMASI TAMBAHAN
# ═══════════════════════════════════════════════════════════════

print_header "INFORMASI TAMBAHAN"
echo ""
echo -e "${CYAN}📝 Command Berguna:${NC}"
echo ""
echo -e "  ${YELLOW}node bot-wa-private.js${NC}  - Jalankan bot"
echo -e "  ${YELLOW}CTRL+C${NC}                  - Stop bot"
echo -e "  ${YELLOW}nano config-private.js${NC}  - Edit config"
echo -e "  ${YELLOW}npm install${NC}             - Install ulang dependencies"
echo -e "  ${YELLOW}rm -rf auth_info${NC}        - Reset session (jika error)"
echo ""
echo -e "${CYAN}📚 Dokumentasi:${NC}"
echo -e "  Baca file ${YELLOW}PANDUAN_TERMUX.md${NC} untuk panduan lengkap"
echo ""
echo -e "${CYAN}⚠️  Catatan Penting:${NC}"
echo -e "  - Bot hanya merespon nomor owner yang diatur di config"
echo -e "  - Jangan share QR Code atau folder auth_info ke orang lain"
echo -e "  - Gunakan bot dengan bijak dan tidak melanggar TOS WhatsApp"
echo ""

print_success "Instalasi selesai! Terima kasih! 🙏"
echo ""

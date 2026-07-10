<p align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT License">
</p>

---

Template dashboard finansial modern dengan desain *Neumorphic* (Neomorphism) ringan. Dibangun dengan Tailwind CSS (CDN), vanilla JavaScript modular, dan CSS murni — tanpa framework frontend berat, tanpa bundler, tanpa backend.

Cukup buka `index.html` di browser dan semuanya berfungsi.

---

## ✨ Fitur

| Fitur | Deskripsi |
|---|---|
| **Neumorphic UI** | Desain soft UI dengan bayangan timbul/cembung khas Neumorphism |
| **Sidebar Navigasi** | Sidebar responsif dengan toggle mobile, overlay, dan tutup otomatis di ≥768px |
| **Profile Dropdown** | Menu profil dengan klik di luar & Esc untuk menutup |
| **Stat Cards** | 4 kartu statistik dengan animasi *fade-in-up* bertahap |
| **Mock Chart** | Grafik batang 12 hari (Income vs Expense) — dirender murni CSS/JS |
| **Tabel Transaksi** | 6 baris transaksi palsu dengan badge status dan animasi hover |
| **Add Transaction Modal** | Form modal dengan backdrop, Esc, animasi transisi, dan alert |
| **Nav Active State** | Navigasi aktif otomatis berdasarkan klik — `data-nav` attributes |
| **Animasi** | Fade-in-up, floating, pulse loading, card stagger delay |
| **Fully Responsive** | Mobile-first dengan breakpoint Tailwind `md:`, `lg:`, `xl:` |

## 🖥️ Preview

> Buka `index.html` langsung di browser — tidak perlu build step, tidak perlu server.

## 🛠️ Tech Stack

- **[Tailwind CSS](https://tailwindcss.com)** via CDN — utility-first CSS framework
- **Custom CSS (`style.css`)** — design tokens (`:root`), neumorphic utilities (`.neu-card`, `.neu-btn`, `.neu-input`, dll), animasi, badges, custom scrollbar
- **Vanilla JS (`script.js`)** — 7 modular IIFEs: Sidebar, Profile Dropdown, Modal, Mock Chart, Txn Table, Nav Active, Card Animations
- **[Inter](https://fonts.google.com/specimen/Inter)** — typeface dari Google Fonts
- **Inline SVG** — ikon fully custom, tanpa library ikon eksternal

## 📁 Struktur Folder

```
├── index.html       # Halaman utama dashboard
├── style.css        # Custom CSS (tokens, neumorphic utils, animasi)
├── script.js        # Vanilla JS modular (7 IIFE modules)
├── AGENTS.md        # Konteks untuk AI coding assistant
└── LICENSE          # MIT License
```

## 🚀 Cara Menjalankan

Buka `index.html` di browser (double-click atau drag ke browser).

Tidak ada dependensi, tidak ada build step, tidak ada server.

## 🎨 Kustomisasi

### Warna Utama

Warna dikelola melalui CSS custom properties di `:root` (`style.css`):

| Variable | Default | Kegunaan |
|---|---|---|
| `--color-page` | `#F0F4F8` | Background halaman & surface |
| `--color-sidebar` | `#DCE7F5` | Background sidebar |
| `--color-primary` | `#7C9EB2` | Tombol primary, focus ring, nav aktif |

### Menambahkan Halaman Baru

1. Salin struktur `index.html`
2. Tambahkan nav link dengan `data-nav="nama-halaman"`
3. Tambahkan module IIFE baru di `script.js`

### Menambahkan Transaksi Nyata

Data transaksi ada di `initTxnTable` (`script.js:191`). Ganti array `txns` dengan data dari API atau localStorage.

## 🌐 API Eksternal

- **Tailwind CSS CDN** — `https://cdn.tailwindcss.com`
- **Inter Google Fonts** — `https://fonts.googleapis.com/css2?family=Inter:...`
- **UI Avatars** — `https://ui-avatars.com/api/...` (untuk avatar profil)

## 📄 Lisensi

[MIT](LICENSE) © 2026 SioGirsang

---

<p align="center">Dibuat oleh <a href="https://github.com/SioGirsang">Sio Girsang</a></p>

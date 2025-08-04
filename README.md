# Aplikasi Keuangan Pribadi

Aplikasi web untuk mengelola keuangan pribadi dengan fitur tracking income, expenses, budgeting, dan pelaporan finansial.

## 🚀 Fitur Utama

- **Dashboard**: Overview keuangan pribadi dengan ringkasan saldo, pemasukan, dan pengeluaran
- **Manajemen Transaksi**: Tambah, edit, dan hapus transaksi income/expense
- **Kategorisasi**: Organisir transaksi berdasarkan kategori
- **Budgeting**: Atur dan monitor budget bulanan per kategori
- **Laporan**: Visualisasi data keuangan dengan grafik dan analytics
- **Cloud Database**: Data tersimpan aman di MongoDB Atlas (dapat diakses dari mana saja)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 dengan App Router
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: NextAuth.js
- **Language**: TypeScript
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📋 Prerequisites

Sebelum menjalankan aplikasi, pastikan Anda memiliki:

- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- Account MongoDB Atlas (gratis)

## 🔧 Installation & Setup

### 1. Clone dan Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Setup Database (MongoDB Atlas)

1. **Buat Account MongoDB Atlas**:
   - Daftar di [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Buat cluster gratis (M0 Sandbox)

2. **Setup Database Access**:
   - Buat database user dengan username/password
   - Whitelist IP address Anda (atau 0.0.0.0/0 untuk akses global)

3. **Dapatkan Connection String**:
   - Di MongoDB Atlas dashboard, klik "Connect"
   - Pilih "Connect your application"
   - Copy connection string

### 3. Environment Variables

1. Copy file `.env.local.example` menjadi `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` dan isi dengan konfigurasi Anda:
```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/keuangan-pribadi?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here
```

**Cara mendapatkan NEXTAUTH_SECRET**:
```bash
# Generate secret key
openssl rand -base64 32
```

### 4. Menjalankan Aplikasi

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📱 Penggunaan

### Menambah Transaksi
1. Klik "Tambah Pemasukan" atau "Tambah Pengeluaran" di dashboard
2. Isi form dengan detail transaksi
3. Pilih kategori yang sesuai
4. Simpan transaksi

### Melihat Laporan
1. Navigasi ke halaman "Laporan"
2. Pilih periode yang ingin dilihat
3. Analisis data dengan grafik yang tersedia

### Mengatur Budget
1. Pergi ke halaman "Budget"
2. Set budget bulanan per kategori
3. Monitor penggunaan budget secara real-time

## 🌐 Deploy ke Production

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables di Vercel dashboard
```

### Manual Deployment
1. Build aplikasi: `npm run build`
2. Upload ke server
3. Set environment variables
4. Jalankan: `npm start`

## 🔒 Keamanan Database

### MongoDB Atlas Security:
- **Network Access**: Whitelist IP yang diizinkan
- **Database Access**: Buat user dengan permission minimal
- **Connection String**: Jangan commit ke git, gunakan environment variables

### Best Practices:
```env
# ✅ GOOD - Specific IP
# Network Access: 203.78.121.47/32

# ⚠️ CAUTION - Global access (hanya untuk development)
# Network Access: 0.0.0.0/0
```

## 📊 API Endpoints

### Transactions
- `GET /api/transactions` - Fetch transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/[id]` - Update transaction
- `DELETE /api/transactions/[id]` - Delete transaction

### Summary
- `GET /api/summary` - Get financial summary

### Budget
- `GET /api/budget` - Fetch budgets
- `POST /api/budget` - Create/update budget

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:
1. Check dokumentasi ini
2. Buat issue di GitHub repository
3. Contact developer

---

**Happy budgeting! 💰**

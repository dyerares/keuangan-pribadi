# 🚀 Deploy Guide - Akses Aplikasi dari Mana Saja

## Setup MongoDB Atlas (Database Cloud)

### 1. Buat Account MongoDB Atlas
- Kunjungi: https://www.mongodb.com/atlas
- Sign up gratis
- Buat cluster M0 (gratis selamanya)

### 2. Setup Database Access
```
1. Klik "Database Access" di sidebar
2. Klik "Add New Database User"
3. Buat username/password
4. Role: "Read and write to any database"
5. Klik "Add User"
```

### 3. Setup Network Access
```
1. Klik "Network Access"
2. Klik "Add IP Address"  
3. Pilih "Allow Access from Anywhere" (0.0.0.0/0)
4. Klik "Confirm"
```

### 4. Get Connection String
```
1. Klik "Clusters" → "Connect"
2. Pilih "Connect your application"
3. Copy connection string:
mongodb+srv://username:password@cluster.mongodb.net/keuangan-pribadi?retryWrites=true&w=majority
```

## Deploy ke Vercel

### 1. Push ke GitHub
```bash
cd d:\Project\keuangan-pribadi
git init
git add .
git commit -m "Personal finance app"

# Jika belum punya repo, buat di github.com/new
git remote add origin https://github.com/yourusername/keuangan-pribadi.git
git push -u origin main
```

### 2. Deploy di Vercel
```
1. Buka https://vercel.com
2. Sign up dengan GitHub
3. Klik "New Project"
4. Import repo "keuangan-pribadi"
5. Deploy (otomatis)
```

### 3. Set Environment Variables
Di Vercel Dashboard → Settings → Environment Variables:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/keuangan-pribadi?retryWrites=true&w=majority
NEXTAUTH_SECRET = your-secret-key-here
NEXTAUTH_URL = https://your-app.vercel.app
```

### 4. Redeploy
Klik "Redeploy" di dashboard Vercel

## Hasil Akhir

✅ **Aplikasi bisa diakses dari:**
- Desktop/laptop mana saja
- Smartphone Android/iOS  
- Tablet
- Komputer kantor/warnet
- Semua device dengan internet

✅ **URL akan seperti:**
`https://keuangan-pribadi-username.vercel.app`

✅ **Data tersimpan di cloud:**
- Tidak hilang meski ganti device
- Bisa akses dari mana saja
- Backup otomatis

## Alternative: Hosting Lain

### Railway.app
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Render.com
```
1. Connect GitHub repo
2. Auto deploy dari GitHub
3. Set environment variables
```

## Security Notes

⚠️ **Untuk Production:**
```env
# Ganti Network Access dari 0.0.0.0/0 ke IP spesifik
# Generate secret key yang kuat
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

🔒 **Best Practices:**
- Jangan commit .env.local ke Git
- Gunakan environment variables di hosting
- Monitor usage di MongoDB Atlas dashboard

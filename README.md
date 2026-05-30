# MOHON DIBACA

Password untuk login panel guru adalah 0000

# RuangLokal AI - Hackathon GDG Binus 🚀

RuangLokal AI adalah platform generator modul (RPP) dan kuis interaktif yang mengadaptasi kearifan lokal dan wilayah asal siswa. Dibangun dengan **Next.js**, **Prisma**, dan kekuatan **Google Gemini 2.5 Flash API**.

## 🌐 Cara Menguji (Tanpa Install)
Cara terbaik untuk penguji (juri) adalah dengan mengakses versi yang sudah di-deploy. 
(Masukkan URL deployment Anda di sini, contoh: `https://ruanglokal-ai.vercel.app`)

Dengan mengakses versi yang sudah di-deploy, penguji **TIDAK PERLU** memiliki API Key, karena aplikasi menggunakan API Key yang sudah disetel aman di server.

---

## 💻 Cara Menguji Secara Lokal (Bagi Juri/Penguji)

Jika Anda harus menjalankan *source code* ini secara lokal di mesin Anda, Anda **harus** memiliki API Key Gemini karena aplikasi ini membutuhkannya untuk fitur *Generative AI*.

### Langkah 1: Persiapan API Key
1. Dapatkan API Key secara gratis melalui [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Di *root directory* proyek, gandakan (copy) file `.env.example` dan ubah namanya menjadi `.env`.
3. Masukkan API Key Anda ke dalam file `.env` tersebut:
   ```env
   GEMINI_API_KEY=AIzaSy_masukkan_api_key_anda_disini
   ```

### Langkah 2: Persiapan Database (Prisma)
Proyek ini menggunakan SQLite (via Prisma) agar mudah dijalankan lokal.
Jalankan perintah ini di terminal untuk sinkronisasi database:
```bash
npx prisma db push
```

### Langkah 3: Menjalankan Aplikasi
Install dependensi dan jalankan *development server*:
```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

**Kredensial Login Lokal:**
* Masuk ke Panel Guru membutuhkan PIN: **0000**

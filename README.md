# **API Fakultas Prodi dengan Express JS - MongoDB**

## **Coba Langsung API**
Link dibawah merupakan API yang sudah di deploy di netlify(Serverless API) dan siap untuk digunakan
```bash
https://upi-api.netlify.app/.netlify/functions/api/end-point
```
### End-Point
- /fakultas-prodi
- /fakultas
- /fakultas/{namaFakuktas}/prodi
- /prodi
- /prodi/{kodeProdi}

## **Tata Cara Menjalankan Di Server Lokal Masing-masing**
### Clone repository ini
```bash
git clone https://github.com/Gre-ys/UPI-API
```
###  Install Seluruh Package/dependensi yang dibutuhkan(tertera di package.json)
```bash
npm install
```
### Buat file .env di dalam local repository lalu di dalamnya buat variabel untuk link koneksi database
```bash
MONGODB_URI = link koneksi database mongodb
```
### Buka terminal lalu masuk ke local repository serta jalankan perintah untuk memulai server
```bash
npm run start
```
### Tunggu sampai di dalam terminal tertera pemberitahuan
![pemberitahuan](img/pemberitahuan.PNG)
### Untuk cek penggunaan API, akses localhost:4000/end-point di browser atau di aplikasi pengujian API seperti Postman
![testAPI](img/testAPI.PNG)



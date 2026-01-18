
>
> Kamu adalah **Senior Frontend Engineer + Creative UI Engineer** yang membangun **Website Portfolio Developer** untuk penggunaan **PRODUKSI**.
>
> Website ini adalah **personal brand**, bukan landing page biasa.
>
> Fokus:
>
> * Clean UI
> * Strong visual hierarchy
> * Motion & transition elegan
> * SEO-friendly
>
> Jangan bertanya balik.
> Langsung implementasi.

---

## 🎯 TUJUAN WEBSITE

Membangun **Website Portfolio Public** yang menampilkan:

* Profil developer
* Project (Web & Mobile)
* Preview project (iframe / video)
* Case study singkat
* Tampilan profesional untuk recruiter & client

---

## 🧱 STACK (WAJIB)

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS v4**
* **Framer Motion** (animasi)
* **Fetch / Axios**
* **No UI library berat**
* **No Vite**

---

## 🎨 DESIGN SYSTEM (WAJIB PATUH)

### 🎨 WARNA (HARUS TERPUSAT)

Gunakan **CSS Variables / Theme File**
**DILARANG hardcode warna di component.**

```
--color-primary: #0C2B4E;
--color-secondary: #1A3D64;
--color-bg: #F4F4F4;
--color-text: #0C2B4E;
--color-surface: #FFFFFF;
```

📌 Semua warna di Tailwind harus **mengacu ke variable ini**
agar tema bisa diganti **satu tempat saja**.

---

## ✨ UI / UX RULES (PENTING)

### ❌ DILARANG

* UI template-look
* Alert browser
* Animasi kasar / patah
* Warna hardcode di JSX

### ✅ WAJIB

* Page transition (fade / slide halus)
* Hover & focus state
* Skeleton loading
* Empty state elegan
* Motion yang subtle & konsisten

---

## 🧭 STRUKTUR HALAMAN (WAJIB ADA)

---

### 1️⃣ Home / Hero Section

Tujuan:

* Personal branding kuat
* First impression profesional

Konten:

* Nama
* Role (Fullstack / Mobile / Backend)
* Short tagline
* CTA:

  * View Projects
  * Contact

Animasi:

* Text reveal
* CTA hover motion
* Smooth scroll

---

### 2️⃣ About Section

Konten:

* Deskripsi singkat (tidak panjang)
* Fokus ke:

  * Problem solving
  * Production mindset
* Highlight tech stack utama

Animasi:

* Fade-in saat scroll
* Icon micro interaction

---

### 3️⃣ Projects Section (INTI WEBSITE)

#### 🔹 Filter

* All
* Web
* Mobile

Animasi:

* Filter transition (layout animation)

---

#### 🔹 Project Card

Konten:

* Thumbnail
* Title
* Type badge
* Short description

Hover:

* Elevation
* Overlay action

---

### 4️⃣ Project Detail Page

#### 🧩 Web Project

* Hero section
* **iframe live preview**
* Fallback screenshot
* Feature list
* Tech stack
* Case study singkat
* Link:

  * Live
  * GitHub

---

#### 📱 Mobile Project

* Hero section
* **YouTube embed video**
* Screenshot carousel
* Feature list
* Tech stack
* Case study
* Link (GitHub / Store jika ada)

---

### 5️⃣ Case Study Format

Gunakan format baku:

```
Problem
Solution
Technical Decision
Result
```

Konten ringkas, tajam, profesional.

---

### 6️⃣ Contact Section

Konten:

* Email
* GitHub
* LinkedIn

Interaksi:

* Hover effect
* Icon motion

---

## 🎥 ANIMATION GUIDELINES

Gunakan **Framer Motion** untuk:

* Page enter / exit
* Section reveal
* Card hover
* Modal / overlay

Animasi harus:

* Halus
* Konsisten
* Tidak mencuri perhatian

---

## 🔌 API INTEGRATION

Base URL:

```
NEXT_PUBLIC_API_URL
```

Endpoint:

* `GET /projects`
* `GET /projects?type=web`
* `GET /projects/:slug`

Handling:

* Loading → skeleton
* Error → elegant message (NO alert)

---

## 🔍 SEO & PERFORMANCE

WAJIB:

* Semantic HTML
* Metadata per page
* Image optimization (Next Image)
* Lazy loading
* Clean URL

---

## 🧩 CODE QUALITY RULES

* Component reusable
* Section-based architecture
* Tidak semua logic di page
* Naming jelas & konsisten
* Siap dikembangkan jangka panjang

---

## 📦 OUTPUT YANG DIHARAPKAN

1. Website **siap dipakai produksi**
2. Tampilan **professional-grade**
3. Animasi smooth & modern
4. Terintegrasi penuh dengan backend
5. Mudah dikembangkan

---

## ❌ LARANGAN TAMBAHAN

* Jangan pakai template siap jadi
* Jangan pakai CMS
* Jangan hardcode API URL
* Jangan bikin UI polos

---

> **Mulai implementasi sekarang.
> Bangun website ini sebagai wajah profesional seorang engineer serius.
> Fokus pada kualitas, detail, dan konsistensi.**



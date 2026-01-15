# 🚀 Portofolio 2.0 - Firman Farel Richardo

Sistem Portofolio Fullstack yang dinamis, scalable, dan modern. Dibangun dengan fokus pada performa, keamanan, dan pengalaman pengguna (UX), menggunakan standar industri terbaru.

![CI Quality Gate](https://github.com/firmanfarelrichardo/portofolio2.0/actions/workflows/ci.yml/badge.svg)
![Vercel Deploy](https://therealsujitk-vercel-badge.vercel.app/?app=firman-portfolio)

## 🛠️ Tech Stack (The Engine)

* **Core:** Next.js 15 (App Router), React 19, TypeScript
* **Database:** PostgreSQL (Neon DB), Drizzle ORM
* **Auth:** Auth.js v5 (NextAuth)
* **Styling:** Tailwind CSS, Shadcn UI, Lucide Icons
* **DevOps:** GitHub Actions (CI), Husky (Pre-commit), Vercel (CD)
* **Tools:** Zod (Validation), React Hook Form, Tiptap (Rich Text)

---

## 🗺️ Project Roadmap & Features

### 🏛️ Ekosistem 1: The Fortress (Admin & Security)
Fokus: Keamanan dan Manajemen Konten (CMS).

- [ ] **Authentication System**
    - [ ] Setup Auth.js v5 (Secure Login).
    - [ ] Middleware Protection (Route Guard).
    - [ ] Session Management (HTTP Only Cookies).
- [ ] **Admin Shell**
    - [ ] Sidebar Navigation & Breadcrumbs.
    - [ ] Dashboard Overview Stats.
- [ ] **Content Engine (CMS)**
    - [ ] **Article Manager:** CRUD, Rich Text Editor (Tiptap), Slug Generator.
    - [ ] **Project Manager:** Portfolio Input, Tech Stack Selector.
    - [ ] **Media System:** Image Upload (Uploadthing).
- [ ] **Inbox System**
    - [ ] Contact Form Messages Viewer.
    - [ ] Comment Moderation (Approve/Delete).

### 🌐 Ekosistem 2: The Showroom (Public Interface)
Fokus: SEO, Performa, dan User Experience.

- [ ] **Landing Page**
    - [ ] Hero Section (Animated).
    - [ ] Featured Projects Showcase.
    - [ ] Latest Thoughts (Blog Snippets).
- [ ] **Projects Gallery**
    - [ ] Filterable Project List (by Tech Stack).
    - [ ] Case Study Detail Page.
- [ ] **Knowledge Base (Blog)**
    - [ ] Search & Category Filter.
    - [ ] Article Reader View (Typography focus).
    - [ ] View Counter (Debounced).
- [ ] **Interaction**
    - [ ] Contact Form (Zod Validation + Server Actions).

### ⚙️ Ekosistem 3: Infrastructure
- [x] **DevOps Pipeline** (CI/CD Setup).
- [x] **Database Schema** (User, Post, Project Tables).
- [ ] **SEO Optimization** (Dynamic Metadata & OpenGraph).

---

## 🚀 Getting Started

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/firmanfarelrichardo/portofolio2.0.git](https://github.com/firmanfarelrichardo/portofolio2.0.git)
    cd portofolio2.0
    ```

2.  **Install Dependencies**
    ```bash
    npm ci
    ```

3.  **Setup Environment**
    Copy `.env.example` to `.env.local` and fill in your keys (Database URL, Auth Secret, etc).

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

*Built by Firman Farel Richardo.*
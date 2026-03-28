# 🌀 ITZFIZZ — Scroll-Driven Hero Section Animation

> A premium scroll-based hero section animation built with Next.js, GSAP, and Tailwind CSS.

---

## 📌 Assignment Overview

**Assignment:** Scroll-Driven Hero Section Animation  
**Objective:** Recreate a scroll-responsive hero section inspired by a reference demo, focusing on motion quality, smoothness, and interaction logic using modern frontend technologies.

**Reference:** [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🔗 Live Demo & Repository

| | Link |
|---|---|
| 🌐 **Live Site** | _your-vercel-link-here_ |
| 💻 **GitHub Repo** | _your-github-repo-link-here_ |

---

## ✨ Features

### 🖼️ Hero Section Layout
- Full-screen hero section (above the fold)
- Letter-spaced headline: **W E L C O M E I T Z F I Z Z**
- Impact metrics / statistics displayed below the headline (percentages with descriptions)

### 🎬 Initial Load Animation
- Headline fades in with a smooth staggered reveal on page load
- Statistics animate in one by one with subtle delays
- Smooth and premium feel — no abrupt transitions

### 🖱️ Scroll-Based Animation (Core Feature)
- Hero section responds dynamically to page scroll
- Main visual element moves smoothly based on scroll position
- Animation tied to **scroll progress** (not time-based autoplay)
- Natural, fluid easing via interpolation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js / React.js** | Framework & component structure |
| **Tailwind CSS** | Utility-first styling |
| **GSAP** | Smooth scroll & intro animations |
| **HTML / CSS / JavaScript** | Core web technologies |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/project2.git

# Navigate into the project
cd project2

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
project2/
├── app/              # Next.js app directory
│   ├── page.tsx      # Main page component
│   └── layout.tsx    # Root layout
├── public/           # Static assets (images, icons)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚡ Performance Guidelines Followed

- Used `transform` properties (`translate`, `scale`, `rotate`) for all animations
- Avoided layout reflows on scroll events
- GSAP ScrollTrigger used for performant scroll-linked motion
- Smooth easing/interpolation for natural fluid movement

---

## 📸 Preview

<img width="1919" height="871" alt="Screenshot 2026-03-28 121254" src="https://github.com/user-attachments/assets/50188ee3-1c85-4ed6-8309-89f373394ea0" />

Built as part of a frontend animation assignment.

---

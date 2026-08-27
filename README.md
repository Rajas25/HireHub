# 🚀 HireHub – Job Portal Platform

**HireHub** is a modern, fully responsive job portal website designed to connect job seekers with employers. It features a clean UI, job listings, resume analysis, testimonials, and a smart intro overlay that plays on first visit and page refresh—just like LinkedIn.

<img width="1667" height="1006" alt="image" src="https://github.com/user-attachments/assets/593c681c-5b15-45aa-ae53-6bcfbd570935" />


---

## ✨ Features

- 🏠 **Landing Page** – Hero carousel, category explorer, job search bar
- 📄 **Job Listings** – Filter by Featured, Full‑Time, Part‑Time
- 📝 **Job Detail** – Full job description, application form, company info
- 👥 **About Us** – Team introduction with background image
- 💬 **Testimonials** – Client feedback carousel
- 📊 **Resume Analyzer** – Upload PDF/DOCX/TXT, get instant skill analysis and improvement tips (client‑side)
- 📞 **Contact** – Contact form (non‑functional, ready for backend integration)
- 🎬 **Smart Intro Overlay** – Plays a promotional video on first visit and page refresh, but not during normal navigation (sessionStorage)

---

## 🛠️ Tech Stack

- **HTML5** – Semantic structure
- **CSS3** – Custom styling with Prussian blue (#003153) theme
- **Bootstrap 5** – Responsive grid and components
- **JavaScript (ES6)** – Interactivity, intro overlay logic, resume parser
- **Libraries**:
  - [Font Awesome](https://fontawesome.com/) – Icons
  - [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/) – Testimonials & hero carousel
  - [Animate.css](https://animate.style/) – Animations
  - [PDF.js](https://mozilla.github.io/pdf.js/) – PDF text extraction (client‑side)
  - [Mammoth.js](https://github.com/mwilliamson/mammoth.js) – DOCX text extraction

---

## 📁 Project Structure
hirehub/
├── index.html # Home page
├── about.html # About us
├── job-list.html # Job listings
├── job-detail.html # Job detail view
├── testimonial.html # Testimonials
├── contact.html # Contact page
├── Resume.html # Resume Analyzer
├── 404.html → Resume.html # (renamed)
├── promo.mp4 # Intro video
├── 1000810916.jpg # Logo image
├── img/ # All other images (carousel, company logos, about, etc.)
├── css/ # Bootstrap and custom styles
├── js/ # Custom JavaScript (main.js)
├── lib/ # Third‑party libraries
└── README.md # This file


<img width="1767" height="987" alt="image" src="https://github.com/user-attachments/assets/2c2eb528-1203-4bd0-9e17-b429a571770a" />


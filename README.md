# Ann Maria Sunil — Premium Developer Portfolio Website

A modern, responsive, multi-page portfolio website designed for **Ann Maria Sunil**, a first-year Computer Science Engineering student at **Amal Jyothi College of Engineering**.

Built with a **creative 3D-inspired navy blue and cyan theme**, subtle glassmorphism, smooth micro-interactions, complete light/dark mode support, an interactive AI assistant chatbot, and zero external framework dependencies.

---

## 🌟 Key Features

1. **Multi-Page Architecture**:
   - `index.html` — Hero section with dynamic typing animation, interactive Three.js 3D composition, call-to-action buttons, and quick stats.
   - `about.html` — Verified academic narrative (Amal Jyothi College of Engineering), areas of interest, personal goals, and professional photograph placeholder.
   - `skills.html` — Interactive categorized skill matrix (C, Python, GitHub, Node.js, Web Dev, AI, ML, UI/UX Design) with editable proficiency indicators.
   - `projects.html` — Interactive project cards with 3D hover tilt, live demos, repository links, and an editable template for upcoming projects.
   - `resume.html` — Professional resume preview, printable document view, and direct download for the PDF resume.
   - `contact.html` — Working contact form with real-time validation and Formspree integration instructions.

2. **Design System & Palette**:
   - **Primary Background**: `#071426`
   - **Secondary Background**: `#0B1F35`
   - **Accent Cyan**: `#22D3EE`
   - **Secondary Accent Sky**: `#38BDF8`
   - **Main Text**: `#F1F5F9`
   - **Secondary Text**: `#94A3B8`
   - **Complete Light Mode**: Soft slate background with cyan accents and dark typography.

3. **Advanced Micro-Interactions**:
   - Interactive 3D Glowing Geodesic Composition (Three.js with responsive mouse tracking and accessible CSS fallback).
   - Custom Desktop Cursor with smooth follower ring.
   - Scroll-triggered reveal animations.
   - 3D card perspective tilt on hover.
   - Floating AI Assistant Chatbot with quick-prompt chips, knowledge retrieval, and an optional custom API proxy settings modal.

---

## 📁 Project Structure

```
├── index.html              # Home page
├── about.html              # About Me page
├── skills.html             # Skills & Stack page
├── projects.html           # Projects showcase
├── resume.html             # Resume & CV preview page
├── contact.html            # Contact & collaboration page
├── favicon.svg             # Monogram glowing vector favicon
├── README.md               # Documentation & deployment guide
├── css/
│   └── style.css           # Global stylesheet & design tokens
├── js/
│   ├── main.js             # Core interactions, cursor, theme switcher, form validator
│   ├── three-scene.js      # Three.js 3D interactive hero element
│   └── chatbot.js          # Interactive AI Portfolio Assistant
└── assets/
    ├── images/
    │   ├── profile-placeholder.svg
    │   ├── project-1.svg
    │   ├── project-2.svg
    │   └── project-placeholder.svg
    └── resume/
        └── Ann_Maria_Sunil_Resume.pdf
```

---

## 🛠️ How to Customize

### 1. Replacing the Resume PDF
Place your updated resume PDF into:
```
assets/resume/Ann_Maria_Sunil_Resume.pdf
```
Both the download button on `index.html` and the full preview toolbar on `resume.html` automatically reference this path.

### 2. Configuring the Contact Form (Formspree)
1. Sign up for a free account at [Formspree.io](https://formspree.io).
2. Create a new form and copy your form ID (e.g. `xpzgvkrq`).
3. Open `contact.html` and replace:
   ```html
   <form id="contact-form" action="https://formspree.io/f/your-formspree-id" method="POST">
   ```
   with your actual ID:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xpzgvkrq" method="POST">
   ```

### 3. Adding New Projects
Open `projects.html` and copy the project card markup inside the `.projects-grid` container to add new cards.

---

## 🚀 GitHub Pages Deployment

1. Initialize a Git repository in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ann Maria Sunil Portfolio"
   ```
2. Create a new repository on your GitHub account (e.g., `portfolio` or `annmariasunil.github.io`).
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** > **Pages**.
5. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
6. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 🔒 Accessibility & Reduced Motion
- Uses semantic HTML5 (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`).
- All interactive links and buttons include accessible labels.
- Automatically disables heavy animations, custom cursors, and 3D rotations when the user's OS preference is set to `prefers-reduced-motion: reduce`.


# Iddico Guest House - Ghana Boutique Accommodations

A modern, high-performance boutique hotel booking web application for **Iddico Guest House** in Ghana. Features live room availability calendars, transparent rates in Ghana Cedis (GH₵ 100 for Standard Haven & GH₵ 170 for Deluxe Executive Suite), Mobile Money (MoMo) integration, Paystack online card checkout, and a password-protected staff admin portal.

---

## 🚀 Quick Start (Local Code Editor)

To run the application locally in any code editor (VS Code, Cursor, WebStorm, etc.):

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

To test the production build locally:

```bash
npm run build
npm run preview
```

---

## 🌐 Zero-Blank-Screen GitHub Pages Deployment

This repository is pre-configured with multiple fail-safes to ensure it displays smoothly on **GitHub Pages**, **Netlify**, **Vercel**, or any static host without blank screens:

### Method 1: Automated GitHub Actions (Recommended)
1. Push your repository to GitHub.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish the site on every push to `main` or `master`.

### Method 2: Deploy from `/docs` Folder
1. Run `npm run build:docs` (pre-built in the repository).
2. In your GitHub repository, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
4. Set the branch to `main` (or `master`) and select the `/docs` folder.
5. Click **Save**. Your site will be live within a minute.

---

## 🛡️ Blank Screen Prevention Built-in

1. **Relative Asset Base (`base: './'`)**: Resolves all scripts and stylesheets relative to the deployment root, ensuring seamless hosting under repository subpaths like `https://<username>.github.io/<repository-name>/`.
2. **Trailing-Slash Normalizer**: Guarantees directory paths resolve assets to the correct repository directory, avoiding missing asset 404s.
3. **SPA 404 Fallback (`public/404.html`)**: Rewrites sub-routes and deep links back to `index.html` on GitHub Pages without 404 errors.
4. **Jekyll Bypass (`public/.nojekyll`)**: Prevents GitHub Pages from running Jekyll, ensuring all Vite build assets are served directly.
5. **Initial Loading Skeleton & Error Boundary**: Prevents blank flashes while scripts load and provides 1-click cache reset if needed.

---

## 🔐 Staff Admin Portal

- **Header & Footer Links**: Click the **Admin** button in the header or footer.
- **Default Master Password**: `Admin-iddico123`
- Inspect, filter, search, print receipts, and export all online guest bookings directly to CSV.

---

## 📞 Reception & Room Desk Contacts

- **Central Desk Hotline & MoMo**: `+233 24 880 5934`
- **WhatsApp Front Desk**: `https://wa.me/233248805934`
- **The Standard Haven**: Room 101 (`Ext 101`) · `standard@iddicogh.com`
- **The Deluxe Executive Suite**: Room 201 (`Ext 201`) · `executive@iddicogh.com`

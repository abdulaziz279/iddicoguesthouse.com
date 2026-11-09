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

This repository is pre-configured with multiple fail-safes so that **any deployment option on GitHub Pages works instantly without remaining stuck on the loading screen**:

### Option 1: Default Root Deployment ("Deploy from a branch -> main -> / (root)")
1. Push your repository to GitHub.
2. In your repository on GitHub, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, keep the default: **Deploy from a branch**.
4. Select Branch **main** (or **master**) and folder **/ (root)**.
5. Click **Save**. The root `index.html` automatically detects static GitHub Pages hosting, loads `./assets/index.js` and `./assets/index.css`, and immediately renders the full interactive application without being stuck on the loader.

### Option 2: Deploy from `/docs` Folder
1. In your GitHub repository, go to **Settings** → **Pages**.
2. Select **Deploy from a branch** → Branch **main** → folder **/docs**.
3. Click **Save**. The pre-bundled `/docs` folder will serve the app directly.

### Option 3: Automated GitHub Actions CI/CD
1. In **Settings** → **Pages**, switch **Source** to **GitHub Actions**.
2. The included `.github/workflows/deploy.yml` workflow will automatically build and publish clean production bundles on every commit.

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

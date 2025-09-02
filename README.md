# Online Cake — User Website

An Angular single-page application for browsing cakes, managing carts & wishlists, and placing orders against the Online Cake API (NestJS + MongoDB).

> Live demos (same stack):
> - **User Website:** https://cake-web.aarivs.com
> - **Admin Dashboard:** https://cake-dashboard.aarivs.com
> - **API Swagger:** https://cake-api.aarivs.com/swagger
> *(Demos are referenced from the API repo.)*

---

## ✨ Features

- Browse by **Category**, **Flavour**, **Occasion**
- **Product search** with filters & sort
- **Product detail** pages with images & descriptions
- **Cart & guest cart** (auto-merge into user account after login)
- **Checkout** with **COD** and **Stripe (test mode)**
- **Coupons/Deals** application at checkout
- **Wishlist** management
- **Addresses** (add/edit/remove; set default)
- Static pages: **About, Contact, Privacy, Terms**
- **i18n** support (multi-language ready)
- Mobile-friendly responsive UI

> Exact feature availability depends on the current branch; see issues and commits for progress.

---

## 🧱 Tech Stack

- **Angular** (SPA, Router, HttpClient)
- **TypeScript**, **SCSS**
---

## 🔌 API

This app consumes the **Online Cake API (NestJS + MongoDB)**.
API repository: [online-cake--api-nestjs-mongodb-rest](https://github.com/nitishk1316/online-cake--api-nestjs-mongodb-rest)

Typical local API URL: `http://localhost:3000`
Demo Swagger: `https://cake-api.aarivs.com/swagger`

---

## 🚀 Getting Started

### 1) Prerequisites
- **Node.js LTS** (v16+ recommended)
- **npm** (bundled with Node)
- **Angular CLI** (optional, for direct `ng` commands):
  ```bash
  npm i -g @angular/cli
  ```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure environments

Create/adjust files under `src/environments/`:

`src/environments/environment.ts`
```ts
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000',
	MAP_KEY: '',
	STRIPE_PUBLISHER_KEY: ''
};
```

`src/environments/environment.prod.ts`
```ts
export const environment = {
  production: true,
  API_URL: 'http://localhost:3000',
	MAP_KEY: '',
	STRIPE_PUBLISHER_KEY: ''
};
```

> Make sure CORS is enabled on the API for your frontend origins.

### 4) Run the app (dev)
```bash
# with npm script (if present)
npm run start

# or via Angular CLI
ng serve --open
```
The app will open at `http://localhost:4200/`.

---

## 📦 Production Build & Deploy

### Build
```bash
# Angular CLI
ng build --configuration production
# or
npm run build
```
Output goes to `dist/…` and can be served as static files.

---

## 🔑 Authentication

- **Register / Login** against the API auth endpoints
- Guest cart merges into the user’s server cart after login
- Tokens are stored client-side (e.g., localStorage); ensure secure handling in production

---

## 💳 Payments

- **Stripe (test mode)** supported (if enabled)
- **Cash on Delivery** as fallback
- For testing, you can use `4242 4242 4242 4242` with any future expiry/CVC

---

## 🧪 Scripts

```bash
# Dev server
ng serve

# Lint (if configured)
ng lint

# Unit tests
ng test

# e2e tests (if configured)
ng e2e
```

---

## 🛡️ Security Notes

- Use **HTTPS** in production
- Scope cookies/localStorage carefully for tokens
- Keep API **CORS** origins strict
- Avoid exposing internal/admin fields in UI

---

## 📄 License

MIT — feel free to use and adapt.

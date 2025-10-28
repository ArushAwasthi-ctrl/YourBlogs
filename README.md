# YourBlogs

Built and shipped: a pragmatic, client-first blog platform using React + Appwrite. Focus: developer experience, simple BaaS primitives, predictable production behaviour.

## TL;DR
React 18 + Vite, React Router v6, Redux Toolkit (auth slice), react-hook-form + TinyMCE, Tailwind CSS. Appwrite for Auth, Databases, Storage. Client-only architecture with minimal server-side logic; recommend server-side sanitization via Appwrite Functions before production.

## Live demo
Add your demo URL here (Vercel/Netlify)

## Features
- Email/password auth with session hydration.
- Create/read/update/delete posts per user.
- Rich-text editor (TinyMCE) integrated with react-hook-form.
- Image upload + `getFileView` for stable previews on Appwrite free tier.
- Guarded routes, skeleton loaders, optimistic route transitions.
- Deterministic slug pipeline and case-tolerant FeaturedImage handling.

## Architecture
Client-only app that treats Appwrite as the backend: Auth, DB, Storage. Thin data-access layer in `src/Appwrite/*.js`. Routes are nested via `createBrowserRouter` + `<Outlet/>`.

## Quickstart (local)
1. Clone
```bash
git clone https://github.com/ArushAwasthi-ctrl/YourBlogs.git
cd YourBlogs

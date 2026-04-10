# RoxFit 💗
**Nigeria's Premium Women's Fitness Platform**

---

## 📁 File Structure
```
roxfit/
├── index.html          ← Homepage
├── programs.html       ← All programs (filterable)
├── program-detail.html ← Program detail page
├── ebooks.html         ← Ebook store
├── about.html          ← About / Founder story
├── contact.html        ← Contact form
├── dashboard.html      ← User dashboard (post-login)
├── vercel.json         ← Vercel config (clean URLs)
├── css/
│   └── style.css       ← All styles + design tokens
└── js/
    ├── layout.js       ← Nav, footer, auth modal, quiz modal (injected into every page)
    └── main.js         ← All interactivity: nav scroll, slider, quiz, forms, dashboard
```

---

## 🚀 Deploy to Vercel (3 steps)

1. **Push to GitHub**
   - Create a new GitHub repo (e.g. `roxfit`)
   - Upload all files maintaining the folder structure above
   - Commit and push

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) → New Project
   - Import your GitHub repo
   - Framework Preset: **Other** (this is plain HTML/CSS/JS)
   - Root Directory: `/` (leave default)
   - Click **Deploy**

3. **Done!**
   - Vercel auto-deploys on every GitHub push
   - Add a custom domain in Vercel → Settings → Domains

---

## 🎨 Design Tokens (CSS Variables)
All colours and styles are in `css/style.css` under `:root {}`.  
Change `--rose-deep` to update the brand accent across the whole site.

---

## 💳 Next Steps for Production
- **Payments**: Integrate [Paystack](https://paystack.com) or [Flutterwave](https://flutterwave.com) — replace the `openAuthModal('signup')` buttons on purchase CTAs with Paystack inline handler
- **Auth**: Replace localStorage demo auth with Firebase Auth or Supabase
- **Email**: Point the contact form action to Formspree (replace `id="contactForm"` submit handler in `main.js`)
- **Ebook downloads**: Store PDFs in Cloudinary or Firebase Storage; generate signed download URLs post-purchase

---

Built with 💗 for women who hustle.

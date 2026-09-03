# hamzafareed01.github.io

Source for my personal site — **[hamzafareed01.github.io](https://hamzafareed01.github.io/)**

I'm Hamza Syed, a software engineer in Chicago. I build production web
applications in React and TypeScript and the CI/CD pipelines that ship them.
Microsoft-certified in Azure development, administration, and DevOps
(AZ-204, AZ-104, AZ-400).

[LinkedIn](https://www.linkedin.com/in/hamzafareed/) · [Email](mailto:hamzafareed8k@gmail.com)

---

## About this site

A single-page portfolio covering my experience, skills, and projects. Built
from scratch rather than from a template, with a space/terminal visual theme:
an animated starfield, a canvas-drawn HUD element, and a boot-sequence
preloader styled as a shell session.

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Animation | Motion (Framer Motion) |
| Components | Radix primitives |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

## Implementation notes

A few things worth pointing out if you're reading the source:

- **Reduced motion is respected throughout.** `App.tsx` reads
  `prefers-reduced-motion` and passes it down; the preloader skips its
  animation, the starfield stops, and section transitions resolve immediately.
- **The preloader is a real state machine,** not a fixed-duration splash — it
  types each line character by character and tracks progress independently, so
  it can be skipped at any point without leaving the app in a half-mounted state.
- **Projects support a locked state** for work whose source can't be published,
  so private projects can still be documented with their architecture and
  problem/approach writeups instead of being omitted.
- **The contact form posts directly to Web3Forms,** which keeps the site fully
  static with no backend to run or secure.

## Running locally

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:3000`).

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs
`npm ci`, builds with Vite, and publishes `dist/` to GitHub Pages. No manual
deploy step. `dist/` and `node_modules/` are intentionally untracked — the
workflow builds them fresh on every run so a stale local build can't ship.

## Structure

```
src/
├── App.tsx              # layout, section order, reduced-motion detection
├── components/
│   ├── PreLoader.tsx    # terminal boot sequence
│   ├── Hero.tsx         # landing section
│   ├── Experience.tsx   # roles, expandable detail
│   ├── Projects.tsx     # project cards + case-study modal
│   ├── Skills.tsx
│   ├── Certifications.tsx
│   ├── Education.tsx
│   ├── Contact.tsx      # Web3Forms submission
│   ├── StarfieldBackground.tsx
│   ├── BiometricEyeHUD.tsx
│   └── ui/              # Radix-based primitives
└── styles/
```

## License

Code is free to reference. The written content, résumé, and personal
imagery are mine — please don't reuse those directly.

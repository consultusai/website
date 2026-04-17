# Consultus AI — Website

Marketing site for [consultusai.com](https://consultusai.com). Static HTML/CSS/JS, hosted on GitHub Pages.

## Structure
- `index.html` — Home
- `capabilities.html` — Capabilities deep-dive
- `case-studies.html` — Engagements
- `styles.css` — All styling
- `script.js` — Terminal typewriter + scroll reveal
- `CNAME` — Tells GitHub Pages the custom domain is consultusai.com
- `.nojekyll` — Disables Jekyll so files starting with `_` aren't filtered

## Local preview
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy
Push to `main`. GitHub Pages serves `/` from the branch root.

# max-raed.github.io — Portfolio

Personal academic portfolio. One-page scroll with subpages for papers and projects.

---

## Before going live — 5 things to do

### 1. Set up the contact form (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a **free** account
2. Click **New Form**, enter your email `hci.uniulm@gmail.com`
3. Copy your form ID (looks like `xpzgkwqr`)
4. Open `index.html` and find the line:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace `YOUR_FORM_ID` with your actual ID

### 2. Add your CV

Drop your CV file in the root folder and name it `cv.pdf`. The Download CV button in the nav will work automatically.

### 3. Fill in your social links

Open `index.html` and search for `href="#"` in the socials strip section (around line 65–90). Replace each `#` with your real URLs:
- LinkedIn profile URL
- Google Scholar profile URL
- Twitter / X profile URL
- ResearchGate profile URL

### 4. Add your photo

1. Put your photo in `assets/images/photo.jpg` (square crop recommended, min 600×600 px)
2. Open `index.html` and find the hero photo section (search for `hero-photo-placeholder`)
3. Replace the placeholder div with:
   ```html
   <img src="assets/images/photo.jpg" alt="Max Raed" class="hero-photo" />
   ```

### 5. Deploy to GitHub Pages

1. Push everything to your `main` branch on GitHub
2. Go to your repo on GitHub → **Settings** → **Pages**
3. Under *Branch*, select `main` and folder `/root`, then click **Save**
4. Your site will be live at `https://max-raed.github.io` within a minute or two

---

## How to add a new paper or project

**Step 1 — Create the subpage**

Copy the template file and rename it:
```
works/template.html  →  works/your-paper-slug.html
```
Open your new file and fill in every `[PLACEHOLDER]` field:
- `[PAPER / PROJECT TITLE]`
- `[VENUE — e.g. ACM CHI 2024]`
- `[YEAR]`
- `[Author 1], [Author 2]` etc.
- Abstract, contributions, results, BibTeX

Replace the image placeholders with real `<img>` tags when you have your teaser figure ready.

**Step 2 — Add a card on the main page**

Open `index.html` and find the Works section (search for `works-grid`).
Copy one of the existing `<article class="work-card">` blocks and update:

| Field | What to change |
|---|---|
| `href="works/..."` | path to your new file |
| `work-tag` | venue and year, e.g. `ACM CHI 2025` |
| `work-title` | your paper title |
| `work-subtitle` | author list |
| `work-excerpt` | one-sentence summary |
| `work-img-placeholder` | swap for `<img>` when you have the teaser |

**Step 3 — Commit and push**

```bash
git add .
git commit -m "add paper: your paper title"
git push
```

GitHub Pages rebuilds automatically — your new paper will appear live within seconds.

---

## File structure

```
index.html                ← main one-page site
cv.pdf                    ← drop your CV here
assets/
  css/
    style.css             ← all global styles (edit colors here)
    work-page.css         ← styles for paper subpages
  js/
    main.js               ← interactions (tabs, counters, form)
  images/
    photo.jpg             ← your profile photo (add this)
works/
  template.html           ← copy this for every new paper
  example-paper.html      ← example filled-in subpage
```

## Customisation tips

- **Accent color** — change `--accent: #FF8000` in `assets/css/style.css` line 9
- **Your name / tagline** — edit the hero section in `index.html`
- **Stats numbers** — update `data-count="127"` values in the About section
- **Languages** — add or remove `<span class="badge ...">` elements in the languages row
- **Experience rows** — copy an `exp-item` div and fill in year, place, and description

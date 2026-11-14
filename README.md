# Abandoned but not Forgotten

An interactive museum of NASA hardware left behind on the Moon and Mars, built for the
**NASA Space Apps Challenge 2026** storytelling challenge:
*“NASA’s Discarded Equipment: Storytelling.”*

The site is a single static page with **no build step, no frameworks and no external
requests**. Open `index.html` and it works — including offline.

---

## Arabic summary / ملخص بالعربي

متحف تفاعلي للأجهزة اللي سابتها ناسا على القمر والمريخ، معمول لتحدي
**NASA Space Apps 2026 – السرد القصصي**. الصفحة عربي/إنجليزي بزر تبديل،
شغالة أوفلاين، وكل البيانات والصور من مصادر ناسا المذكورة في صفحة التحدي.

---

## Run it

1. Download or clone the folder.
2. Double-click `index.html`.

No server, no install, no internet connection required.

> Optional: if your browser blocks anything when opening a local file, serve the folder:
> `python -m http.server 8000` then visit `http://localhost:8000`.

---

## Project structure

```
Default Project/
├── index.html          All page markup
├── styles.css          All styling + responsive + RTL rules
├── script.js           Content data + all interaction logic
├── images/             NASA photographs, stored locally
└── README.md
```

Everything is separated exactly as requested: one HTML file, one CSS file, one JS file,
and an images folder.

> If you prefer the conventional layout, `styles.css` and `script.js` can be moved into
> `css/` and `js/` folders — just update the two references in `index.html`.

---

## What is in the collection

**13 artifacts, Moon and Mars only.** The list follows the equipment named in the
challenge’s Resources tab — nothing was added from outside it.

### Moon (4)

| Artifact | Site | Year |
|---|---|---|
| Apollo Lunar Modules (descent stages) | Tranquility Base, Sea of Tranquility | 1969–1972 |
| Lunar Roving Vehicles (LRV‑1, ‑2, ‑3) | Hadley–Apennine (Apollo 15) | 1971–1972 |
| ALSEP science packages | Apollo 12 site, Oceanus Procellarum | 1969–1972 |
| Surveyor 3 | Oceanus Procellarum | 1967 |

### Mars (9)

| Artifact | Site | Year |
|---|---|---|
| Viking 1 Lander | Chryse Planitia | 1976 |
| Viking 2 Lander | Utopia Planitia | 1976 |
| Mars Pathfinder Lander | Ares Vallis | 1997 |
| Sojourner rover | Ares Vallis | 1997 |
| Spirit | Gusev Crater | 2004 |
| Opportunity | Meridiani Planum | 2004 |
| Phoenix | Vastitas Borealis | 2008 |
| InSight | Elysium Planitia | 2018 |
| Ingenuity | Jezero Crater, Airfield Beta | 2021 |

---

## Features

- **Bilingual interface** — English / Arabic toggle, full RTL layout, choice saved in
  `localStorage`. Every artifact description is written in both languages.
- **Collection atlas** — filter by world, live search, story-first cards.
- **Two interactive maps** — an orthographic Moon map and an equirectangular Mars map.
  Every marker is keyboard-focusable and opens the artifact’s story.
- **Timeline** — grouped by decade, from Surveyor 3 (1967) to Ingenuity’s last flight (2024).
- **Four short stories** — the laser mirror, Opportunity’s last message, Ingenuity, and
  the Lunar Module descent stage.
- **Detail dialog** — what it is, why it went, what it found, where it is now, a fast fact,
  and a direct source link, with previous/next browsing.
- **About section** — challenge fit, audience, accuracy notes and full source list.

## Audience

Written for **ages 8–15** and for casual adult visitors: short sentences, technical words
explained in context, and a narrative-first structure.

## Accessibility

- Semantic landmarks, skip link and visible focus rings.
- Full keyboard operation: cards, map markers, timeline entries, tabs and the dialog.
- `aria-live` result counts, `aria-pressed` filters, labelled dialog.
- Respects `prefers-reduced-motion` (the starfield and reveal animations stop).
- No audio and no colour-only meaning; readable contrast in both themes of text.

## Accuracy notes

- Dates, sites and coordinates were checked against the NSSDCA spacecraft records and the
  NASA mission pages listed below.
- The Moon and Mars maps are **illustrations, not scale maps**. Marker positions are
  approximate; two markers on the Moon (Apollo 12 / Surveyor 3) are nudged apart so both
  remain clickable.
- The quote *“My battery is low and it’s getting dark”* attributed to Opportunity is a
  **paraphrase by journalist Jacob Margolis (2019)**, not a transmission. This is stated
  explicitly in the About section and in the dialog.
- ALSEP’s powered instruments were switched off in 1977; its passive retroreflectors still
  work and are still used for lunar laser ranging.

---

## Sources

Data and mission information:

1. [NSSDCA — Apollo 11 Lunar Module](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C)
2. [NSSDCA — Lunar Roving Vehicle](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C)
3. [NSSDCA — ALSEP](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C)
4. [NASA — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/)
5. [NASA — Mars Pathfinder & Sojourner](https://science.nasa.gov/mission/mars-pathfinder/)
6. [NASA — Spirit & Opportunity](https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/)
7. [NASA — Viking 1 & 2](https://science.nasa.gov/mission/viking-1/)
8. [NASA — Phoenix & InSight](https://science.nasa.gov/mission/insight/)
9. [NASA — Ingenuity Mars Helicopter](https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/)
10. [NASA Image and Video Library](https://images.nasa.gov/)

Challenge brief:
[NASA’s Discarded Equipment: Storytelling](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/)

## Image credits

All photographs are courtesy **NASA / JPL‑Caltech** and are in the public domain.
They were downloaded from NASA’s image library and stored locally in `images/`.

| File | NASA image ID | Subject |
|---|---|---|
| `moon-apollo-lm.jpg` | KSC-as11-40-5964 | Apollo 11 — Lunar Module and surface |
| `moon-lrv.jpg` | as15-86-11603 | Apollo 15 LRV |
| `moon-alsep.jpg` | as12-47-6918 | Apollo 12 ALSEP |
| `moon-surveyor.jpg` | as12-48-7121 | Surveyor 3 in its crater |
| `mars-viking1.jpg` | PIA00563 | First colour image, Viking 1 |
| `mars-viking2.jpg` | PIA00568 | First colour image, Viking 2 |
| `mars-pathfinder.jpg` | PIA01550 | Pathfinder on test and on Mars |
| `mars-sojourner.jpg` | PIA01551 | Sojourner deployed |
| `mars-spirit.jpg` | PIA05040 | Spirit |
| `mars-opportunity.jpg` | PIA20285 | Opportunity at “Potts” |
| `mars-phoenix.jpg` | PIA10701 | Phoenix on the surface |
| `mars-insight.jpg` | PIA22829 | InSight’s first image |
| `mars-ingenuity.jpg` | PIA24648 | Ingenuity after its fifth flight |
| `hero-moon.jpg` | as11-44-6550 | Moon limb and Earth on the horizon (Apollo 11) |
| `hero-mars.jpg` | PIA01551 | Pathfinder and Sojourner on Mars |

If you reuse the project, keep the NASA credit visible. NASA does not endorse this
project, and this is not an official NASA product.

---

## Possible next steps

- Add a guided “tour” mode that walks through the artifacts in order.
- Offer a printable classroom worksheet generated from the same data.
- Add narration (recorded or browser speech synthesis) for younger readers.
- Extend the map with a true scale lunar mosaic if a licensed basemap is available.

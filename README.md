# Moura Creations website

Website for Moura Creations, handmade silk thread, kundan, mirror and coin bangles from Saidabad, Hyderabad.

Live at: https://sambaraju1003.github.io/Mouracreations.github.io/

Plain HTML, CSS and JavaScript. No build step: GitHub Pages serves the files as they are.

## Files

```
index.html        the whole site (one page)
css/style.css     design, light and dark colours, phone layout
js/main.js        menu, collection filter, photo viewer, size finder, WhatsApp/email links
images/           product photos (720 × 900, cropped and compressed)
favicon.svg       browser tab icon
404.html          "page not found" page
```

## Common changes

**Add your WhatsApp number**: open `js/main.js` and fill in the first setting:

```js
const WHATSAPP_NUMBER = "919876543210";   // 91 + your 10-digit number, digits only
```

Every "Order on WhatsApp" and "Ask about this" button then opens WhatsApp with a message already typed. Until a number is set, those buttons use email instead.

Until a WhatsApp number is set, the "Order" buttons open an Instagram direct message to `@moura.127` instead (setting `INSTAGRAM` in the same file).

**Add a new design:**
1. Crop the photo to portrait 4:5 (for example 720 × 900 px), keep it under about 150 KB, and put it in `images/`.
2. In `index.html`, copy one `<li class="product" …>` block in the collection, then change the image file name, the description of the photo (`alt`), the name, the description and `data-ask`.
3. Set `data-cat` to `glass`, `silk`, `kundan` or `coin` so the filter buttons find it, and give the `<li>` an `id` (the image name) so its Share link works.
4. Optional: make `.webp` copies (720 wide, and 360 wide named `-360.webp`) for faster phones, or remove the `<source>` line to use only the JPG.
5. To mark it new, add `<span class="new">New</span>` inside its tag.

**Change text**: edit `index.html` directly. Colours and fonts are at the top of `css/style.css`.

## Publish on GitHub Pages

1. In the repository go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
3. Wait a minute or two, then open the address shown on that page.

To have the site at `https://sambaraju1003.github.io/` instead, rename the repository to `sambaraju1003.github.io`. For your own domain (for example `mouracreations.in`), add it under **Settings → Pages → Custom domain**.

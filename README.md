# PPD Awareness Campaign Website

**School Project 2026 | Paranoid Personality Disorder Awareness**

---

## Files

| File | Description |
|------|-------------|
| `index.html` | Main HTML structure |
| `style.css` | All styles, animations, and color variables |
| `main.js` | Intro eye animation, cursor, scroll reveal, canvas eyes |

---

## How to Use

1. **Open locally:** Just double-click `index.html` in any browser — no server needed.
2. **Add your video:** Replace the video placeholder section in `index.html` with a `<video>` or YouTube/Vimeo embed.
3. **Update contact email:** Search for `ppd.awareness@school.edu` in `index.html` and replace with your real email.

---

## Adding the Campaign Video

When your video is ready, replace this block in `index.html`:

```html
<div class="video-frame reveal d3">
  ...placeholder content...
</div>
```

With a YouTube embed:

```html
<div class="video-frame reveal d3" style="padding:0;border:1px solid rgba(192,24,58,0.4);">
  <iframe width="100%" height="100%"
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    frameborder="0" allowfullscreen>
  </iframe>
</div>
```

---

## Color Palette

| Name | Hex |
|------|-----|
| Background | `#07060e` |
| Red | `#c0183a` |
| Red Bright | `#e8193f` |
| Maroon | `#7a0f26` |
| Purple | `#6b4fa0` |
| Purple Light | `#9b7fcb` |
| Gold | `#f5c842` |
| White | `#f0eaf5` |

---

## Fonts (via Google Fonts)
- **Cinzel Decorative** — display/hero titles
- **Cinzel** — section labels, navigation
- **Raleway** — body text, quotes

*Requires internet connection to load fonts.*

---

## Campaign Hashtags
`#SeeTheFear` `#PPDAwareness`

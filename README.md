# hackerlab 🖥️

A pentesting/red-teaming blog built with [Astro](https://astro.build), featuring expressive code highlighting, callouts, subpost navigation, and a full-featured blog engine.

## Quick start

```bash
# Install dependencies (recommended: pnpm)
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Customization

### Personal info

1. **Your name & bio** → `src/pages/index.astro` and `src/pages/about.astro`
2. **Avatar photo** → drop `avatar.jpg` in `public/images/`, then replace the placeholder `<div>` in index/about with `<img src="/images/avatar.jpg" ...>`
3. **Social links** → `src/pages/about.astro` → `about-links` section
4. **Projects** → `src/data/projects.ts`

### Colors

All colors are CSS custom properties in `src/styles/global.css` under `:root`. The main accent is `--accent: #00d4aa` (teal).

---

## Writing posts

### Single-file post

Create `src/content/blog/my-post.mdx`:

```yaml
---
title: "My Post Title"
description: "Brief description shown in cards."
date: 2025-01-15
tags: ["web", "ctf"]
image: "/images/my-post-cover.png"  # optional
---
```

### Post with subpages (series/sections)

Create a folder: `src/content/blog/my-series/`

```
src/content/blog/my-series/
  index.mdx      ← shown when clicking the post card
  part-1.mdx     ← subpost
  part-2.mdx     ← subpost
```

All files in the folder share the same tags/metadata in `index.mdx`. The right sidebar auto-populates with navigation between subposts.

### Callouts

```mdx
import Callout from '../../components/Callout.astro';

<Callout type="note" title="Custom Title">
Content goes here. **Markdown works inside callouts.**

```python
print("code works too!")
```
</Callout>

<!-- Collapsed by default -->
<Callout type="warning" collapsed={true}>
This starts collapsed.
</Callout>
```

**Available types:** `note` `tip` `warning` `danger` `info` `success` `question` `abstract` `bug` `example` `quote`

### Badges

```mdx
import Badge from '../../components/Badge.astro';

<Badge tag="rust" />           <!-- auto-detects icon + color -->
<Badge tag="web" />
<Badge tag="custom" color="purple" icon="flag" />
```

**Special badges** (auto icon+color): `rust`, `python`, `web`, `pwn`, `ctf`, `htb`, `malware`, `red-team`, `pentest`, `crypto`, `osint`, `network`, `linux`, `windows`, `active-directory`

To add more, edit the `specialBadges` map in `src/components/Badge.astro`.

### Images

```markdown
![Alt text](./assets/img.png)
![Small image](./assets/img.png "sm")
![Medium image](./assets/img.png "md")
![Centered](./assets/img.png "center md")
```

Image size helpers: `sm` (320px), `md` (560px), `lg` (800px), `full` (100%), `center`

Store images either in:
- `public/images/` → reference as `/images/filename.png`
- Alongside the post: `src/content/blog/my-post/assets/img.png` → reference as `./assets/img.png`

### Expressive Code features

All expressive-code features are available out of the box:

````md
```python title="main.py"
print("hello world")
```

```bash ins={2} del={1}
echo "old command"
echo "new command"
```

```python {3-5}
# Lines 3-5 are highlighted
x = 1
y = 2
z = 3  # highlighted
```
````

---

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to **Settings → Pages → Source: GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` handles the rest

### Other platforms (Netlify, Vercel, Cloudflare Pages)

```bash
pnpm build
# Upload the `dist/` folder
```

For Netlify: set build command to `pnpm build`, publish dir to `dist`.

# Fales static website

Open `index.html` directly, or run `npm run dev` (Python 3 required) to preview at http://127.0.0.1:3000.

No installation or build is required. Keep `index.html`, `styles.css`, `site.js`, `favicon.svg`, `data/` and `.nojekyll` together.

## GitHub Pages

Upload this folder to the repository root, including `.nojekyll`. In Settings → Pages select Deploy from a branch, your branch, and / (root).

All asset URLs are relative and work under a repository path or a custom domain. The original appearance, charts and controls are preserved. Benchmark values refresh from `data/benchmarks.json` when served over HTTP; the embedded values also work offline.

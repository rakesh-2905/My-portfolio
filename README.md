# NodeJS Form Project

A minimal Node.js + Express project that serves a static portfolio and a contact form.

## What is included
- `public/index.html` — your uploaded portfolio page. (kept as-is).  fileciteturn0file1
- `public/style.css` — your uploaded stylesheet.  fileciteturn0file0
- `public/form.html` — a new contact form that posts to `/submit`.
- `server.js` — Express server that receives form submissions and stores them in `submissions.json`.
- `package.json`, `.gitignore`, `README.md`.

## Run locally
```bash
npm install
npm start
# then open http://localhost:3000/form.html
```

## Notes
- Submissions are saved to `submissions.json`. This file is gitignored so it won't be committed.
- To push to GitHub: create a new repository and push the project folder, or use GitHub Desktop/CLI to upload.

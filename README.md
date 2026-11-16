# Shubham Bhat — Portfolio

Next.js static portfolio for GitHub Pages.

## Local development

`npm ci`
`npm run dev`

## Publish

Create a public repository named `portfolio` under Shubhambhat06, push this project to its `main` branch, and select **Settings → Pages → Build and deployment → GitHub Actions**. The workflow builds and deploys on every push to main. Expected URL: https://shubhambhat06.github.io/portfolio/

Project text is in `data/content.ts`. The contact form opens the visitor's email client by default. To enable direct Formspree delivery, set repository variable `NEXT_PUBLIC_FORMSPREE_ID` and add it to the workflow build environment.

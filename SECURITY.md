# Security and production deployment

This repository contains a static React/Vite site. It has no server-side form handler, database, authentication, cookies, uploads or application API.

## Clean production build

Use a clean dependency tree and publish only `dist`:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run check:security
npm run check:seo
npm audit
npm audit --omit=dev
```

Do not publish the repository root, `.git`, `node_modules`, local logs, `.env` files or audit artifacts. Vite source maps are explicitly disabled. Only variables prefixed with `VITE_` are exposed to browser code; never place secrets in them.

## Versioned security headers

[`public/_headers`](public/_headers) is copied into `dist` and is directly supported by Netlify and Cloudflare Pages. Other providers must reproduce the same values in their own response-header configuration:

- Vercel: map the entries to the `headers` property in `vercel.json`.
- Nginx: use `add_header <name> "<value>" always;` on all HTML responses.
- Apache: use `Header always set <name> "<value>"` with `mod_headers` enabled.
- Cloudflare using a different deployment mode: create an equivalent Transform Rule or Worker response policy.

After deployment, verify the real HTTP responses rather than assuming the host consumed `_headers`.

## Content Security Policy

The enforced CSP allows executable scripts only from the same origin. `unsafe-eval` and inline JavaScript are not allowed. Google Maps frames are restricted to `https://maps.google.com` and its embed redirect at `https://www.google.com`; fonts, styles and images are self-hosted.

`style-src 'unsafe-inline'` is limited to styles because GSAP applies animation values through element style attributes. Removing it requires refactoring those runtime animations. Before tightening or extending the policy, deploy the candidate as `Content-Security-Policy-Report-Only` in a staging environment and review violations.

## HSTS

The policy uses `Strict-Transport-Security: max-age=31536000` without `includeSubDomains` or `preload`. Keep it only when production HTTPS and certificate renewal are confirmed. Add `includeSubDomains` or submit the domain for preload only after every subdomain has been audited for permanent HTTPS support.

## Contact form and future integrations

The current form only prepares a WhatsApp message or local email and does not store data. If it is later connected to a backend or CRM, add server-side validation, payload limits, rate limiting, a honeypot, adaptive bot protection and privacy-compliant logging. Browser validation alone is not a security boundary.

## Maintenance

- Use `npm ci` in CI/CD and keep `package-lock.json` reviewed and versioned.
- Run `npm audit --omit=dev` for every release and review automated dependency updates.
- Run `npm run check:security` after each production build.
- Run `npm run security:images` for newly added public images before committing them.
- Review CSP whenever adding analytics, embeds, APIs, fonts or other third-party resources.
- Confirm that unknown routes return a real HTTP 404 status at the hosting layer.

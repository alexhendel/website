# Development and deployment

## Local setup

Requires [mise](https://mise.jdx.dev). It installs the Node and pnpm versions from `mise.toml`, the same ones CI uses.

```sh
git clone git@github.com:alexhendel/<repo>.git && cd <repo>
mise trust && mise install
pnpm install
pnpm dev                 # dev server with hot reload: http://localhost:4321
```

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Dev server |
| `pnpm build` | Type check (`astro check`), then static build into `dist/` |
| `pnpm preview` | Serve `dist/` locally to test the real build |
| `pnpm exec astro preview stop` | Stop the preview server (it keeps running in the background) |

**Versions are pinned in three places.** When upgrading pnpm or Node, change all of them together:
- `mise.toml`
- `packageManager` in `package.json`
- `node-version` / `package-manager` in `.github/workflows/deploy.yml`

## How a deploy works

`.github/workflows/deploy.yml` runs on every push to `main` and on manual start:

1. **build:** checkout, then `withastro/action` installs pnpm + Node 24, runs `pnpm install` and `pnpm build`, and uploads `dist/` as the Pages artifact.
2. **deploy:** `actions/deploy-pages` publishes the artifact.

A failing type check or invalid content stops the build, and the live site stays as it was.

## First-time setup

1. **Create the repo** on GitHub and push:
   ```sh
   git remote add origin git@github.com:alexhendel/<repo>.git
   git push -u origin main
   ```
2. **Enable Pages:** repo → Settings → Pages → Source: **GitHub Actions**.
3. **Custom domain:** in the same page enter `alex-hendel.de`. `public/CNAME` already contains it, so it survives every deploy.
4. **DNS** at the domain registrar:

   | Type | Name | Value |
   |------|------|-------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `alexhendel.github.io` |

5. **HTTPS:** once the DNS check is green, tick **Enforce HTTPS** (the certificate can take up to an hour).
6. Recommended: **verify the domain** for your GitHub account (Settings → Pages → Add a verified domain) so nobody else can claim it on GitHub Pages.

## Examples

**Normal content change:**

```sh
# edit src/content/site.json
pnpm build                      # catches schema errors locally
git commit -am "Update services"
git push                        # deploys
```

**Re-deploy without a change** (e.g. after fixing Pages settings): Actions tab → "Deploy to GitHub Pages" → Run workflow. With the GitHub CLI:

```sh
gh workflow run deploy.yml
gh run watch
```

**Check the live site:**

```sh
curl -sI https://alex-hendel.de/ | head -1                # HTTP/2 200
curl -sI https://alex-hendel.de/en/imprint/ | head -1     # HTTP/2 200
curl -sI https://alex-hendel.de/does-not-exist | head -1  # HTTP/2 404 (served from 404.html)
```

**Roll back** a bad change:

```sh
git revert <commit>
git push
```

## Troubleshooting

| Symptom | Likely cause |
|---------|--------------|
| Build fails in `astro check` | Type error or invalid content; the log names the file. Run `pnpm build` locally. |
| `astro check does not currently support TypeScript 7` | TypeScript was upgraded; keep `typescript` at `^6`. |
| Deploy job fails with a permissions error | Pages source is not set to "GitHub Actions" (step 2). |
| Domain shows a GitHub 404 | DNS not propagated yet, or the custom domain field in Settings → Pages is empty. |
| Old content after deploy | Browser or CDN cache; GitHub Pages caches for about 10 minutes. |

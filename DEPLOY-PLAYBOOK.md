# 🚀 Deploy Playbook — Next.js → Hostinger VPS via GitHub Actions

A **copy-paste, foolproof** guide to deploy any Next.js project to your Hostinger VPS
with a full CI/CD pipeline (GitHub Actions → SSH → PM2 → nginx → Cloudflare).

This is the exact setup running `zynthovo` today. To ship a **new** project, follow
**Part 2** onward and just change 4 things: **app name, port, app dir, domain**.

---

## 📐 How it works (the whole picture)

```
  You: git push  ──►  GitHub
                        │
                        ▼
              ┌──────────────────────┐
              │  GitHub Actions       │
              │  1) build job (gate)  │  npm install → lint → build
              │  2) deploy job        │  only runs if build passed
              └──────────┬───────────┘
                         │  SSH (appleboy/ssh-action)
                         ▼
        ┌──────────────────────────────────────┐
        │  Hostinger VPS  (187.127.137.245)      │
        │  • git reset --hard origin/main        │
        │  • npm install && npm run build        │
        │  • pm2 startOrReload (port 3005)       │
        └──────────┬─────────────────────────────┘
                   │  reverse proxy
                   ▼
        nginx  (:80/:443)  ──►  127.0.0.1:3005
                   ▲
                   │  DNS + SSL
              Cloudflare  ──►  your-domain.com
```

**Key idea:** the VPS is *deploy-only*. You never edit code there. Every deploy
force-resets the server to match `origin/main`, so the server is always a clean
mirror of GitHub. Secrets live in a gitignored `.env.local` on the server and
survive deploys.

---

## 🧱 Current `zynthovo` reference values

| Thing | Value |
|---|---|
| VPS IP | `187.127.137.245` |
| SSH user | `root` |
| App directory | `/var/www/zynthovo` |
| PM2 app name | `zynthovo` |
| App port | `3005` |
| Repo | `github.com/Tarun8433/Zynthovo` |
| Node version | `20` |
| DNS / proxy | Cloudflare |
| Forms | Web3Forms (client-side) |

> ⚠️ **Each app on the VPS needs its own unique port + app dir + pm2 name + nginx block.**
> Project #2 → port `3006`, `/var/www/<app2>`, pm2 name `<app2>`, its own server block.

---

# PART 1 — One-time VPS setup (do once per server)

You already did this for `zynthovo`. Skip if your VPS is set up; included so you can
rebuild from scratch or onboard a new server.

### 1.1 Install Node 20 + PM2 + nginx + git

```bash
# Node 20 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx

# PM2 globally + start on boot
sudo npm install -g pm2
pm2 startup systemd -u root --hp /root   # run the command it prints
```

### 1.2 Create a GitHub **deploy key** on the VPS (lets the server clone private repos)

```bash
ssh-keygen -t ed25519 -C "vps-deploy" -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub        # copy this
```
Add the **public** key to the repo: **GitHub → repo → Settings → Deploy keys →
Add deploy key** (read-only is fine). Then tell git to use it:

```bash
cat >> ~/.ssh/config <<'EOF'
Host github.com
  IdentityFile ~/.ssh/github_deploy
  IdentitiesOnly yes
EOF
```
> One deploy key per repo. For multiple repos, use `Host github-app2` aliases with
> separate keys, and clone via `git@github-app2:User/Repo.git`.

### 1.3 Create the **SSH key GitHub Actions uses to log into the VPS**

This is different from the deploy key above. GitHub Actions → VPS.

```bash
# On the VPS:
ssh-keygen -t ed25519 -C "gha-deploy" -f ~/.ssh/gha_deploy -N ""
cat ~/.ssh/gha_deploy.pub >> ~/.ssh/authorized_keys   # allow it to log in
chmod 600 ~/.ssh/authorized_keys
# The PRIVATE key (~/.ssh/gha_deploy) goes into the GitHub secret SSH_KEY (Part 4).
```

### 1.4 Firewall (if ufw is on)

```bash
sudo ufw allow 22      # SSH
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw status
```

---

# PART 2 — Per-project setup on the VPS

Replace `<APP>`, `<PORT>`, `<REPO>` for each new project.
Example here uses a 2nd project on port **3006**.

### 2.1 Clone the repo

```bash
sudo mkdir -p /var/www
cd /var/www
git clone git@github.com:Tarun8433/<REPO>.git <APP>
cd /var/www/<APP>
# If the Next app lives in a subfolder (like this repo's zynthovo-next/),
# cd into it and treat THAT as the app dir.
```

### 2.2 Create the env file (gitignored — never committed, survives deploys)

Use a **single-quoted heredoc** so special chars like `!` stay literal:

```bash
cat > .env.local <<'EOF'
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Use-A-Strong-Password-Here
SESSION_SECRET=PASTE_64_HEX_CHARS_HERE
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-web3forms-key
EOF
```
Generate a strong `SESSION_SECRET`:
```bash
openssl rand -hex 32
```
> `SESSION_SECRET` must be ≥16 chars or admin login is disabled.
> Only `NEXT_PUBLIC_*` vars are needed at **build** time; the rest are read at runtime.

### 2.3 Add a PM2 config (`ecosystem.config.js`) — unique name + port

```js
module.exports = {
  apps: [
    {
      name: "<APP>",
      script: "npm",
      args: "start",
      cwd: __dirname,
      env: { NODE_ENV: "production", PORT: <PORT> },  // e.g. 3006
    },
  ],
};
```

### 2.4 First build & start

```bash
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save                 # persist across reboots
pm2 status               # confirm "online"
curl -s localhost:<PORT> | head   # sanity check it responds
```

---

# PART 3 — nginx reverse proxy + SSL

### 3.1 Server block — map domain → app port

```bash
sudo nano /etc/nginx/sites-available/<APP>
```
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:<PORT>;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/<APP> /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 3.2 SSL (HTTPS)

**Option A — Cloudflare proxy (easiest):** in Cloudflare set SSL/TLS mode to
**Full**, turn the orange cloud **ON** for the DNS record. Cloudflare terminates
HTTPS at the edge; origin can stay on :80 behind it.

**Option B — Let's Encrypt on the origin:**
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```
> If using Cloudflare proxy + certbot, set Cloudflare SSL to **Full (strict)**.

---

# PART 4 — Cloudflare DNS

In the Cloudflare dashboard for your domain → **DNS → Records**:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `187.127.137.245` | Proxied (orange) |
| A | `www` | `187.127.137.245` | Proxied (orange) |

Make sure your domain's **nameservers** at the registrar point to the two
Cloudflare nameservers shown in the dashboard. Propagation: minutes to a few hours.

---

# PART 5 — GitHub Actions workflows

Create these two files in the repo (commit + push them).

### 5.1 `.github/workflows/ci.yml` — PR gate (lint + build)

```yaml
name: CI
on:
  pull_request:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: package-lock.json
      - name: Install dependencies
        run: npm install        # NOT npm ci (see gotcha #1)
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: ${{ secrets.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY }}
```

### 5.2 `.github/workflows/deploy.yml` — push to main → build gate → deploy

```yaml
name: Deploy
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: package-lock.json
      - run: npm install
      - run: npm run lint
      - run: npm run build
        env:
          NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: ${{ secrets.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY }}

  deploy:
    needs: build           # deploy ONLY if build passed
    runs-on: ubuntu-latest
    steps:
      - name: Validate required secrets
        run: |
          missing=0
          for s in SSH_HOST SSH_USER SSH_KEY APP_DIR; do
            if [ -z "${!s}" ]; then echo "❌ Missing secret: $s"; missing=1; else echo "✅ $s is set"; fi
          done
          [ "$missing" = "0" ] || { echo "Add the missing secrets in Settings → Secrets and variables → Actions."; exit 1; }
        env:
          SSH_HOST: ${{ secrets.SSH_HOST }}
          SSH_USER: ${{ secrets.SSH_USER }}
          SSH_KEY:  ${{ secrets.SSH_KEY }}
          APP_DIR:  ${{ secrets.APP_DIR }}

      - name: Deploy over SSH (pull, build & restart on the server)
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          port: ${{ secrets.SSH_PORT || '22' }}
          script: |
            set -euo pipefail
            cd "${{ secrets.APP_DIR }}"
            # Hard-reset to remote: npm install mutates package-lock.json on the
            # server, so `git pull --ff-only` would refuse to overwrite it. (gotcha #2)
            git fetch origin
            git reset --hard origin/main
            npm install
            npm run build
            pm2 startOrReload ecosystem.config.js --update-env
            pm2 save
```

---

# PART 6 — GitHub Secrets (the part that bites everyone)

Set in **GitHub → repo → Settings → Secrets and variables → Actions → New repository secret**.
Put the **name in the Name box** and the **value in the Secret box** — never both in one box.

| Secret | Value | Notes |
|---|---|---|
| `SSH_HOST` | `187.127.137.245` | VPS IP only — no spaces, no label |
| `SSH_USER` | `root` | the SSH login user |
| `SSH_PORT` | `22` | optional; defaults to 22 |
| `SSH_KEY` | *contents of* `~/.ssh/gha_deploy` | the **private** key, full text incl. BEGIN/END |
| `APP_DIR` | `/var/www/<APP>` | exact app dir on the VPS |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | your key | only if the app uses Web3Forms |

**Set them cleanly from the VPS with the `gh` CLI** (avoids copy-paste truncation of the key):

```bash
# one-time: gh auth login
printf '187.127.137.245' | gh secret set SSH_HOST   -R Tarun8433/<REPO>
printf 'root'            | gh secret set SSH_USER   -R Tarun8433/<REPO>
printf '22'              | gh secret set SSH_PORT   -R Tarun8433/<REPO>
printf '/var/www/<APP>'  | gh secret set APP_DIR    -R Tarun8433/<REPO>
gh secret set SSH_KEY -R Tarun8433/<REPO> < ~/.ssh/gha_deploy   # < file = no truncation
```

---

# PART 7 — Daily workflow (deploying changes)

From your laptop, in the project folder:

```bash
git add -A
git commit -m "describe your change"
git push                    # ← this triggers the whole pipeline
```

Watch it:
```bash
gh run watch                # live in terminal
gh run view --web           # open in browser
# or: https://github.com/Tarun8433/<REPO>/actions
```
Site updates ~2–4 min after a green run.

**Useful VPS commands:**
```bash
pm2 status                  # all apps + state
pm2 logs <APP> --lines 100  # app logs
pm2 reload <APP> --update-env   # restart after editing .env.local
pm2 monit                   # live dashboard
```

---

# ⚠️ PART 8 — Gotchas we actually hit (read this!)

1. **`npm ci` fails on this stack** — strict lockfile check breaks when WASM/native
   deps resolve to different patch versions per-platform. → Use `npm install` in CI.

2. **`git pull --ff-only` fails on the server** with *"local changes to package-lock.json
   would be overwritten"* — because `npm install` rewrites the lockfile on the VPS.
   → Use `git fetch origin && git reset --hard origin/main` instead. (Already in deploy.yml.)

3. **PM2 ignores new env vars** after you edit `.env.local` → always
   `pm2 reload <APP> --update-env`. The plain `reload`/`restart` keeps the cached env.

4. **`.env.local` is gitignored** → it is NOT pushed and NOT created by deploy.
   You must create it **manually on the VPS** once, in the **app directory**
   (not `/root`). It then survives every `git reset --hard` (reset only touches
   tracked files).

5. **Passwords with `!` get mangled** in bash → set them with a **single-quoted
   heredoc** (`<<'EOF'`) or single-quoted strings, never double quotes.

6. **GitHub secrets pasted wrong** — putting `SSH_HOST187.127.137.245` in one box,
   or a key truncated by copy-paste, causes *"missing server host"* or
   *"dial tcp i/o timeout"*. Name and value go in **separate boxes**; set the key
   with `gh secret set SSH_KEY < file`.

7. **Port clashes** — port 3000 is used by another backend on this VPS. Every app
   gets its own port (zynthovo=3005, next=3006…) in `ecosystem.config.js` + matching
   nginx `proxy_pass`.

8. **CSS `overflow-x: hidden` breaks `position: sticky`** (project-specific) — it
   forces a scroll container. Use `overflow-x: clip` if you need to stop horizontal
   overflow without killing sticky headers.

9. **New untracked files don't deploy if you use `git commit -am`** — `-a` only
   stages *modified tracked* files. Use `git add -A` for new files.

---

# ✅ New-project checklist

- [ ] VPS has Node 20 + PM2 + nginx (Part 1, once per server)
- [ ] Repo deploy key added on GitHub (Part 1.2)
- [ ] `git clone` into `/var/www/<APP>` (Part 2.1)
- [ ] `.env.local` created in app dir with strong secrets (Part 2.2)
- [ ] `ecosystem.config.js` with unique name + port (Part 2.3)
- [ ] First `npm install && npm run build && pm2 start && pm2 save` (Part 2.4)
- [ ] nginx server block → `proxy_pass` to the port + reload (Part 3.1)
- [ ] SSL via Cloudflare Full or certbot (Part 3.2)
- [ ] Cloudflare A records `@` + `www` → VPS IP (Part 4)
- [ ] `ci.yml` + `deploy.yml` committed (Part 5)
- [ ] All 6 GitHub secrets set in **separate boxes** (Part 6)
- [ ] `git push` → green run → site live (Part 7)

---

# 🔧 Troubleshooting quick table

| Symptom | Cause | Fix |
|---|---|---|
| `Invalid username or password` on /admin | `.env.local` missing/wrong on VPS | Create it in the **app dir**, `pm2 reload <APP> --update-env` |
| `Admin panel is not configured` | `SESSION_SECRET` missing/<16 chars | Set `openssl rand -hex 32`, reload |
| Deploy: *missing server host* | `SSH_HOST` secret wrong/empty | Re-set name+value in separate boxes |
| Deploy: *dial tcp i/o timeout* | stray char in `SSH_HOST`/`SSH_PORT` | `printf '187.127.137.245' \| gh secret set SSH_HOST` |
| Deploy: *package-lock would be overwritten* | using `git pull` | switch to `git reset --hard origin/main` |
| Site not updating after green run | wrong `APP_DIR` / build cached | check `APP_DIR` secret = real app dir; `pm2 logs` |
| 502 Bad Gateway | app down or wrong port | `pm2 status`; match nginx `proxy_pass` to PM2 `PORT` |
| Forms not sending | bad/missing Web3Forms key | set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, rebuild |

---

# 🔐 Security reminders

- **Rotate any SSH keys** that were ever pasted into chat/email.
- Change the default `ADMIN_PASSWORD` to a strong, unique value.
- Consider a non-root SSH user + key-only auth (`PasswordAuthentication no`).
- Keep `.env.local` permissions tight: `chmod 600 .env.local`.

---

*Generated for the Zynthovo deployment stack. Reuse for any Next.js project by
swapping app name, port, app directory, repo, and domain.*

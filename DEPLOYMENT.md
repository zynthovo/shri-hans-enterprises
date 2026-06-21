# Deployment — Hostinger VPS + GitHub Actions

Automated CI/CD for the Next.js app in `zynthovo-next/`.

- **CI** (`.github/workflows/ci.yml`): lint + build on every pull request.
- **Deploy** (`.github/workflows/deploy.yml`): on every push to `main` → build (gate) →
  SSH into the VPS → `git pull`, `npm ci`, `npm run build`, restart with PM2.

> ⚠️ Requires a **Hostinger VPS** (root/SSH access). Hostinger shared / Premium web
> hosting cannot run a Node server, so the admin panel, API routes, and settings
> would not work there.

---

## What you have to do

### 1) Push the project to GitHub
The git repo **is the `zynthovo-next/` app** (its contents are the repo root).
```bash
cd zynthovo-next
git add .
git commit -m "Set up app + CI/CD"
git branch -M main
git push -u origin main
```
`node_modules`, `.next`, `.env.local`, and `data/` are already gitignored.

### 2) One-time VPS setup (in Hostinger hPanel → VPS → SSH details)
```bash
ssh root@<VPS_IP>

# Node 20 + tooling
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git nginx
npm i -g pm2

# Clone & configure the app
mkdir -p /var/www && cd /var/www
git clone https://github.com/<you>/<repo>.git zynthovo
cd zynthovo

# Production secrets (NEVER committed) — create this file on the server:
nano .env.local
#   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...
#   ADMIN_USERNAME=admin
#   ADMIN_PASSWORD=<a strong password>
#   SESSION_SECRET=<random 32+ char string>

npm ci
npm run build
pm2 start ecosystem.config.js   # runs on 127.0.0.1:3005
pm2 save
pm2 startup                              # run the command it prints (survives reboot)
```

### 3) Nginx reverse proxy + HTTPS
```bash
nano /etc/nginx/sites-available/zynthovo
```
```nginx
server {
  server_name zynthovo.com www.zynthovo.com;
  location / {
    proxy_pass http://127.0.0.1:3005;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
```bash
ln -s /etc/nginx/sites-available/zynthovo /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d zynthovo.com -d www.zynthovo.com
```
Point your domain's **A record** to the VPS IP (Hostinger → DNS).

### 4) Create an SSH deploy key for GitHub Actions
```bash
ssh-keygen -t ed25519 -C "github-actions" -f deploy_key -N ""
# add the PUBLIC key to the VPS user that deploys:
cat deploy_key.pub >> ~/.ssh/authorized_keys
```
Keep the **private** key (`deploy_key`) for the next step.

### 5) Add GitHub repository secrets
Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
| --- | --- |
| `SSH_HOST` | your VPS IP |
| `SSH_USER` | `root` (or your deploy user) |
| `SSH_KEY` | full contents of the private `deploy_key` |
| `SSH_PORT` | `22` (optional) |
| `APP_DIR` | `/var/www/zynthovo` |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | your Web3Forms key |

### 6) Deploy
Push to `main` (or **Actions → Deploy → Run workflow**). Actions builds, then SSHes in,
pulls, rebuilds, and restarts PM2.

---

## Notes
- **Secrets/data live on the server.** `.env.local` and `data/` (submissions + settings)
  stay on the VPS and persist across deploys. To change secrets, edit `.env.local` on the
  server and run `pm2 restart zynthovo`.
- **Rollback:** `cd /var/www/zynthovo && git checkout <previous-commit> && npm ci && npm run build && pm2 restart zynthovo`.
- **Logs:** `pm2 logs zynthovo`.

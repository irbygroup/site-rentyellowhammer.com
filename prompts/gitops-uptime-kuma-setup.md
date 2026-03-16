# Prompt: Gitops Uptime Kuma Full Setup

Use this prompt in a Claude Code session in `~/projects/gitops/`.

---

## Context

I need to get Uptime Kuma fully operational on both vm-primary and truenas-hallett as a watchdog pair — each monitoring the other so if either server goes down, the other detects it and alerts me.

PR #48 (https://github.com/irbygroup/gitops/pull/48) adds the truenas-hallett Uptime Kuma service definition. It may or may not be merged yet — check and merge it if needed.

## What needs to happen

### 1. Merge PR #48 if not already merged
- `gh pr view 48` to check status
- Merge if ready, pull master

### 2. Verify vm-primary Uptime Kuma is running
- SSH to vm-primary and check `docker ps | grep uptime-kuma`
- The compose file is at `containers-admin/uptime-kuma/docker-compose.yml`
- It's registered in `docker-up.sh` at line 40
- Domain should be `status.admin.build365.app` (from `.env.template` line 205: `UPTIME_KUMA_DOMAIN=status.admin.build365.app`)
- If it's not running, start it: `docker compose --project-directory . --env-file .env -f containers-admin/uptime-kuma/docker-compose.yml up -d`
- Verify it responds: `curl -sI https://status.admin.build365.app`

### 3. Deploy truenas-hallett Uptime Kuma
SSH to truenas-hallett and run:
```bash
cd /mnt/storage-pool/application_configs/gitops/truenas-hallett
git pull
sudo mkdir -p /mnt/storage-pool/application_configs/uptime-kuma
sudo docker compose up -d uptime-kuma
```

Verify it's running:
```bash
sudo docker ps | grep uptime-kuma
```

### 4. Add local DNS entry for status.officeapps.irbygroup.com
On truenas-hallett, run:
```bash
./setup_local_dns.sh
```
This reads `LOCAL_DNS_DOMAINS` from `.env` which should now include `status.officeapps.irbygroup.com` (added in PR #48 to `.env.template`).

**Important:** If the `.env` on the server was generated before the template update, you need to add `status.officeapps.irbygroup.com` to the `LOCAL_DNS_DOMAINS` value in the server's `.env` file, then re-run `setup_local_dns.sh`. Or run `./secrets_manager.sh export` from local to push the updated template values.

### 5. Configure truenas-hallett Uptime Kuma (first launch)

Open `https://status.officeapps.irbygroup.com` in browser. On first launch:
1. Create admin account (username + password)
2. Set up notification channel:
   - Type: SMTP
   - SMTP Host: `smtp.sendgrid.net`
   - SMTP Port: `587`
   - Security: STARTTLS
   - Username: `apikey` (literal string "apikey")
   - Password: SendGrid API key (from truenas-hallett `.env` → `SENDGRID_API_KEY`)
   - From: `status@irbygroup.com` (or any verified sender)
   - To: `jared@irbygroup.com`
   - Test the notification

3. Add these monitors (all HTTP(s), 60s interval, alerts ON):

| Name | URL | Expected Status |
|------|-----|-----------------|
| VM-Primary: Uptime Kuma | `https://status.admin.build365.app` | 200 or 401 (behind basic auth) |
| VM-Primary: Traefik | `https://traefik.primary.build365.app` | 200 or 401 |
| VM-Primary: Portainer | `https://portainer.admin.build365.app` | 200 or 401 |
| VM-Primary: Homepage | `https://admin.build365.app` | 200 or 401 |
| VM-Primary: Grafana | `https://grafana.admin.build365.app` | 200 |
| rentyellowhammer.com | `https://rentyellowhammer.com` | 200 |
| yellowhammerhospitality.com | `https://yellowhammerhospitality.com` | 200 or 301 |

**Note on basic auth:** vm-primary services use `admin-auth` basic auth middleware. Uptime Kuma will get a 401 unless you provide credentials. Two options:
- Accept 401 as "up" (set accepted status codes to include 401)
- Add basic auth credentials in each monitor's auth settings (username/password from `containers-admin/traefik/htpasswd`)

### 6. Configure vm-primary Uptime Kuma (reciprocal monitoring)

Open `https://status.admin.build365.app` in browser. Add these monitors:

| Name | URL | Expected Status |
|------|-----|-----------------|
| TrueNAS: Uptime Kuma | `https://status.officeapps.irbygroup.com` | 200 or 302 (Authelia redirect) |
| TrueNAS: Homepage | `https://officeapps.irbygroup.com` | 200 or 302 |
| TrueNAS: Portainer | `https://portainer.officeapps.irbygroup.com` | 200 or 302 |
| TrueNAS: NAS Web UI | `https://nas.officeapps.irbygroup.com` | 200 or 302 |
| rentyellowhammer.com | `https://rentyellowhammer.com` | 200 |

**Note on Authelia:** truenas-hallett services use Authelia ForwardAuth, so unauthenticated requests get a 302 redirect to the auth portal. Either:
- Accept 302 as "up" (set accepted status codes to include 302)
- Or use Keyword monitor type and check for "authelia" in the response body (proves the service + Authelia are both working)

If vm-primary Uptime Kuma doesn't have email notifications configured yet, set up SMTP same as above (SendGrid).

### 7. Verify the watchdog pattern works

Test by confirming:
1. truenas-hallett Uptime Kuma shows all vm-primary monitors as UP (green)
2. vm-primary Uptime Kuma shows all truenas-hallett monitors as UP (green)
3. Both instances show rentyellowhammer.com as UP
4. Send a test notification from both instances to confirm email alerts work

### 8. (Optional) Add status pages

Uptime Kuma can create public status pages. If desired:
- vm-primary: Create a status page at `status.admin.build365.app/status/infra` showing all infrastructure monitors
- truenas-hallett: Create a status page at `status.officeapps.irbygroup.com/status/watchdog` showing all cross-server monitors

## SSH Access

- **vm-primary:** Check `~/.ssh/config` or gitops docs for SSH connection details
- **truenas-hallett:** `ssh jaredirby@truenas-hallett` (via Tailscale) — all docker commands need `sudo`

## Key files reference

- `containers-admin/uptime-kuma/docker-compose.yml` — vm-primary service definition
- `truenas-hallett/uptime-kuma/docker-compose.yml` — truenas-hallett service definition
- `.env.template` line 205 — `UPTIME_KUMA_DOMAIN=status.admin.build365.app`
- `truenas-hallett/.env.template` line 71 — `TRAEFIK_DOMAIN=officeapps.irbygroup.com` (so domain becomes `status.officeapps.irbygroup.com`)
- `truenas-hallett/.env.template` line 96 — `LOCAL_DNS_DOMAINS` (includes status subdomain)
- `docker-up.sh` line 40 — vm-primary uptime-kuma is in the PRIMARY service map
- `containers-admin/traefik/htpasswd` — basic auth credentials for vm-primary services

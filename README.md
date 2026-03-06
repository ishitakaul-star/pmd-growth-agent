# pmd-growth-agent

Performance Growth coach.

## Quick setup (Google + Slack)

1. **Generate env and secrets:**  
   `npm run setup`  
   This creates `.env.local` and fills in `NEXTAUTH_SECRET` and `CRON_SECRET`.

2. **Google Sign-In:**  
   [Create OAuth credentials](https://console.cloud.google.com/apis/credentials) (Web client).  
   Redirect URI: `http://localhost:3000/api/auth/callback/google`.  
   Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env.local`.

3. **Slack Sync:**  
   [Create a Slack app](https://api.slack.com/apps), add Bot scopes: `channels:history`, `channels:read`, `users:read`, install and copy the Bot Token.  
   Add `SLACK_BOT_TOKEN` and `SLACK_CHANNEL_ID` to `.env.local`.

4. Run: `npm run dev`

See [docs/GOOGLE-SLACK-SETUP.md](docs/GOOGLE-SLACK-SETUP.md) for step-by-step instructions.

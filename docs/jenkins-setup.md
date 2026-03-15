# Jenkins Setup Guide

This document captures the current Jenkins setup for `API_Automation_Framework`.

## Current CI Topology
- GitHub hosts the repository and sends webhook events.
- Jenkins runs locally on Windows.
- `ngrok` exposes Jenkins publicly for GitHub webhook delivery.
- Slack receives Jenkins build notifications.
- Jenkins uses a multibranch pipeline and reads `Jenkinsfile` from the repository.

## Current Working Flow
1. Push code to `main`.
2. GitHub sends a webhook to Jenkins through the ngrok public URL.
3. Jenkins multibranch pipeline detects the push and starts the build.
4. Jenkins runs the pipeline from `Jenkinsfile`.
5. Playwright report is published.
6. Slack receives success or failure notification.

## Jenkins Jobs
### Primary Job
- `api-automation-framework-multibranch`
- Type: `Multibranch Pipeline`
- Uses `Jenkinsfile` from the repository root.

### Legacy Job
- `api-automation-framework`
- Type: `Pipeline`
- Keep only as fallback until no longer needed.

## Jenkins Pipeline Stages
The repository `Jenkinsfile` currently runs:
1. `Checkout`
2. `Install`
3. `Lint`
4. `Typecheck`
5. `Test`
6. `Publish Report`

## Account Model
### Personal Admin Account
- Jenkins user: `jenkins-admin`
- Purpose: Jenkins administration, plugin management, credentials, security, and system configuration.

### Jenkins Service Account
- Jenkins user: `jenkins-service`
- Purpose: limited Jenkins service-style access.
- Recommended permissions:
  - `Overall: Read`
  - `Job: Read`
  - `Job: Build`
  - `Job: Workspace`
  - `View: Read`

### Agent OS Account
- Windows local user: `jenkins-agent`
- Purpose: reserved for future dedicated agent execution.
- Current state: created, but not yet used to run builds.

## Security Model
- Jenkins authorization uses `Matrix-based security`.
- `jenkins-admin` retains full administrative access.
- `jenkins-service` is non-admin.
- Do not run day-to-day Jenkins administration through service accounts.

## GitHub Webhook
GitHub webhook points to:
- `https://<your-ngrok-domain>/github-webhook/`

Recommended event selection:
- `Just the push event`

Important:
- The ngrok tunnel must be running.
- If the ngrok public URL changes, update both:
  - Jenkins URL in `Manage Jenkins > System`
  - GitHub webhook payload URL

## Slack Integration
Jenkins Slack plugin is configured with:
- Slack workspace subdomain
- bot token stored as Jenkins credential
- `Custom slack app bot user` enabled

The pipeline sends Slack messages for:
- successful builds
- failed builds

Current message includes:
- job name
- build number
- branch
- failing stage on failure
- build URL
- Playwright report URL

## ngrok Notes
- Current setup uses ngrok for local Jenkins exposure.
- This is suitable for learning and development.
- It is not a production-grade hosting model.

For a more stable setup later, consider:
- a persistent tunnel/domain
- Jenkins on a VM or server
- a dedicated Jenkins agent host

## Operational Notes
- Access Jenkins locally through `http://localhost:8080` for administration.
- Access Jenkins publicly through the current ngrok URL when verifying webhook behavior.
- Avoid mixing `localhost` and ngrok sessions during sensitive admin actions if Jenkins shows reverse-proxy or crumb warnings.

## Troubleshooting
### Jenkins asks for login on ngrok URL
- This is normal.
- `localhost` and ngrok are different browser origins, so sessions are not shared.

### GitHub webhook stops working
- Verify ngrok is still running.
- Verify the public ngrok URL has not changed.
- Redeliver the webhook from GitHub `Settings > Webhooks`.

### Slack test fails
- Ensure the workspace field is the Slack subdomain only.
- Ensure `Custom slack app bot user` is enabled.
- Ensure the bot is invited to the target channel.

### Reverse proxy warning appears
- Common when using Jenkins locally behind ngrok.
- First verify that webhook, builds, and report links still work before changing anything.

## Next Recommended Improvements
1. Disable or retire the legacy single-branch Jenkins job.
2. Move Jenkins from temporary ngrok exposure to a more stable host or tunnel.
3. Run builds under the `jenkins-agent` OS account or a dedicated agent node.
4. Add commit author and commit message to Slack notifications.

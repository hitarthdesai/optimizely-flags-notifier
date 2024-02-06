# Optimizely Flags Notifier

A GitHub Action that sends a report of Optimizely flags by how recently they have been updated as a message on Slack.

## Usage

### Create Workflow

To use this GitHub Action, you need to create a workflow file (e.g., `.github/workflows/optimizely.yml`) in your repository. Here's an example workflow that sends a message every Tuesday at 10:00 am:

```yaml
name: Send Optimizely Flags Report to Slack

on:
  schedule:
    - cron: "0 10 * * 2"

jobs:
  send-optimizely-report:
    runs-on: ubuntu-latest

    steps:
      - name: Generate and Send Optimizely Flags Report
        uses: hitarthdesai/optimizely-flags-notifier@vX.X.X
        with:
          optimizely_project_id: 1234567890
          optimizely_auth_token: demo-optimizely-token-for-auth
          slack_webhook_url: https://hooks.slack.com/services/xyz/xyz
          channel_id: CHANNEL123
          slack_app_bot_token: demo-slack-token-for-bot
```

#### Inputs

| Name                    | Required | Default | Description                                                                                                         |
| ----------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `optimizely_project_id` | yes      | ❌      | The Optimizely project ID for which the action should generate the report.                                          |
| `optimizely_auth_token` | yes      | ❌      | The Optimizely API token for authentication. It is used to fetch the flags and their last updated time.             |
| `channel_id`            | yes      | ❌      | The Slack channel ID to which the action will send a message with the report.                                       |
| `slack_app_bot_token`   | yes      | ❌      | The Slack app bot token for authentication. It is used to fetch the user name and profile picture of the bot.secret |

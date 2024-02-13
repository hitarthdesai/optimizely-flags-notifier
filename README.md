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
          slack_channel_id: CHANNEL123
          slack_app_bot_token: demo-slack-token-for-bot
```

#### Inputs

| Name                    | Required | Default | Description                                                                                                         |
| ----------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| `optimizely_project_id` | yes      | ❌      | The Optimizely project ID for which the action should generate the report.                                          |
| `optimizely_auth_token` | yes      | ❌      | The Optimizely API token for authentication. It is used to fetch the flags and their last updated time.             |
| `slack_channel_id`      | yes      | ❌      | The Slack channel ID to which the action will send a message with the report.                                       |
| `slack_app_bot_token`   | yes      | ❌      | The Slack app bot token for authentication. It is used to fetch the user name and profile picture of the bot.secret |

## How to control which feature flags I am notified about?

As of now, the action offers the following options:

1. You can add an Optimizely Variable named `is_permanent` with default value `True` to a feature flag if you don't want to be notified about it at all.
2. You can add an Optimizely Variable named `end_date` with default value in the format `MM,DD,YYYY` to indicate you don't want to be notified about this flag before the specified date.

Example: Use `end_date=12,31,24` to not be notified before December 31, 2024

## What does the action do?

Following are the steps the action performs:

1. Fetches all features flags from a Optimizely Feature Experimentation project using the `inputs.optimizely_project_id` and `inputs.optimizely_auth_token`.
2. Excludes feature flags marked as permanent by checking if the variable `is_permanent` is set to true. If it is not specified, the flag will be considered non-permanent.
3. Excludes feature flags marked with an `end_date` that is after the day this action is being run
4. Groups the remaining feature flags into time ranges i.e. `TWO_WEEKS_OR_LESS, ONE_MONTH_OR_LESS, THREE_MONTHS_OR_LESS, SIX_MONTHS_OR_LESS, ONE_YEAR_OR_LESS, MORE_THAN_ONE_YEAR`
5. Build the slack message from the above classification, and sends it to `inputs.slack_channel_id` as `inputs.slack_app_bot_token` using Slack API's post message endpoint.

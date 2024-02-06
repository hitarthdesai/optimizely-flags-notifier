import { getInput } from "@actions/core";
import { requiredString } from "../types";

export class Inputs {
  static instance: Inputs;
  static projectId: string;
  static optimizelyAuthToken: string;
  static slackWebhookUrl: string;
  static channelId: string;
  static slackAppBotToken: string;

  private constructor() {
    Inputs.instance = Inputs;
    Inputs.projectId = requiredString.parse(
      getInput("optimizely_project_id") || process.env.OPTIMIZELY_PROJECT_ID
    );
    Inputs.optimizelyAuthToken = requiredString.parse(
      getInput("optimizely_auth_token") || process.env.OPTIMIZELY_AUTH_TOKEN
    );
    Inputs.slackWebhookUrl = requiredString.parse(
      getInput("slack_webhook_url") || process.env.SLACK_WEBHOOK_URL
    );
    Inputs.channelId = requiredString.parse(
      getInput("channel_id") || process.env.SLACK_CHANNEL_ID
    );
    Inputs.slackAppBotToken = requiredString.parse(
      getInput("slack_app_bot_token") || process.env.SLACK_APP_BOT_TOKEN
    );
  }

  static parseInputs() {
    if (!this.instance) {
      new Inputs();
    }
  }
}

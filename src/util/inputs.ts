import { getInput } from "@actions/core";
import { requiredString } from "../types";

export class Inputs {
  static instance: Inputs | undefined;
  static projectId: string;
  static optimizelyAuthToken: string;
  static channelId: string;
  static slackAppBotToken: string;
  static permanentFlagVariableName: string;
  static flagEndDateVariableName: string;

  private constructor() {
    Inputs.instance = Inputs;
    Inputs.projectId = requiredString.parse(
      getInput("optimizely_project_id") || process.env.OPTIMIZELY_PROJECT_ID
    );
    Inputs.optimizelyAuthToken = requiredString.parse(
      getInput("optimizely_auth_token") || process.env.OPTIMIZELY_AUTH_TOKEN
    );
    Inputs.channelId = requiredString.parse(
      getInput("slack_channel_id") || process.env.SLACK_CHANNEL_ID
    );
    Inputs.slackAppBotToken = requiredString.parse(
      getInput("slack_app_bot_token") || process.env.SLACK_APP_BOT_TOKEN
    );
    Inputs.permanentFlagVariableName = requiredString.parse(
      getInput("permanent_flag_variable_name") || "is_permanent"
    );
    Inputs.flagEndDateVariableName = requiredString.parse(
      getInput("flag_end_date_variable_name") || "end_date"
    );
  }

  static parseInputs() {
    if (this.instance) return;

    new Inputs();
  }

  /**
   * Resets the instance of Inputs
   * This is only used for unit tests
   */
  static _resetInstance() {
    this.instance = undefined;
  }
}

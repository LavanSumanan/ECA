const { getTime } = require("../helpers/time");
const { sendMessageToServer } = require("../helpers/message");
const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();

module.exports = {
  level: "public",
  data: new SlashCommandBuilder()
    .setName("feedbacktest")
    .setDescription("Send us anonymous private or public feedback!")
    .addStringOption((option) =>
      option
        .setName("publicity")
        .setDescription("Pick public or private")
        .setRequired(true)
        .addChoice("private", "private")
        .addChoice("public", "public")
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Write a feedback message")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // Get options from interaction
    const options = interaction.options;
    const publicity = options.get("publicity").value;
    const message = options.get("message").value;

    // Get current date and time
    const date = getTime();
    const currDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const currTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    // Send feedback to appropriate channel
    if (publicity === "private") {
      sendMessageToServer(
        client,
        "bot-stuffs",
        `${currDate} @ ${currTime}: ${message} [private]`,
        process.env.PROD_ID
      );
      interaction.reply({
        content: "Sent! Thanks for the anonymous feedback!",
        ephemeral: true,
      });
    } else if (publicity === "public") {
      sendMessageToServer(
        client,
        "bot-stuffs",
        `${currDate} @ ${currTime}: ${message} [public]`,
        process.env.PROD_IDs
      );
      interaction.reply({
        content: "Sent! Thanks for the anonymous feedback!",
        ephemeral: true,
      });
    }
  },
};

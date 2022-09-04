const {
  sendMessageToServer,
  sendEmbedToServer,
} = require("../helpers/message");
const { embedHandler } = require("../embeds/handler");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { GENERAL } = require("../helpers/channelConstants");
const { catLove } = require("../helpers/emojiConstants");
require("dotenv").config();

module.exports = {
  level: "public",
  data: new SlashCommandBuilder()
    .setName("appreciate")
    .setDescription("Appreciate someone in ACE for being awesome!")
    .addBooleanOption((option) =>
      option
        .setName("anonymous")
        .setDescription("Do you want to remain anonymous?")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Pick an ACE member to appreciate!")
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Write a message to show appreciation to this member!")
    ),
  async execute(interaction) {
    const client = interaction.client;
    // Get options from interaction
    const options = interaction.options;
    const anonymous = options.get("anonymous").value;
    const appreciator = anonymous ? null : interaction.user;
    const appreciated = options.get("member")
      ? options.get("member").value
      : "";
    const appreciationMessage = options.get("message")
      ? options.get("message").value
      : "";

    const embedOptions = { appreciator, appreciated, appreciationMessage };

    const embed = embedHandler("appreciate", embedOptions);

    if (appreciated) {
      try {
        sendMessageToServer(
          client,
          GENERAL,
          `<@${appreciated}>`,
          process.env.PROD_ID
        );
      } catch (e) {
        console.error(e);
      }
    }
    sendEmbedToServer(client, GENERAL, embed, process.env.PROD_ID);

    interaction.reply({
      content: `Sent! And thank *you* for appreciating other ACE members. I appreciate you for that! ${catLove}`,
      ephemeral: true,
    });
  },
};

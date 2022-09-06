const { makeHelpFeedbackEmbed } = require("../embeds/help-feedback-embed");
const { makeHelpBirthdayEmbed } = require("../embeds/help-birthday-embed");
const { makeHelpAppreciateEmbed } = require("../embeds/help-appreciate-embed");
const {
  makeHelpAceOffThemeEmbed,
} = require("../embeds/help-aceofftheme-embed");
const { makeHelpEmbed } = require("../embeds/help-embed");
const { sendEmbedToServer } = require("../helpers/message");
const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();

module.exports = {
  level: "public",
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("find out ECA's commands!")
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("Pick a command to find out more")
        .addChoices({name: "feedback", value: "feedback"},
            {name: "birthday", value: "birthday"},
            {name: "appreciate", value: "appreciate"},
            {name: "aceofftheme", value: "aceofftheme"})
    ),
  async execute(interaction) {
    const client = interaction.client;
    const options = interaction.options;
    const command = options.get("command") && options.get("command").value;
    const channel = interaction.channelId;

    let embed;

    if (command) {
      switch (command) {
        case "feedback":
          process.env.GUILD_ID != process.env.PROD_ID &&
            console.log("feedback help");
          embed = makeHelpFeedbackEmbed();
          break;
        case "birthday":
          process.env.GUILD_ID != process.env.PROD_ID &&
            console.log("birthday help");
          embed = makeHelpBirthdayEmbed();
          break;
        case "appreciate":
          process.env.GUILD_ID != process.env.PROD_ID &&
            console.log("appreciate help");
          embed = makeHelpAppreciateEmbed();
          break;
        case "aceofftheme":
          process.env.GUILD_ID != process.env.PROD_ID &&
            console.log("aceofftheme help");
          embed = makeHelpAceOffThemeEmbed();
          break;
      }
    } else {
      embed = makeHelpEmbed();
    }

    sendEmbedToServer(client, channel, embed, process.env.PROD_ID);

    interaction.reply({
      content: "Sent!",
      ephemeral: true,
    });
  },
};

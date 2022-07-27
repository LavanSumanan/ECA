const { editMessageById, sendMessageToServer } = require("../helpers/message");
const { SlashCommandBuilder } = require("@discordjs/builders");
const getAceOffs = require("../db/aceOff/getAceOffs");
const updateAceOffs = require("../db/aceOff/updateAceOffs");
const getTrackedMessageId = require("../db/trackedMessages/getTrackedMesssageId");
const updateTrackedMessage = require("../db/trackedMessages/updateTrackedMessage");
require("dotenv").config();

module.exports = {
  level: "public",
  data: new SlashCommandBuilder()
    .setName("themetest")
    .setDescription("Suggest a future ace-off theme!")
    .addStringOption((option) =>
      option
        .setName("theme")
        .setDescription("Enter the theme (e.g. Hype)!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emojis")
        .setDescription("Include some emojis in the theme post (e.g. 🔥)!")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("credit")
        .setDescription(
          "Do you want to be credited (e.g. This week's theme is Hype suggested by @Lavan)?"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const theme = interaction.options.getString("theme");
    const emojis = interaction.options.getString("emojis");
    const wantsCredit = interaction.options.getBoolean("credit");
    console.log(theme, emojis, wantsCredit);
    const intro =
      "Got it! Your ace-off theme suggestion will look like this:\n";
    const post = wantsCredit
      ? `This week's theme is **${theme}** ${emojis} suggested by ${interaction.user}!`
      : `This week's theme is **${theme}** ${emojis}!`;

    let aceOffs = await getAceOffs();
    aceOffs = aceOffs + post + "\n";
    updateAceOffs(aceOffs);

    let msgid = await getTrackedMessageId("aceOffThemeList");
    let edited = false;

    if (msgid) {
      try {
        edited = await editMessageById(client, "bot-stuffs", msgid, aceOffs);
      } catch (e) {
        console.error(e);
      }
    }

    if (!edited) {
      const message = await sendMessageToServer(
        client,
        "bot-stuffs",
        aceOffs,
        process.env.PROD_ID
      );
      message.pin();
      updateTrackedMessage("aceOffThemeList", message.id);
    }

    interaction.reply({
      content: intro + post,
      ephemeral: true,
    });
  },
};

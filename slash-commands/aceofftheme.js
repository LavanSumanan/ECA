const { editMessageById, sendMessageToServer } = require("../helpers/message");
const { SlashCommandBuilder } = require("@discordjs/builders");
const trackedmessageSchema = require("../Schemas/trackedmessage-schema");

module.exports = {
  level: "public",
  data: new SlashCommandBuilder()
    .setName("theme")
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

    console.log(post);

    let aceOffThemeListMsg;
    try {
      aceOffThemeListMsg = await trackedmessageSchema.find({
        name: "aceOffThemeList",
      });
    } catch (e) {
      console.error(e);
    }

    if (
      !aceOffThemeListMsg ||
      !aceOffThemeListMsg[0] ||
      !aceOffThemeListMsg[0].msgid
    ) {
      const message = await sendMessageToServer(
        client,
        "bot-stuffs",
        post,
        process.env.PROD_ID
      );
      console.log(message.id);

      if (aceOffThemeListMsg.length > 0) {
        await trackedmessageSchema.deleteMany({});
      }

      try {
        await new trackedmessageSchema({
          name: "aceOffThemeList",
          msgid: message.id,
        }).save();
      } catch (e) {
        console.error(e);
      }
    } else {
      const msgid = aceOffThemeListMsg[0].msgid;
      const edited = await editMessageById(
        client,
        "bot-stuffs",
        msgid,
        post,
        true
      );
      if (!edited) {
        const message = await sendMessageToServer(
          client,
          "bot-stuffs",
          post,
          process.env.PROD_ID
        );
        console.log(message.id);

        if (aceOffThemeListMsg.length > 0) {
          await trackedmessageSchema.deleteMany({});
        }

        try {
          await new trackedmessageSchema({
            name: "aceOffThemeList",
            msgid: message.id,
          }).save();
        } catch (e) {
          console.error(e);
        }
      }
    }

    interaction.reply({
      content: intro + post,
      ephemeral: true,
    });
  },
};

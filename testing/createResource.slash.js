const { SlashCommandBuilder } = require("@discordjs/builders");
const { fetchMessageById } = require("../helpers/message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createresourcetest")
    .setDescription("Create and/or edit a resource!")
    .addStringOption((option) =>
      option
        .setName("messageid")
        .setDescription("Enter the id of the message!")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("editing")
        .setDescription("I am editing an existing resource")
        .setRequired(false)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const id = interaction.options.getString("messageid");
    const isEdit = interaction.options.getString("editing");
    console.log(id, isEdit);

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

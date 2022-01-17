const { dmUser, sendMessageToServer } = require("../helpers/message");
const yellAtHaodaSchema = require("../Schemas/yellathaoda-schema");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  level: "mod",
  data: new SlashCommandBuilder()
    .setName("stopyellingathaoda")
    .setDescription("Stop yelling at Haoda!")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("Insert the id given by ECA (check dms from ECA!)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const id = interaction.options.getString("id");

    let task;
    try {
      task = await yellAtHaodaSchema.findOne({
        id: id,
      });
    } catch (e) {
      console.error(e);
    }

    if (!task) {
      interaction.reply({
        content: "Sorry, I can't find a task for Haoda with that id!",
        ephemeral: true,
      });
      return;
    }

    const message = task.message;

    console.log("no longer yelling this at haoda: ", message);

    await yellAtHaodaSchema.deleteOne({ id: id });

    dmUser(client, process.env.HAODA, "Good job Haoda!");
    sendMessageToServer(
      client,
      "general",
      `Everyone congratulate Haoda on finishing this task: ${message}`,
      process.env.PROD_ID
    );

    const post = `Thanks! I'll tell Haoda... good job!`;

    interaction.reply({
      content: post,
      ephemeral: true,
    });
  },
};

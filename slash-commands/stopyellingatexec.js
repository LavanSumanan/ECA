const { dmUser, sendMessageToServer } = require("../helpers/message");
const yellAtExecSchema = require("../Schemas/yellatexec");
const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();

module.exports = {
  level: "mod",
  data: new SlashCommandBuilder()
    .setName("stopyellingatexec")
    .setDescription("Stop yelling at an exec!")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("Insert the id given by ECA (check dms from ECA!)")
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const id = interaction.options.getString("id");
    console.log("id:\n", id);

    let task;
    try {
      task = await yellAtExecSchema.findOne({
        id,
      });
    } catch (e) {
      console.error(e);
    }

    if (!task) {
      interaction.reply({
        content: "Sorry, I can't find a task for an exec with that id!",
        ephemeral: true,
      });
      return;
    }

    const message = task.message;
    const exec = task.exec;
    const channel = task.channel;

    console.log("no longer yelling this at an exec: ", message);

    await yellAtExecSchema.deleteOne({ id: id });

    dmUser(client, exec, `Good job <@${exec}> on finishing ${message}!`);
    sendMessageToServer(
      client,
      channel,
      `Congratulate <@${exec}> on finishing this task: ${message}`,
      process.env.PROD_ID
    );

    const post = `Thanks! I'll tell <@${exec}>... good job!`;

    interaction.reply({
      content: post,
      ephemeral: true,
    });
  },
};

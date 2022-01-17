const { dmUser, sendMessageToServer } = require("../helpers/message");
const { getTime } = require("../helpers/time");
const yellAtHaodaSchema = require("../Schemas/yellathaoda-schema");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  level: "mod",
  data: new SlashCommandBuilder()
    .setName("haodadowork")
    .setDescription("Yell at Haoda to do work!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Enter message to yell at Haoda")
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const message = interaction.options.getString("message");
    console.log("yelling this at haoda: ", message);
    const yell = `Hey <@${process.env.HAODA}>, ${message}!`;
    const id = getTime().getTime();

    try {
      await new yellAtHaodaSchema({
        message: yell,
        id: id,
      }).save();
    } catch (e) {
      console.error(e);
    }

    dmUser(client, process.env.HAODA, yell);
    sendMessageToServer(client, "general", yell, process.env.PROD_ID);

    const post = `Thanks! I'll tell Haoda... ${yell}`;
    interaction.user.send(`I'm now yelling the following at Haoda *every day*:
    \n${yell}
    \nHere's your **Haoda task id**: ${id}
    \nUse this id to stop yelling at Haoda about this task once he's done!`);

    interaction.reply({
      content: post,
      ephemeral: true,
    });
  },
};

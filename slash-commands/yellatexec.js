const { dmUser, sendMessageToServer } = require("../helpers/message");
const { getTime } = require("../helpers/time");
const yellAtExecSchema = require("../Schemas/yellatexec");
const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();

module.exports = {
  level: "mod",
  data: new SlashCommandBuilder()
    .setName("yellatexec")
    .setDescription("Yell at an exec to do work!")
    .addUserOption((option) =>
      option
        .setName("exec")
        .setDescription(
          "Enter an exec to be yelled at (if they're ok with this!)"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Enter message to yell at an exec")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("Enter a channel to yell at an exec in")
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    // TODO: find out what this returns
    const exec = interaction.options.getUser("exec").id;
    const message = interaction.options.getString("message");
    const channel = interaction.options.getString("channel");
    console.log(`yelling this at ${exec}: `, message);
    const id = getTime().getTime();

    try {
      await new yellAtExecSchema({
        exec,
        message,
        channel,
        id,
      }).save();
    } catch (e) {
      console.error(e);
    }

    const yell = `Hey <@${exec}>, ${message}!`;
    dmUser(client, exec, yell);
    sendMessageToServer(client, channel, yell, process.env.PROD_ID);

    const post = `Thanks! I'll tell that exec... ${yell}`;
    interaction.user
      .send(`I'm now yelling the following at <@${exec}> *every day*:
    \n${yell}
    \nHere's your **task id**: ${id}
    \nUse this id to stop yelling at <@${exec}> about this task once they're done!`);

    interaction.reply({
      content: post,
      ephemeral: true,
    });
  },
};

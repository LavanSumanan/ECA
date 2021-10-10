const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
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
    const { options } = interaction;
    console.log(options);
    // Get options from interaction
    const publicity = options.getString("publicity");
    const message = options.getString("messaage");

    // Get current date and time
    const date = new Date();
    const currDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const currTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    // Send feedback to appropriate channel
    if (publicity === "private") {
      client.channels.cache
        .get(`895124031878090823`)
        .send(`${currDate} @ ${currTime}: ${message}`);
      interaction.reply({
        content: "Sent! Thanks for the anonymous feedback!",
        ephemeral: true,
      });
    } else if (publicity === "public") {
      client.channels.cache
        .get(`896791547989884989`)
        .send(`${currDate} @ ${currTime}: ${message}`);
      interaction.reply({
        content: "Sent! Thanks for the anonymous feedback!",
        ephemeral: true,
      });
    }
  },
};

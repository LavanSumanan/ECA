const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Learn about the ACE discord server!")
    .addStringOption((option) =>
      option
        .setName("channel")
        .setDescription("Pick a server channel to learn about how it works!")
        .setRequired(true)
        .addChoice("ace-off", "ace-off")
        .addChoice("welcome-and-intros", "welcome-and-intros")
        .addChoice("live-chat", "live-chat")
    ),
  async execute(interaction, client) {
    interaction.reply({ content: "Check your DMs!", ephemeral: true });
  },
};

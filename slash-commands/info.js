const { SlashCommandBuilder } = require("@discordjs/builders");

//Todo: add channels + descriptions

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
  async execute(interaction) {
    const options = interaction.options;
    const channel = options.get("channel").value;

    switch (channel) {
      case "ace-off":
        interaction.user.send("ace-off is rad");
        break;
      case "welcome-and-intros":
        interaction.user.send("welcome-and-intros is rad");
        break;
      case "live-chat":
        interaction.user.send("live-chat is rad");
        break;
    }
    console.log(channel);
    interaction.reply({ content: "Check your DMs!", ephemeral: true });
  },
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const statusSchema = require("../Schemas/status");

module.exports = {
  level: "mod",
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Set ECA's status!")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("What do you want ECA to listen to?")
        .setRequired(true)
    )
    .setDefaultPermission(false),
  async execute(interaction) {
    const client = interaction.client;
    // Get options from interaction
    const options = interaction.options;

    if (!interaction.member.permissions.any("ADMINISTRATOR")) {
      interaction.reply({
        content: `Sorry! Only executives can run this command!`,
        ephemeral: true,
      });
    }

    const name = options.get("name").value;

    await statusSchema.deleteMany({});

    try {
      await new statusSchema({
        name: name,
        type: "LISTENING",
      }).save();
    } catch (e) {
      console.error(e);
    }

    client.user.setPresence({
      activities: [
        {
          name: name,
          type: "LISTENING",
        },
      ],
      status: "online",
    });

    interaction.reply({
      content: `Got it! ECA is now listening to ${name}`,
      ephemeral: true,
    });

    console.log(
      "status changed by",
      interaction.member.user.username,
      "to",
      name
    );
  },
};

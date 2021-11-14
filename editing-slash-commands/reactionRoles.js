const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactionrole")
    .setDescription("Set up reaction roles on a message!")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Choose title of the reaction role menu")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("choose description of reaction role menu")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji")
        .setDescription("emoji to use for this reaction role")
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName("role")
        .setDescription("role to be given")
        .setRequired(true)
    ),
  async execute(interaction, client, Discord) {
    const channel = interaction.channel;
    const emoji = interaction.options.get("emoji").value;
    const role = interaction.options.get("role");
    console.log(role);

    let embed = new Discord.MessageEmbed()
      .setColor("#e42643")
      .setTitle(interaction.options.get("title").value)
      .setDescription(interaction.options.get("description").value);

    let messageEmbed = await interaction.channel.send({ embeds: [embed] });
    messageEmbed.react(emoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name == emoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(role);
        }
      } else {
        return;
      }
    });

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name == emoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(role);
        }
      } else {
        return;
      }
    });
  },
};

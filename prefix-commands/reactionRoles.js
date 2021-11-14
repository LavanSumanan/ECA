module.exports = {
  name: "reactionrole",
  description: "Sets up a reaction role message!",
  async execute(message, args, Discord, client) {
    const channel = "894055790757945404";
    const heRole = message.guild.roles.cache.find(
      (role) => role.name === "he/him"
    );
    console.log(`old role: ${heRole}`);

    const heEmoji = "🔵";

    let embed = new Discord.MessageEmbed()
      .setColor("#e42643")
      .setTitle("Pronoun Roles")
      .setDescription(
        "Please select a pronoun or dm us if you would like to be referred in a different way\n\n" +
          `${heEmoji} for he/him`
      );

    let messageEmbed = await message.channel.send({ embeds: [embed] });
    messageEmbed.react(heEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name == heEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(heRole);
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
        if (reaction.emoji.name == heEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(heRole);
        }
      } else {
        return;
      }
    });
  },
};

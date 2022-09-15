const { MessageEmbed } = require("discord.js");

function testEmbed(options) {
  let embed = new MessageEmbed();

  embed.setColor("#00db80");
  embed.setTitle("AppreciACEtion!!");
  embed.setDescription("Giving shout outs to the amazing people of ACE!");
  if (options.appreciator)
    embed.addField("Appreciator", `<@${options.appreciator.id}>`, true);
  embed.addField("Appreciated", `<@${options.appreciated}>`, true);
  if (options.appreciationMessage) {
    embed.addField("Message", options.appreciationMessage);
  } else {
    embed.addField(
      "Message",
      "Being an amazing person and brightening someone's day!"
    );
  }
  embed.setFooter("For help using ECA, please contact #Leben3185");
  return embed;
}

module.exports = {
  testEmbed: testEmbed,
};

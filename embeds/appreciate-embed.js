const { MessageEmbed } = require("discord.js");

function makeAppreciateEmbed(options) {
  let embed = new MessageEmbed();
  let catLove = "<:cat_love:799494817250803762>";

  embed.setColor("#00db80");
  embed.setTitle("AppreciACEtion!!");
  embed.setDescription("Giving shout outs to the amazing people of ACE!");
  if (options.appreciator)
    embed.addField("Appreciator", `<@${options.appreciator.id}>`, true);
  if (options.appreciated)
    embed.addField("Appreciated", `<@${options.appreciated}>`, true);
  else embed.addField("Appreciated", "ACE", true);
  if (options.appreciationMessage) {
    embed.addField("Message", options.appreciationMessage);
  } else {
    embed.addField(
      "Message",
      `Thanks for being amazing and brightening someone's day!`
    );
  }
  embed.addField("We appreciate you!", catLove);
  embed.setFooter("For help using ECA, please contact #Leben3185");
  return embed;
}

module.exports = {
  makeAppreciateEmbed: makeAppreciateEmbed,
};

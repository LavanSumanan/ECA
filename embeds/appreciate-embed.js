const { MessageEmbed } = require("discord.js");
const { catLove } = require("../helpers/emojiConstants");

function makeAppreciateEmbed(options) {
  let embed = new MessageEmbed();

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
  embed.setFooter({
    text: "For help using ECA, type /help or contact Plasmatic#0001",
  });
  return embed;
}

module.exports = {
  makeAppreciateEmbed: makeAppreciateEmbed,
};

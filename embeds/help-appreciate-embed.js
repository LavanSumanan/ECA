const { MessageEmbed } = require("discord.js");
const { GENERAL } = require("../helpers/channelConstants");
const { catLove } = require("../helpers/emojiConstants");

function makeHelpAppreciateEmbed() {
  let embed = new MessageEmbed();

  embed.setColor("#42b3f5");
  embed.setTitle(`${catLove} Appreciate ${catLove} Help`);
  embed.setDescription("Publicly apreciate members of ACE!");
  embed.addField("Command", "`/appreciate`");
  embed.addField("Options", "anonymous, member, message");
  embed.addField(
    "Anonymous",
    "Pick `True` to remain anonymous, or `False` to show your name on the message!"
  );
  embed.addField(
    "Member [Optional]",
    "Provide a specific ACE member to appreciate, or skip this to address your appreciation to all of ACE!"
  );
  embed.addField(
    "Message [Optional]",
    "Provide a specific appreciative message, or skip this and let ECA provid one!"
  );
  embed.addField(
    "Result",
    `ECA will share your appreciation into <#${GENERAL}>!`
  );
  embed.setFooter({
    text: "For help with other commands, type /help or contact Plasmatic#0001",
  });
  return embed;
}

module.exports = {
  makeHelpAppreciateEmbed: makeHelpAppreciateEmbed,
};

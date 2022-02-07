const { MessageEmbed } = require("discord.js");

function makeHelpAppreciateEmbed() {
  let embed = new MessageEmbed();

  embed.setColor("#42b3f5");
  embed.setTitle(
    "<:cat_love:799494817250803762> Appreciate <:cat_love:799494817250803762> Help"
  );
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
    "ECA will share your appreciation into <#756315077937856512>!"
  );
  embed.setFooter(
    "For help with other commands, type /help or contact Leben#3185"
  );
  return embed;
}

module.exports = {
  makeHelpAppreciateEmbed: makeHelpAppreciateEmbed,
};

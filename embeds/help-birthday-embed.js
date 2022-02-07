const { MessageEmbed } = require("discord.js");

function makeHelpBirthdayEmbed() {
  let embed = new MessageEmbed();

  embed.setColor("#42b3f5");
  embed.setTitle("🎂 Birthday 🎂 Help");
  embed.setDescription("Let ECA and ACE wish you on your birthday!");
  embed.addField("Command", "`/birthday`");
  embed.addField("Options", "month, day");
  embed.addField("Month", "Pick your birth month");
  embed.addField("Day", "Enter your birthday day");
  embed.addField(
    "Result",
    "ECA will wish you at midnight EST on your birthday in the <#756315077937856512> chat!"
  );
  embed.setFooter(
    "For help with other commands, type /help or contact Leben#3185"
  );
  return embed;
}

module.exports = {
  makeHelpBirthdayEmbed: makeHelpBirthdayEmbed,
};

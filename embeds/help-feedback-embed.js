const { MessageEmbed } = require("discord.js");
const { FEEDBACKBOOGIE } = require("../helpers/channelConstants");

function makeHelpFeedbackEmbed() {
  let embed = new MessageEmbed();

  embed.setColor("#42b3f5");
  embed.setTitle("❓ Feedback ❓ Help");
  embed.setDescription("Anonymously share feedback about ACE!");
  embed.addField("Command", "`/feedback`");
  embed.addField("Options", "publicity, message");
  embed.addField(
    "Publicity",
    `Pick \`public\` to share feedback into the public <#${FEEDBACKBOOGIE}> channel, or \`private\` to send feedback directly to the ACE executive team, message`
  );
  embed.addField("Message", "Type out a feedback message to be shared");
  embed.addField(
    "Result",
    "ECA will share your feedback into the given channel on your behalf to maintain anonymity!"
  );
  embed.setFooter(
    "For help with other commands, type /help or contact Plasmatic#0001"
  );
  return embed;
}

module.exports = {
  makeHelpFeedbackEmbed: makeHelpFeedbackEmbed,
};

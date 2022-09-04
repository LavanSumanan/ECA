const { MessageEmbed } = require("discord.js");

function makeHelpEmbed() {
  let embed = new MessageEmbed();

  embed.setColor("#42b3f5");
  embed.setTitle("🤔 Help 🤔");
  embed.setDescription("Find out more about ECA's commands!");
  embed.addField(
    "/help",
    "·See an overview of ECA's current commands. Choose a command (e.g. `/help command: feedback`) to see more details about that specific command."
  );
  embed.addField(
    "/feedback",
    "·Give anonymous feedback to ACE and/or the ACE executive team.\n·Type /help, select a command, and choose `feedback` for more details.\n·Read the release notes here: https://bit.ly/eca_feeedback"
  );
  embed.addField(
    "/birthday",
    "·Enter your birthday and let me wish you on your birthday!\n·Type /help, select a command, and choose `birthday` for more details.\n·Read the release notes here: https://bit.ly/eca_birthday"
  );
  embed.addField(
    "/appreciate",
    "·Send fancy appreciative messages to other ACE members!\n·Type /help, select a command, and choose `appreciate` for more details.\n·Read the release notes here: https://bit.ly/eca_appreciate"
  );
  embed.addField(
    "/aceofftheme",
    "Suggest future ace-off themes to ECA!\n·Type /help, select a command, and choose `aceofftheme` for more details.\n·Read the release notes here: https://bit.ly/eca_aceofftheme"
  );
  embed.setFooter({
    text: "For help with specific commands, type /help and select a command, or contact Plasmatic#0001",
  });
  return embed;
}

module.exports = {
  makeHelpEmbed,
};

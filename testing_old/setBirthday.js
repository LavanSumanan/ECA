const months = require("../helpers/monthConstants");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getBirthdayByID } = require("../db/birthdays/get");
const { addBirthday } = require("../db/birthdays/add");
const { updateBirthdayByID } = require("../db/birthdays/update");

module.exports = {
  level: "public",
  data: new SlashCommandBuilder()
    .setName("birthday")
    .setDescription("Enter your birthday and we'll wish you!")
    .addStringOption((option) =>
      option
        .setName("month")
        .setDescription("Plese pick the month!")
        .setRequired(true)
        .addChoice(months[1][0], "1")
        .addChoice(months[2][0], "2")
        .addChoice(months[3][0], "3")
        .addChoice(months[4][0], "4")
        .addChoice(months[5][0], "5")
        .addChoice(months[6][0], "6")
        .addChoice(months[7][0], "7")
        .addChoice(months[8][0], "8")
        .addChoice(months[9][0], "9")
        .addChoice(months[10][0], "10")
        .addChoice(months[11][0], "11")
        .addChoice(months[12][0], "12")
    )
    .addIntegerOption((option) =>
      option
        .setName("day")
        .setDescription("Plese pick the day!")
        .setRequired(true)
    ),
  async execute(interaction) {
    const options = interaction.options;
    const month = options.get("month").value;
    const day = options.get("day").value;
    const userid = interaction.member.user.id;

    console.log(`Set birthday for ${userid} to ${months[month][0]} ${day}`);

    if (day <= parseInt(months[month][1]) && day > 0) {
      const userBirthday = await getBirthdayByID(userid);
      if (!userBirthday) {
        await addBirthday(userid, month, day);
      } else {
        await updateBirthdayByID(userid, month, day);
      }

      interaction.reply({
        content: `Got it! Your birthday is ${months[month][0]} ${day}!`,
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: `Sorry! The day ${months[month][0]} ${day} does not exist! Please try again!`,
        ephemeral: true,
      });
    }
  },
};

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
        .addChoices({name: months[1][0], value: "1"},
          {name: months[2][0], value: "2"},
          {name: months[3][0], value: "3"},
          {name: months[4][0], value: "4"},
          {name: months[5][0], value: "5"},
          {name: months[6][0], value: "6"},
          {name: months[7][0], value: "7"},
          {name: months[8][0], value: "8"},
          {name: months[9][0], value: "9"},
          {name: months[10][0], value: "10"},
          {name: months[11][0], value: "11"},
          {name: months[12][0], value: "12"})
        .setRequired(true)
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

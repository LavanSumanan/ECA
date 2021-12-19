"use strict";

const birthdaySchema = require("../Schemas/birthday-schema");

const fs = require("fs");
const fileName = "./Data/birthdays.json";

const { SlashCommandBuilder } = require("@discordjs/builders");

const months = [
  ["", ""],
  ["January", "31"],
  ["February", "29"],
  ["March", "31"],
  ["April", "30"],
  ["May", "31"],
  ["June", "30"],
  ["July", "31"],
  ["August", "31"],
  ["Sepetember", "30"],
  ["October", "31"],
  ["November", "30"],
  ["December", "31"],
];

module.exports = {
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
    const birthday = `${month} ${day}`;

    console.log(`Set birthday for ${user} to ${months[month][0]} ${day}`);
    s;

    //------------------------FOR DEVELOPMENT------------------------
    /*
    let rawdata = fs.readFileSync(fileName);
    let birthdays = JSON.parse(rawdata);

    console.log(birthdays);
    birthdays[userid] = birthday;
    let data = JSON.stringify(birthdays, null, 4);
    fs.writeFileSync(fileName, data);
    */
    //----------------------------------------------------------------

    if (day <= parseInt(months[month][1]) && day > 0) {
      const userBirthday = await birthdaySchema.find({
        userid: userid,
      });

      if (userBirthday.length == 0) {
        await new birthdaySchema({
          userid: userid,
          month: parseInt(month),
          day: parseInt(day),
        }).save();
      } else {
        await birthdaySchema.updateOne(
          {
            userid: userid,
          },
          {
            month: parseInt(month),
            day: parseInt(day),
          }
        );
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

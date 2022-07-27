// LEGACY CODE
// const fs = require("fs");
// const fileName = "./Data/birthdays.json";

const birthdaySchema = require("../Schemas/birthday");
const { getTime } = require("../helpers/time");
const { sendMessageToServer, dmUser } = require("../helpers/message");
const dayInMs = 86400000;
require("dotenv").config();
const estOffset = 5 * 60 * 60 * 1000;

async function sendBirthdayMessage(client, channel) {
  const date = getTime();
  const currMonth = date.getMonth() + 1;
  const currDay = date.getDate();
  let birthdays;
  try {
    birthdays = await birthdaySchema.find({
      month: currMonth,
      day: currDay,
    });
    // console.log(birthdays);
  } catch (e) {
    console.error(e);
  }

  //---------------------------LEGACY CODE----------------------------
  /*
      // Get all birthdays
      const rawdata = fs.readFileSync(fileName);
      const birthdays = JSON.parse(rawdata);

      // Loop through birthdays and see if it's anyone's birthday
      for (const key in birthdays) {
        const user = client.users.cache.get(key);
        const birthday = birthdays[key].split(" ");
        const month = birthday[0];
        const day = birthday[1];
        if (month == currMonth && day == currDay) {
          console.log(
            `Happy birthday to ${key} on month: ${month}, day: ${day}`
          );
          sendMessageToServer(client, "calendar", `Happy birthday ${user}!`);
        }
      }
      */

  for (let birthday of birthdays) {
    const user = client.users.cache.get(birthday.userid);
    const userMonth = birthday.month;
    const userDay = birthday.day;
    console.log(
      `Happy birthday to ${user} on month: ${userMonth}, day: ${userDay}`
    );
    try {
      sendMessageToServer(
        client,
        channel,
        `🥳 🎂 Happy ${user} day!!! 🎂 🥳`,
        process.env.PROD_ID
      );
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const date = getTime();
    const msPassed = (date.valueOf() - estOffset) % dayInMs;
    const msToWait = dayInMs - msPassed;
    // console.log(`waiting time: ${msToWait}`);

    // Wait until midnight the next night
    setTimeout(async () => {
      // console.log("midnight! (set timeout)");
      // check if it's anyone's birthday
      await sendBirthdayMessage(client, "bot-stuffs");
      // wait a day, check again, repeat every day
      setInterval(async () => {
        // console.log("(set interval)");
        await sendBirthdayMessage(client, "bot-stuffs");
      }, dayInMs);
    }, msToWait);
  },
};

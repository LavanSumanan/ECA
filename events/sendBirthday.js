const birthdaySchema = require("../Schemas/birthday-schema");
const { getTime } = require("../helpers/time");
const { sendMessageToServer, dmUser } = require("../helpers/message");
const dayInMs = 86400000;
require("dotenv").config();
const estOffset = process.env.ENV === "DEV" ? 5 * 60 * 60 * 1000 : 0;

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
    console.log(birthdays);
  } catch (e) {
    console.error(e);
  }

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
        process.env.GUILD_ID
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
    const msPassed = (date.getTime() - estOffset) % dayInMs;
    const msToWait = dayInMs - msPassed;
    console.log(`local date: ${date.toLocaleDateString()}`);
    console.log(`epoch time: ${date.valueOf()}`);
    console.log(`ms passed: ${msPassed}`);
    console.log(`ms to wait: ${msToWait}`);

    // Wait until midnight the next night
    setTimeout(async () => {
      console.log("midnight! (set timeout)");
      // check if it's anyone's birthday
      await sendBirthdayMessage(client, "general");
      // wait a day, check again, repeat every day
      setInterval(async () => {
        console.log("(set interval)");
        await sendBirthdayMessage(client, "general");
      }, dayInMs);
    }, msToWait);
  },
};

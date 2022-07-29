require("dotenv").config();
const { getTime, getCurrentDate } = require("../helpers/time");
const { sendMessageToServer } = require("../helpers/message");
const { GENERAL } = require("../helpers/channelConstants");
const { getBirthdaysByMonthDay } = require("../db/birthdays/get");

const dayInMs = 1000 * 60 * 60 * 24;
const estOffset = process.env.ENV === "DEV" ? 1000 * 60 * 60 * 5 : 0;

async function sendBirthdayMessage(client, channel) {
  const { currMonth, currDay } = getCurrentDate();
  const birthdays = await getBirthdaysByMonthDay(currMonth, currDay);

  for (const birthday of birthdays) {
    if (birthdays.length == 0) return;
    const { userid, month, day } = birthday;
    const user = client.users.cache.get(userid);
    console.log(`Happy birthday to ${user} on month: ${month}, day: ${day}`);
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
    if (process.env.ENV === "DEV") {
      console.log("[EVENT WARNING] sendBirthday turned off in dev");
      return;
    }

    const date = getTime();
    const msPassed = (date.getTime() - estOffset) % dayInMs;
    const msToWait = dayInMs - msPassed;
    console.log(`local date: ${date.toLocaleDateString()}`);

    const currentTime = [
      Math.trunc(msPassed / 1000 / 3600),
      Math.trunc((msPassed / 1000 / 60) % 60),
    ];
    const waitingTime = [
      Math.trunc((dayInMs - msPassed) / 1000 / 3600),
      Math.trunc(((dayInMs - msPassed) / 1000 / 60) % 60),
    ];
    console.log("currentTime", currentTime[0], ":", currentTime[1]);
    console.log("waitingTime", waitingTime[0], ":", waitingTime[1]);
    console.log(
      "midnight",
      currentTime[0] + waitingTime[0],
      ":",
      currentTime[1] + waitingTime[1]
    );

    // Wait until midnight the next night
    setTimeout(async () => {
      console.log("midnight! (set timeout)");
      // check if it's anyone's birthday
      await sendBirthdayMessage(client, GENERAL);
      // wait a day, check again, repeat every day
      setInterval(async () => {
        console.log("(set interval)");
        await sendBirthdayMessage(client, GENERAL);
      }, dayInMs);
    }, msToWait);
  },
};

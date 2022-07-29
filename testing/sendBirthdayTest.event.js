require("dotenv").config();
const { getTime, getCurrentDate } = require("../helpers/time");
const { sendMessageToServer } = require("../helpers/message");
const { GENERAL, TESTGENERAL } = require("../helpers/channelConstants");
const { getBirthdaysByMonthDay } = require("../db/birthdays/get");

const dayInMs = 1000 * 60 * 60 * 24;
const estOffset = 1000 * 60 * 60 * 5;

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
    const date = getTime();
    const msPassed = (date.valueOf() - estOffset) % dayInMs;
    const msToWait = dayInMs - msPassed;

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

    setTimeout(async () => {
      await sendBirthdayMessage(client, TESTGENERAL);
      setInterval(async () => {
        await sendBirthdayMessage(client, TESTGENERAL);
      }, dayInMs);
    }, msToWait);
    // }, 20000);
    // }, 5000);
  },
};

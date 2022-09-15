// ace offs
const getAceOffs = require("../db/aceOff/getAceOffs");
const updateAceOffs = require("../db/aceOff/updateAceOffs");
// tracked messages
const getTrackedMessageId = require("../db/trackedMessages/getTrackedMesssageId");
const updateTrackedMessage = require("../db/trackedMessages/updateTrackedMessage");
// birthdays
const {
  getAllBirthdays,
  getBirthdaysByMonth,
  getBirthdaysByMonthDay,
  getBirthdayByID,
} = require("../db/birthdays/get");
const { addBirthday } = require("../db/birthdays/add");
// messages
const { sendMessageToServer } = require("../helpers/message");

const { default: mongoose } = require("mongoose");
const updateBirthdayByID = require("../db/birthdays/update");
const {
  TESTGENERAL,
  GENERAL,
  BOTSTUFFS,
} = require("../helpers/channelConstants");

module.exports = {
  name: "ready",
  once: "true",
  async execute(client) {
    // console.log(await getAceOffs());
    // console.log(await getTrackedMessageId("aceOffThemeList"));
    // console.log(await updateAceOffs("test 123"));
    // console.log(await updateTrackedMessage("aceOffThemeList", 12345));
    try {
      await mongoose.connect(process.env.MONGO_TEST_URI);
      console.log("[DB Connection open] Database calls event");
    } catch (err) {
      console.log("[ERROR] Failed to connect to DB: ", err);
      return;
    }

    // birthday tests
    // await getAllBirthdays();
    // await getBirthdaysByMonth(7);
    // await getBirthdaysByMonthDay(11, 6);
    // await getBirthdaysByMonthDay(7, 30);
    // await getBirthdaysByMonthDay(11, 7);
    // await getBirthdaysByMonthDay(11, 7);
    // await updateBirthdayByID("4", 4, 4);
    // await getBirthdayByID("4");

    // message tests
    // sendMessageToServer(client, TESTGENERAL, `smts works`, process.env.PROD_ID);

    // await mongoose.connection.close();
    // console.log("[DB Connection close] Database calls event");
  },
};

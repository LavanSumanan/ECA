const birthdaySchema = require("../../Schemas/birthday");

async function addBirthday(userid, month, day) {
  try {
    await new birthdaySchema({
      userid,
      month,
      day,
    }).save();
    console.log(`[LOG] Added birthday for user ${userid} on ${month}/${day}`);
  } catch (e) {
    console.error("[ERROR] Failed to add birthday to MongoDB");
    console.error(e);
  }
}

module.exports = { addBirthday };

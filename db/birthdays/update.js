const birthdaySchema = require("../../Schemas/birthday");

async function updateBirthdayByID(userid, month, day) {
  try {
    await birthdaySchema.updateOne(
      { userid },
      {
        month,
        day,
      }
    );
    console.log(`[LOG] Updated birthday for user ${userid} to ${month}/${day}`);
  } catch (e) {
    console.log(
      `[ERROR] Updating birthday for user ${userid} to ${month}/${day} failed`
    );
    console.error(e);
  }
}

module.exports = { updateBirthdayByID };

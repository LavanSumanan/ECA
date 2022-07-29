const birthdaySchema = require("../../Schemas/birthday");

async function getAllBirthdays() {
  let birthdays = [];
  try {
    birthdays = await birthdaySchema.find({});
    console.log("[LOG] Birthdays (all):", birthdays);
  } catch (e) {
    console.error("[ERROR] Failed to grab all birthdays from MongoDB");
    console.error(e);
  }
  return birthdays;
}

async function getBirthdaysByMonth(month) {
  let birthdays = [];
  try {
    birthdays = await birthdaySchema.find({
      month,
    });
    console.log(`[LOG] Birthdays in month ${month}:`, birthdays);
  } catch (e) {
    console.error(
      `[ERROR] Failed to grab birthdays in month ${month} from MongoDB`
    );
    console.error(e);
  }
  return birthdays;
}

async function getBirthdaysByMonthDay(month, day) {
  let birthdays = [];
  try {
    birthdays = await birthdaySchema.find({
      month,
      day,
    });
    console.log(`[LOG] Birthdays on date ${month}/${day}:`, birthdays);
  } catch (e) {
    console.error(
      `[ERROR] Failed to grab birthdays on date ${month}/${day} from MongoDB`
    );
    console.error(e);
  }
  return birthdays;
}

async function getBirthdayByID(userid) {
  let birthday = null;
  try {
    birthday = await birthdaySchema.findOne({
      userid,
    });
    console.log(`[LOG] Birthday for user ${userid}:`, birthday);
  } catch (e) {
    console.error(
      `[ERROR] Failed to grab birthday for user ${userid} from MongoDB`
    );
    console.error(e);
  }
  return birthday;
}

module.exports = {
  getAllBirthdays,
  getBirthdaysByMonth,
  getBirthdaysByMonthDay,
  getBirthdayByID,
};

const mongoose = require("mongoose");
const birthday = require("./Schemas/birthday");
require("dotenv").config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_TEST_URI);
    console.log("[DB Connection open] Seed file");
  } catch (err) {
    console.log("[ERROR] Failed to connect to DB: ", err);
    return;
  }
};

const seedBirthdays = [
  {
    userid: "280871651065856001",
    month: 11,
    day: 6,
  },
  {
    userid: "3",
    month: 11,
    day: 6,
  },
  {
    userid: "970709253906112572",
    month: 7,
    day: 27,
  },
  {
    userid: "1",
    month: 1,
    day: 1,
  },
  {
    userid: "2",
    month: 2,
    day: 2,
  },
];

(async () => {
  await connectToDb();
  await birthday.deleteMany({});
  await birthday.insertMany(seedBirthdays);
  await mongoose.connection.close();
  console.log("[DB Connection close] Seed file");
})();

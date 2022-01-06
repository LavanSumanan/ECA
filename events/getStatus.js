const mongoose = require("mongoose");
const statusSchema = require("../schemas/status-schema");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await mongoose.connect(process.env.MONGO_URI || "", {
      keepAlive: true,
    });

    let status;

    try {
      status = await statusSchema.find({});
      console.log("Status: ", status[0]);
    } catch (e) {
      console.error(e);
    }

    const name = status[0].name || "feedback!";
    const type = status[0].type || "LISTENING";

    client.user.setPresence({
      activities: [
        {
          name: name,
          type: type,
        },
      ],
      status: "online",
    });
  },
};

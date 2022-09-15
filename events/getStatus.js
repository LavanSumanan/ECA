const statusSchema = require("../Schemas/status");
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    if (process.env.ENV === "DEV") {
      console.log("[EVENT WARNING] getStatus turned off in dev");
      return;
    }

    let status;

    try {
      status = await statusSchema.find({});
      console.log("Status: ", status[0]);
    } catch (e) {
      console.error(e);
    }

    const name = (status[0] && status[0].name) || "feedback!";
    const type = (status[0] && status[0].type) || "LISTENING";

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

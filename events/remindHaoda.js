const { sendMessageToServer, dmUser } = require("../helpers/message");
const yellAtHaodaSchema = require("../Schemas/yellathaoda-schema");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let tasks;

    try {
      tasks = await yellAtHaodaSchema.find({});
    } catch (e) {
      console.error(e);
    }

    setInterval(async () => {
      if (tasks)
        for (let task of tasks) {
          dmUser(client, process.env.HAODA, task.message);
          sendMessageToServer(
            client,
            "general",
            task.message,
            process.env.PROD_ID
          );

          try {
            tasks = await yellAtHaodaSchema.find({});
          } catch (e) {
            console.error(e);
          }
        }
    }, 86400000);
  },
};

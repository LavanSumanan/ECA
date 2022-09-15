require("dotenv").config();
const fs = require("fs");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // get all commands from this guild
    if (!client.application?.owner) await client.application?.fetch();
    const commands = await client.guilds.cache
      .get(process.env.PROD_ID)
      ?.commands.fetch();

    const re = /test/;

    if (commands !== undefined) {
      commands.forEach((command) => {
        //   console.log(command.name, " ", command.id);
        if (re.test(command.name))
          try {
            command.delete();
          } catch (e) {
            console.log(e);
          }
      });
    }
  },
};

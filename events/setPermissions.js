require("dotenv").config();
const fs = require("fs");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // get all commands from this guild
    if (!client.application?.owner) await client.application?.fetch();
    const commands = await client.guilds.cache
      .get(process.env.GUILD_ID)
      ?.commands.fetch();
    console.log(`Fetched ${commands.size} commands`);

    // get each file for the commands
    const commandFiles = client.slashCommands;

    // go through each file to get the access level, find the corresponding guild command,
    // and set the permissions of the command to match the given access level
    commandFiles.forEach(async (file) => {
      if (file.level === "mod") {
        const name = file.data.name;
        const command = await commands.find((c) => c.name == name);

        const permissions = [
          {
            id: process.env.EXEC_ID,
            type: "ROLE",
            permission: true,
          },
          {
            id: process.env.BOT_OWNER,
            type: "USER",
            permission: true,
          },
        ];

        await command.permissions.set({ permissions });
      }
    });
  },
};

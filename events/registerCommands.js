const fs = require("fs"); // file system
const { REST } = require("@discordjs/rest"); // to access discord api
const { Routes } = require("discord-api-types/v9"); // also to access discord api
const { Collection } = require("discord.js"); // class from discord.js library
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    let slashCommandFiles = fs
      .readdirSync("./slash-commands")
      .filter((file) => file.endsWith(".js"));

    if (process.env.ENV == "DEV") {
      const testCommandFiles = fs
        .readdirSync("./testing")
        .filter((file) => file.endsWith(".slash.js"));
      slashCommandFiles = slashCommandFiles.concat(testCommandFiles);
    }

    const slashCommands = [];
    client.slashCommands = new Collection();

    for (const file of slashCommandFiles) {
      let slashCommand;
      if (file.endsWith(".slash.js")) {
        slashCommand = require(`../testing/${file}`);
      } else {
        slashCommand = require(`../slash-commands/${file}`);
      }
      slashCommands.push(slashCommand.data.toJSON());
      client.slashCommands.set(slashCommand.data.name, slashCommand);
    }

    const CLIENT_ID = client.user.id;
    const GUILD_ID = process.env.GUILD_ID;

    // Registering slash commands in the client
    const rest = new REST({
      version: "9",
    }).setToken(process.env.BOT_TOKEN);

    try {
      if (!GUILD_ID) {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: slashCommands,
        });
        console.log(`Successfully registered ${slashCommands.length} application commands globally`);
      } else {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
          body: slashCommands,
        });
        console.log(`Successfully registered ${slashCommands.length} application commands for development guild`);
      }
    } catch (error) {
      if (error) console.error(JSON.stringify(error, null, 2));
    }

    console.log("Bot is online!");
  },
};

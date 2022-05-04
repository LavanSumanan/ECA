console.clear();

// ----------------------------------------------------IMPORTS----------------------------------------------------
const fs = require("fs"); // file system
const { REST } = require("@discordjs/rest"); // to access discord api
const { Routes } = require("discord-api-types/v9"); // also to access discord api
const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js"); // classes from discord.js library
//const { token, prefix, guildId } = require("./Data/config.json");
require("dotenv").config();

// Set up Client
const intents = new Intents(32767);
const client = new Client({
  intents: intents,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// -----------------------------------------EVENTS SETUP----------------------------------------------
let eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

// Testing events
if (process.env.ENV == "DEV") {
  const testEventFiles = fs
    .readdirSync("./testing")
    .filter((file) => file.endsWith(".event.js"));
  eventFiles = eventFiles.concat(testEventFiles);
}

for (const file of eventFiles) {
  let event;
  if (file.endsWith(".deprecated.js")) continue;
  if (file.endsWith(".event.js")) {
    event = require(`./testing/${file}`);
  } else {
    event = require(`./events/${file}`);
  }
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// ----------------------------------------------PREFIX COMMANDS SETUP-----------------------------------------------
const prefixCommandFiles = fs
  .readdirSync("./prefix-commands")
  .filter((file) => file.endsWith(".js"));

client.prefixCommands = new Collection();

for (const file of prefixCommandFiles) {
  const prefixCommand = require(`./prefix-commands/${file}`);
  client.prefixCommands.set(prefixCommand.name, prefixCommand);
}

client.on("guildMemberAdd", (member) => {
  // fix later
  return;

  // DM people when they join with friendly message to explain how stuff works
  member.send(
    `Hello, ${member.user.username}! Welcome to the ECA test server! Find resources here: [] and here: []`
  );
  console.log(`${member.user.username} has joined`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    if (error) console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);

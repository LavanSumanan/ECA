console.clear();

// ----------------------------------------------------IMPORTS----------------------------------------------------
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js");
const mongoose = require("mongoose");
require("dotenv").config();

// Set up Client
const intents = new Intents(32767);
const client = new Client({
  intents: intents,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// MongoDB setup
(async () => {
  await mongoose.connect(process.env.MONGO_URI || "", {
    keepAlive: true,
  });
})();

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
    client.once(event.name, event.execute);
  } else {
    client.on(event.name, event.execute);
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
  // TODO: implement this with correct new member information (e.g. new members guide)
  // perhaps use embeds to make it look nicer
  return;
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

// temporary introduction stuff
client.on("guildMemberAdd", async (member) => {
  if (!member.user.bot)
    await member.user.send("Hey, welcome to ACE! To get started, you can type /introduction or check out the channel #🚨｜start-here!")
})

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);

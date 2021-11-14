console.clear();

// ----------------------------------------------------IMPORTS----------------------------------------------------
const fs = require("fs"); // file system
const { REST } = require("@discordjs/rest"); // to access discord api
const { Routes } = require("discord-api-types/v9"); // also to access discord api
const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js"); // classes from discord.js library
const { token, prefix, guildId, clientId } = require("./Data/config.json");
const intents = new Intents(32767);
const client = new Client({
  intents: intents,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const date = new Date();

// // --------------------------------------------SLASH COMMANDS SETUP----------------------------------------------
const slashCommandFiles = fs
  .readdirSync("./slash-commands")
  .filter((file) => file.endsWith(".js"));

const slashCommands = [];
client.slashCommands = new Collection();

for (const file of slashCommandFiles) {
  const slashCommand = require(`./slash-commands/${file}`);
  slashCommands.push(slashCommand.data.toJSON());
  client.slashCommands.set(slashCommand.data.name, slashCommand);
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

// Runs on bot startup
client.once("ready", () => {
  console.log("Bot is online!");

  // Registering the commands in the client
  const CLIENT_ID = client.user.id;
  const rest = new REST({
    version: "9",
  }).setToken(token);
  (async () => {
    try {
      if (!guildId) {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: slashCommands,
        });
        console.log("Successfully registered application commands globally");
      } else {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
          body: slashCommands,
        });
        console.log(
          "Successfully registered application commands for development guild"
        );
      }
    } catch (error) {
      if (error) console.error(error);
    }
  })();
});

client.on("guildMemberAdd", (member) => {
  // DM people when they join with friendly message to explain how stuff works
  member.send(
    `Hello, ${member.user.username}! Welcome to the ECA test server! Find resources here: [] and here: []`
  );
  console.log(`${member.user.username} has joined`);
});

// this is awful, pls fix
var prevMessage = 0;

client.on("messageCreate", (message) => {
  console.log(message.content);
  // -----------------------------------------------PREFIX COMMANDS------------------------------------------------

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // check which prefix they used
  switch (command) {
    case "reactionrole":
      client.prefixCommands
        .get("reactionrole")
        .execute(message, args, Discord, client);
      break;
    case "feedback":
      const currDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      const currTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const feedback = args.slice(1).join(" ");
      client.channels.cache
        .get(`895124031878090823`)
        .send(`${currDate} @ ${currTime}: ${feedback}`);
      break;
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction, client, Discord);
  } catch (error) {
    if (error) console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord with your client's token
client.login(token);

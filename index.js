console.clear();

// Imports
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");
const { token, prefix, guildId } = require("./Data/config.json");
const intents = new Intents(32767);
const client = new Client({ intents: intents, partials: ["CHANNEL"] });

// Slash commands stuff
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const commands = [];
client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
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
          body: commands,
        });
        console.log("Successfully registered application commands globally");
      } else {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guildId), {
          body: commands,
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

// DM people when they join with friendly message to explain how stuff works
client.on("guildMemberAdd", (member) => {
  member.send(
    `Hello, ${member.user.username}! Welcome to the ECA test server! Find resources here: [] and here: []`
  );
  console.log(`${member.user.username} has joined`);
});

// Check whenever someone sends the bot a message
client.on("messageCreate", (message) => {
  console.log(message.content);

  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.substring(prefix.length).split(/ +/);

  switch (args[0]) {
    case "hello":
      message.reply("Hello!");
      break;
    case "say":
      message.reply(args.slice(1).join(" "));
      break;
    case "feedback":
      const date = new Date();
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

// When a guild member reacts to this message, they are given roles or sent more info
client.on("messageReactionAdd", (reaction, user) => {
  const { name } = reacton.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  console.log(`emoji: ${name}, member: ${member}`);
  if (reaction.message.id === "894246852852068383") {
    if (name === "👀") {
      member.roles.add(894247116837380136);
    }
  } else if (reaction.message.id === "894055890410414130") {
    switch (name) {
      case "🔵":
        member.roles.add(894056913782833192);
        break;
      case "🟠":
        member.roles.add(894056950357196832);
        break;
      case "🟢":
        member.roles.add(894056969898459187);
        break;
      case "🟣":
        member.send(
          "Hi! Please let us know what pronouns you prefer, and we can manually assign you an appropriate role!"
        );
        break;
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction, client);
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

console.clear();

// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");

// Import bot token
const { token, prefix } = require("./Data/config.json");

// Create a new intents instance with all intents (32767)
const intents = new Intents(32767);

// Create a new client instance using all intents
const client = new Client({ intents: intents });

// Create timers
const date = new Date();
let curr = date.getMilliseconds();
let prev = date.getMilliseconds();

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("guildMemberAdd", (member) => {
  member.send(
    `Hello, ${member.user.username}! Welcome to the ECA test server! Find resources here: [] and here: []`
  );
  console.log(`${member.user.username} has joined`);
});

client.on("messageCreate", (message) => {
  //console.log(message.content);

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
      const feedback = args.slice(1).join(" ");
      //send feedback to a specified server channel
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

// Login to Discord with your client's token
client.login(token);

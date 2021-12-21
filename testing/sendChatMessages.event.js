function sendMessageToDevServer(client, inputChannel, message) {
  client.channels.cache
    .find((channel) => channel.name === inputChannel)
    .send(message);
}

function sendMessageToProdServer(client, inputChannel, message) {
  client.guilds.cache
    .get("572591630503378945")
    .channels.cache.find((channel) => channel.name === inputChannel)
    .send(message);
}

function dmUser(client, inputUser, message) {
  client.users.cache.get(inputUser).send(message);
}

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // sendMessageToDevServer(client, "general", "test");
    // sendMessageToProdServer(client, "bot-stuffs", "test");
    // dmUser(client, "280871651065856001", "test123");
  },
};

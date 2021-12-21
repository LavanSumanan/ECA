function sendMessageToServer(client, inputChannel, message, guildID) {
  if (guildID) {
    client.guilds.cache
      .get(guildID)
      .channels.cache.find((channel) => channel.name === inputChannel)
      .send(message);
    return;
  }
  client.channels.cache
    .find((channel) => channel.name === inputChannel)
    .send(message);
}

function dmUser(client, inputUser, message) {
  client.users.cache.get(inputUser).send(message);
}

module.exports = {
  sendMessageToServer: sendMessageToServer,
  dmUser: dmUser,
};

function sendMessageToServer(client, inputChannel, message, guildID) {
  if (guildID) {
    return client.guilds.cache
      .get(guildID)
      .channels.cache.find((channel) => channel.name === inputChannel)
      .send(message);
  } else {
    return client.channels.cache
      .find((channel) => channel.name === inputChannel)
      .send(message);
  }
}

function dmUser(client, inputUser, message) {
  client.users.cache.get(inputUser).send(message);
}

async function editMessageById(
  client,
  inputChannel,
  messageId,
  newMessage,
  toAppend
) {
  let message;
  try {
    message = await client.channels.cache
      .find((channel) => channel.name === inputChannel)
      .messages.fetch(messageId);

    let finalMessage;
    if (toAppend) {
      finalMessage = message.content + "\n" + newMessage;
    } else {
      finalMessage = newMessage;
    }

    await message.edit(finalMessage);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

module.exports = {
  sendMessageToServer: sendMessageToServer,
  dmUser: dmUser,
  editMessageById: editMessageById,
};

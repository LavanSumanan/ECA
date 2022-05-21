function sendMessageToServer(client, inputChannel, message, guildID) {
  if (guildID) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(inputChannel[0])))
      return client.guilds.cache
        .get(guildID)
        .channels.cache.find((channel) => channel.name === inputChannel)
        .send(message)
        .catch((e) =>
          console.log("message did not send to server: ", message, e)
        );
    else
      return client.channels.cache
        .get(inputChannel)
        .send(message)
        .catch((e) =>
          console.log("message did not send to server: ", message, e)
        );
  } else {
    return client.channels.cache
      .find((channel) => channel.name === inputChannel)
      .send(message)
      .catch((e) =>
        console.log("message did not send to server: ", message, e)
      );
  }
}

function replyToServerMessage(client, inputChannel, messageId, reply, guildID) {
  if (guildID) {
    return client.guilds.cache
      .get(guildID)
      .channels.cache.find((channel) => channel.name === inputChannel)
      .messages.fetch(messageId)
      .then((message) => message.reply(reply))
      .catch((e) => console.log("reply did not send to server: ", reply, e));
  } else {
    return client.channels.cache
      .find((channel) => channel.name === inputChannel)
      .messages.fetch(messageId)
      .then((message) => message.reply(reply))
      .catch((e) => console.log("message did not send to server: ", reply, e));
  }
}

function sendEmbedToServer(client, inputChannel, embed, guildID) {
  if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(inputChannel[0]))) {
    return client.channels.cache
      .get(inputChannel)
      .send({ embeds: [embed] })
      .catch((e) => console.log("embed did not send to server: ", e));
  }
  if (guildID) {
    return client.guilds.cache
      .get(guildID)
      .channels.cache.find((channel) => channel.name === inputChannel)
      .send({ embeds: [embed] })
      .catch((e) => console.log("embed did not send to server: ", e));
  } else {
    return client.channels.cache
      .find((channel) => channel.name === inputChannel)
      .send(message)
      .catch((e) => console.log("embed did not send to server: ", e));
  }
}

function dmUser(client, inputUser, message) {
  client.users.cache
    .send(message)
    .catch((e) => console.log("message did not send to user: ", message, e));
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
    message = await fetchMessageById(client, inputChannel, messageId);

    let finalMessage;
    if (toAppend) {
      finalMessage = message.content + "\n" + newMessage;
    } else {
      finalMessage = newMessage;
    }

    await message.edit(finalMessage);
    return true;
  } catch (e) {
    console.log("message did not get edited: ", e);
    return false;
  }
}

function fetchMessageById(client, inputChannel, messageId) {
  return client.channels.cache
    .find((channel) => channel.name === inputChannel)
    .messages.fetch(messageId)
    .catch((e) => console.error(e));
}

module.exports = {
  sendMessageToServer: sendMessageToServer,
  dmUser: dmUser,
  editMessageById: editMessageById,
  sendEmbedToServer: sendEmbedToServer,
  replyToServerMessage: replyToServerMessage,
  fetchMessageById: fetchMessageById,
};

const appreciateEmbed = require("../embeds/appreciate-embed");

function sendMessageToServer(client, inputChannel, message, guildID) {
  if (guildID) {
    return client.guilds.cache
      .get(guildID)
      .channels.cache.find((channel) => channel.name === inputChannel)
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

function sendEmbedToServer(client, inputChannel, embed, guildID, id) {
  if (id) {
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
    .get(inputUser)
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
    console.log("message did not get edited: ", e);
    return false;
  }
}

module.exports = {
  sendMessageToServer: sendMessageToServer,
  dmUser: dmUser,
  editMessageById: editMessageById,
  sendEmbedToServer: sendEmbedToServer,
};

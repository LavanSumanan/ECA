require("dotenv").config();
const { sendMessageToServer } = require("../helpers/message");

module.exports = {
  name: "messageCreate",
  execute(message) {
    if (
      message.guildId === process.env.PROD_ID &&
      message.channelId === process.env.TEST_CHANNEL_ID &&
      message.author.bot === false
    ) {
      console.log(message.content);
      //   message.reply(message.content);
    }
  },
};

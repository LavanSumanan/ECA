require("dotenv").config();
const { sendMessageToServer, dmUser } = require("../helpers/message");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // -----------------------------------ECA Test Server----------------------------------
    // sendMessageToServer(client, "general", "test", process.env.GUILD_ID);
    // -------------------------------------ACE Server-------------------------------------
    // sendMessageToServer(client, "bot-stuffs", "", process.env.PROD_ID);
    // ---------------------------------------User DM--------------------------------------
    // dmUser(client, "280871651065856001", "test123");
  },
};

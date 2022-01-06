require("dotenv").config();
const { sendMessageToServer, dmUser } = require("../helpers/message");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // -----------------------------------ECA Test Server----------------------------------
    // sendMessageToServer(client, "general", "test", process.env.GUILD_ID);
    // -------------------------------------ACE Server-------------------------------------
    // sendMessageToServer(client, "general", "", process.env.PROD_ID);
    // ---------------------------------------User DM--------------------------------------
    // dmUser(client, process.env.BOT_OWNER, "test123");
  },
};

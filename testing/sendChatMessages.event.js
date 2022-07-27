require("dotenv").config();
const {
  TESTGENERAL,
  GENERAL,
  EXECGENERAL,
  BOTSTUFFS,
  ACEOFF,
  LINKSANDRESOURCES,
} = require("../helpers/channelConstants");
const {
  sendMessageToServer,
  dmUser,
  editMessageById,
  sendEmbedToServer,
  replyToServerMessage,
} = require("../helpers/message");
const {
  makeLinksAndResourcesEmbeds,
} = require("../embeds/links-and-resources-embed");
const embeds = makeLinksAndResourcesEmbeds();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // -----------------------------------ECA Test Server----------------------------------
    // sendMessageToServer(client, TESTGENERAL, "test", process.env.GUILD_ID);
    // -------------------------------------ACE Server-------------------------------------
    // sendMessageToServer(client, GENERAL, "", process.env.PROD_ID);
    // replyToServerMessage(client, "", "1234", "", process.env.PROD_ID);
    // editMessageById(client, BOTSTUFFS, "929475949819478118", "", true);
    // embeds.forEach((embed) => {
    // sendEmbedToServer(
    // client,
    // "843262182132809738",
    // embed,
    // process.env.PROD_ID
    // );
    // });
    // ---------------------------------------User DM--------------------------------------
    // dmUser(client, process.env.BOT_OWNER, "test123");
  },
};

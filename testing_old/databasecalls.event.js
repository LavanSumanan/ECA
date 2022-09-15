const getAceOffs = require("../db/aceOff/getAceOffs");
const getTrackedMessageId = require("../db/trackedMessages/getTrackedMesssageId");
const updateAceOffs = require("../db/aceOff/updateAceOffs");
const updateTrackedMessage = require("../db/trackedMessages/updateTrackedMessage");

module.exports = {
  name: "ready",
  once: "true",
  async execute(client) {
    // console.log(await getAceOffs());
    // console.log(await getTrackedMessageId("aceOffThemeList"));
    // console.log(await updateAceOffs("test 123"));
    // console.log(await updateTrackedMessage("aceOffThemeList", 12345));
  },
};

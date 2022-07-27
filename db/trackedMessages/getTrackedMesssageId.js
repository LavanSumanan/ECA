const trackedmessageSchema = require("../../Schemas/trackedmessage");

async function getTrackedMessageId(name) {
  let trackedMessage;
  try {
    trackedMessage = await trackedmessageSchema.findOne({ name });
  } catch (e) {
    console.error(e);
  }

  return trackedMessage ? trackedMessage.id : "";
}

module.exports = getTrackedMessageId;

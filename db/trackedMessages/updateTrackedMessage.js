const trackedmessageSchema = require("../../Schemas/trackedmessage");

async function updateTrackedMessage(name, newid) {
  let trackedmessageEntry;

  try {
    trackedmessageEntry = await trackedmessageSchema.findOne({ name });
  } catch (e) {
    console.error(e);
  }

  if (trackedmessageEntry) {
    try {
      await trackedmessageSchema.updateOne({}, { name, id: newid });
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  try {
    await new trackedmessageSchema({ name, id: newid }).save();
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

module.exports = updateTrackedMessage;

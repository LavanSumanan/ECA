const aceOffSchema = require("../../Schemas/ace-offs");

async function updateAceOffs(message) {
  let aceOffEntry;

  try {
    aceOffEntry = await aceOffSchema.findOne({});
  } catch (e) {
    console.error(e);
  }

  if (aceOffEntry) {
    try {
      await aceOffSchema.updateOne({}, { message });
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  try {
    await new aceOffSchema({ message }).save();
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}

module.exports = updateAceOffs;

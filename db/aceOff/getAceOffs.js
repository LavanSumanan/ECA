const aceOffSchema = require("../../Schemas/ace-offs-schema");

async function getAceOffs() {
  let aceOffEntry;
  try {
    aceOffEntry = await aceOffSchema.findOne({});
  } catch (e) {
    console.error(e);
  }

  return aceOffEntry ? aceOffEntry.message : "";
}

module.exports = getAceOffs;

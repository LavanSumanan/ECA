const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  msgid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("trackedmessage", schema);

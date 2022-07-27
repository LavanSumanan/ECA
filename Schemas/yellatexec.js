const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  exec: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("yellatexec", schema);

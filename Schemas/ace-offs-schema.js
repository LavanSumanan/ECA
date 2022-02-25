const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ace-offs", schema);

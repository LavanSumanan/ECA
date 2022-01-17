const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("yellathaoda", schema);

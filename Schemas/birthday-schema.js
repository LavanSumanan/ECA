const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("birthdays", schema);

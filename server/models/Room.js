const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  showCards: {
    type: Array,
  },
  player: {
    type: Array,
  },
  closeCards: {
    type: Array,
  },
});

module.exports = mongoose.model("rooms", RoomSchema);

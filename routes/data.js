const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  const gameSchema = new Schema({
    id: {type: String},
    name: {type: String, require: true},
    platform: {type: String},
    genre: {type: String},
    completed: {type: Boolean}
  });

  const Games = mongoose.model("games", gameSchema);


  module.exports = Games;

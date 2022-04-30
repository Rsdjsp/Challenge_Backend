const { mongoose } = require("../config/db");
const { Schema } = mongoose;

const characterSchema = new Schema({
  image: {
    type: String,
    required: [true, "The Image url is required"],
  },
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  age: Number,
  weight: String,
  history: String,
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
  ],
});

const CharacterModel = mongoose.model("characters", characterSchema);

module.exports = CharacterModel;

const { mongoose } = require("../config/db");
const { Schema } = mongoose;

const movieSchema = new Schema({
  image: {
    type: String,
    required: [true, "the image url is required"],
  },
  title: {
    type: String,
    required: [true, "The title is required"],
  },
  date: Date,
  rating: Number,
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "characters",
    },
  ],
});

const MovieModel = mongoose.model("movies", movieSchema);

module.exports = MovieModel;

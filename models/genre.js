const { mongoose } = require("../config/db");
const { Schema } = mongoose;

const genreSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  image: {
    type: String,
    required: [true, "the image url is required"],
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
  ],
});

const GenreModel = mongoose.model("genre", genreSchema);

module.exports = GenreModel;

const GenreModel = require("../models/genre");
const MovieModel = require("../models/movie");

class Movie {
  async create(movieInfo) {
    const movie = new MovieModel(movieInfo);
    const validation = this.validate(movie);

    if (validation.error) {
      return { created: false, errors: validation.errorMessages };
    }

    return await movie.save();
  }

  async getAll(params) {
    if (params.title === "" || params.genre === "" || params.order === "") {
      return { success: false, message: "Please insert a valid search param" };
    }
    if (params.genre) {
      const genre = await GenreModel.findById(params.genre).populate(
        "movies",
        "image title date"
      );
      return genre.movies;
    }

    if (params.order === "ASC") {
      const movies = await MovieModel.find(params).sort({ title: 1 });
      return this.response(movies);
    } else if (params.order === "DESC") {
      const movies = await MovieModel.find(params).sort({ title: -1 });
      return this.response(movies);
    } else {
      const movies = await MovieModel.find(params);
      return this.response(movies);
    }
  }
  async response(movies) {
    return movies.map((movie) => ({
      image: movie.image,
      title: movie.title,
      date: movie.date,
    }));
  }

  async getOne(movieId) {
    const movies = await MovieModel.findById(movieId).populate(
      "characters",
      "image name"
    );
    return movies;
  }

  async update(movieInfo, id) {
    const movie = await MovieModel.findByIdAndUpdate(id, movieInfo, {
      new: true,
    });
    return movie;
  }

  async delete(id) {
    const movie = await MovieModel.findByIdAndDelete(id);
    return movie;
  }

  async addCharacter({ idCharacter }, idMovie) {
    const newMovie = await MovieModel.updateOne(
      { _id: idMovie },
      { $push: { characters: { _id: idCharacter } } }
    );
    return newMovie;
  }
  async removeCharacter({ idCharacter }, idMovie) {
    const movie = await MovieModel.findById(idMovie);
    const filtermovie = movie.characters.find(
      (character) => character._id.toString() === idCharacter
    );
    const newMovie = await MovieModel.updateOne(
      { _id: idMovie },
      { $pull: { characters: filtermovie } }
    );
    return newMovie;
  }

  validate(movie) {
    const error = movie.validateSync();
    if (error) {
      const errorMessages = Object.keys(error.errors).map((e) => {
        const errorDetails = error.errors[e];
        if (errorDetails.name === "CastError") {
          return `El campo "${errorDetails.path}" debe ser: "${errorDetails.kind}"`;
        }

        return error.errors[e].message;
      });
      return { error: true, errorMessages };
    }
    return { error: false };
  }
}

module.exports = Movie;

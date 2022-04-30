const GenreModel = require("../models/genre");

class Genre {
  async create(genreData) {
    const genre = new GenreModel(genreData);
    const validation = this.validate(genre);

    if (validation.error) {
      return { created: false, errors: validation.errorMessages };
    }

    return await genre.save();
  }

  async getAll() {
    const newGenre = await GenreModel.find({}).populate(
      "movies",
      "image title"
    );
    return newGenre;
  }

  async addMovie({ idMovie }, idGenre) {
    const newMovie = await GenreModel.updateOne(
      { _id: idGenre },
      { $push: { movies: { _id: idMovie } } }
    );
    return newMovie;
  }
  async removeMovie({ idMovie }, idGenre) {
    const genre = await GenreModel.findById(idGenre);
    const filterGenre = genre.movies.find(
      (movie) => movie._id.toString() === idMovie
    );
    const newMovie = await GenreModel.updateOne(
      { _id: idGenre },
      { $pull: { movies: filterGenre } }
    );
    return newMovie;
  }

  validate(genre) {
    const error = genre.validateSync();
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

module.exports = Genre;

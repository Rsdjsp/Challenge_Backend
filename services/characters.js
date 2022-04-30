const CharacterModel = require("../models/character");
const MovieModel = require("../models/movie");

class Character {
  async getAll(params) {
    if (params.name === "" || params.age === "" || params.movies === "") {
      return { success: false, message: "Please insert a valid search param" };
    }

    if (params.movies) {
      const movie = await MovieModel.findById(params.movies).populate(
        "characters",
        "image name age"
      );
      return movie.characters;
    }

    const character = await CharacterModel.find(params);
    return character.map((pers) => ({
      id: pers._id,
      image: pers.image,
      name: pers.name,
    }));
  }

  async getOne(characterId) {
    const character = await CharacterModel.findById(characterId).populate(
      "movies",
      "image title"
    );
    return character;
  }

  async create(characterInfo) {
    const character = new CharacterModel(characterInfo);
    const validation = this.validate(character);

    if (validation.error) {
      return { created: false, errors: validation.errorMessages };
    }

    return await character.save();
  }

  async update(characterInfo, id) {
    const character = await CharacterModel.findByIdAndUpdate(
      id,
      characterInfo,
      { new: true }
    );
    return character;
  }

  async delete(id) {
    const character = await CharacterModel.findByIdAndDelete(id);
    return character;
  }

  async addMovie({ idMovie }, idCharacter) {
    const newMovie = await CharacterModel.updateOne(
      { _id: idCharacter },
      { $push: { movies: { _id: idMovie } } }
    );
    return newMovie;
  }
  async removeMovie({ idMovie }, idCharacter) {
    const character = await CharacterModel.findById(idCharacter);
    const filtercharacter = character.movies.find(
      (movie) => movie._id.toString() === idMovie
    );
    const newMovie = await CharacterModel.updateOne(
      { _id: idCharacter },
      { $pull: { movies: filtercharacter } }
    );
    return newMovie;
  }

  validate(character) {
    const error = character.validateSync();
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

module.exports = Character;

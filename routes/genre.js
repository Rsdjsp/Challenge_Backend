const express = require("express");
const validateToken = require("../middleware/validate");
const Genre = require("../services/genre");

function genre(app) {
  const router = express.Router();
  const genreService = new Genre();
  app.use("/genre", router);

  router.post("/", validateToken, async (req, res) => {
    const genre = await genreService.create(req.body);
    return res.json(genre);
  });

  router.get("/", validateToken, async (req, res) => {
    const genre = await genreService.getAll();
    return res.json(genre);
  });

  router.put("/:id", validateToken, async (req, res) => {
    const genre = await genreService.addMovie(req.body, req.params.id);
    return res.json(genre);
  });

  router.delete("/:id", validateToken, async (req, res) => {
    const genre = await genreService.removeMovie(req.body, req.params.id);
    return res.json(genre);
  });
}

module.exports = genre;

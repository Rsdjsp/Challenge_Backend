const express = require("express");
const validateToken = require("../middleware/validate");
const Movie = require("../services/movies");

function movies(app) {
  const router = express.Router();
  const movieService = new Movie();
  app.use("/movies", router);

  router.post("/", validateToken, async (req, res) => {
    const movies = await movieService.create(req.body);
    return res.json(movies);
  });

  router.get("/", validateToken, async (req, res) => {
    const movies = await movieService.getAll(req.query);
    return res.json(movies);
  });

  router.get("/:id", validateToken, async (req, res) => {
    const movies = await movieService.getOne(req.params.id);
    return res.json(movies);
  });

  router.put("/:id", validateToken, async (req, res) => {
    const movies = await movieService.update(req.body, req.params.id);
    return res.json(movies);
  });

  router.delete("/:id", validateToken, async (req, res) => {
    const movies = await movieService.delete(req.params.id);
    return res.json(movies);
  });

  router.put("/addCharacter/:id", validateToken, async (req, res) => {
    const movies = await movieService.addCharacter(req.body, req.params.id);
    return res.json(movies);
  });

  router.delete("/removeCharacter/:id", validateToken, async (req, res) => {
    const movies = await movieService.removeCharacter(req.body, req.params.id);
    return res.json(movies);
  });
}

module.exports = movies;

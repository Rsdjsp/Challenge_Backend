const express = require("express");
const validateToken = require("../middleware/validate");
const Character = require("../services/characters");

function characters(app) {
  const router = express.Router();
  const characterService = new Character();
  app.use("/characters", router);

  router.get("/", validateToken, async (req, res) => {
    const characters = await characterService.getAll(req.query);
    return res.json(characters);
  });

  router.get("/:id", validateToken, async (req, res) => {
    const character = await characterService.getOne(req.params.id);
    return res.json(character);
  });

  router.post("/", validateToken, async (req, res) => {
    const newCharacter = await characterService.create(req.body);
    return res.json(newCharacter);
  });

  router.put("/:id", validateToken, async (req, res) => {
    const characterUpdate = await characterService.update(
      req.body,
      req.params.id
    );
    return res.json(characterUpdate);
  });

  router.delete("/:id", validateToken, async (req, res) => {
    const characterDelete = await characterService.delete(req.params.id);
    return res.json(characterDelete);
  });

  router.put("/addMovie/:id", validateToken, async (req, res) => {
    const character = await characterService.addMovie(req.body, req.params.id);
    return res.json(character);
  });

  router.delete("/removeMovie/:id", validateToken, async (req, res) => {
    const character = await characterService.removeMovie(
      req.body,
      req.params.id
    );
    return res.json(character);
  });
}

module.exports = characters;

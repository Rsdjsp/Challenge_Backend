const express = require("express");
const tokenToCookie = require("../helpers/tokenToCookie");
const Auth = require("../services/auth");

function auth(app) {
  const router = express.Router();
  app.use("/auth", router);
  const authService = new Auth();

  router.post("/register", async (req, res) => {
    const newUser = await authService.signUp(req.body);
    return tokenToCookie(res, newUser);
  });
  router.post("/login", async (req, res) => {
    const newUser = await authService.logIn(req.body);
    return tokenToCookie(res, newUser);
  });
}

module.exports = auth;

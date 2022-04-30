const { env } = require("../config");

function tokenToCookie(res, newUser) {
  if (!newUser) {
    return res
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(),
      })
      .json({ loggedOut: true });
  } else {
    if (env === "dev") {
      return res.status(200).cookie("token", newUser.token).json(newUser);
    } else {
      return res
        .status(200)
        .cookie("token", newUser.token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(newUser);
    }
  }
}

module.exports = tokenToCookie;

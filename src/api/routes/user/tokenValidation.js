/* eslint-disable comma-dangle */
const { sign } = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const token = sign(
    { _id: user.id, username: user.username },
    process.env.SECRET_TOKEN,
    {
      expiresIn: "10m",
    }
  );
  return token;
};

const generateRefreshToken = (user) => {
  const token = sign(
    { _id: user.id, username: user.username },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "15d",
    }
  );
  return token;
};

const sendAccessToken = (res, req, accesstoken) => {
  res.send({
    accesstoken,
  });
};

const sendRefreshToken = (res, token) => {
  res.cookie("refreshtoken", token, {
    sameSite: "none",
    secure: true,
    httpOnly: true,
    maxAge: 160000,
    path: "/api/user/refreshtoken",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};

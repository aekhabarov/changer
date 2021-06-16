const jwt = require("jsonwebtoken");
const Token = require("../data-base/models/tokenModel");

class TokenService {
  generateTokens(payload) {
    const accesToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "20d",
    });
    return {
      accesToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();

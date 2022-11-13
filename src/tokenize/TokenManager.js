const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');
const config = require('../utils/config');

const TokenManager = {
  generateAccessToken(payload) {
    return Jwt.token.generate(payload, config.jwt.accessToken.key);
  },

  generateRefreshToken(payload) {
    return Jwt.token.generate(payload, config.jwt.accessToken.age);
  },

  verifyRefreshToken(refreshToken) {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, config.jwt.accessToken.age);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;

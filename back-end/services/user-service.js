const User = require("../data-base/models/userModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error(
        `Пользователь с таким e-mail адресом ${email} уже существует`
      );
    }
    console.log("password:", password);
    const hashPassword = await bcrypt.hash(password, 3);

    const activationLink = uuid.v4();
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();

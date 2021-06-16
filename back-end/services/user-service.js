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
    //Хэшируем пароль
    const hashPassword = await bcrypt.hash(password, 3);
    //Генерируем активационную часть ссылки
    const activationLink = uuid.v4();
    //Создаем нового пользователя
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
    });
    //Высылаем ссылку для активации на email пользователя
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw new Error("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }
}

module.exports = new UserService();

const { hash } = require("bcryptjs");
const AppError = require("../utils/appError");
class userCreateServices {
  constructor(userRepositories) {
    this.userRepositories = userRepositories;
  }
  async execute({ name, email, password }) {
    const checkUserExist = await this.userRepositories.findByEmail(email);

    if (checkUserExist) {
      throw new AppError("Este email ja existe");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepositories.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}

module.exports = userCreateServices;

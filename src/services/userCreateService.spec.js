const UserRepositoriesInMemory = require("../repositories/userRepositoriesInMemory");
const UserCreateService = require("./userCreateServices");

describe("UserCreateService", () => {
  let service = null;
  let userRepositoriesInMemory = null;

  beforeEach(() => {
    userRepositoriesInMemory = new UserRepositoriesInMemory();
    service = new UserCreateService(userRepositoriesInMemory);
  });

  it("user should be created", async () => {
    const user = {
      name: "user test",
      email: "Cw5y0@example.com",
      password: "123456",
    };

    const userCreated = await service.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create an user with exists email", async () => {
    const user1 = {
      name: "user test",
      email: "Cw5y0@example.com",
      password: "123456",
    };

    const user2 = {
      name: "user test",
      email: "Cw5y0@example.com",
      password: "123456",
    };

    await service.execute(user1);
    await expect(service.execute(user2)).rejects.toEqual({
      message: "Este email ja existe",
      statusCode: 400,
    });
  });
});

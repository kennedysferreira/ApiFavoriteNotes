const UserCreateService = require("./userCreateService");
it("user should be created", async () => {
  const user = {
    name: "user test",
    email: "Cw5y0@example.com",
    password: "123456",
  };

  const service = new UserCreateService();
  const userCreated = await service.execute(user);

  expect(userCreated).toHaveProperty("id");
});

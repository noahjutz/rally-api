import Hello from "./model/domain/hello.js";
import User from "./model/domain/user.js";

export default [
  {
    method: "GET",
    path: "/",
    handler: () => Hello.find(),
    config: {
      tags: ["api"],
      description: "Hello, world!",
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/insertUser",
    handler: async (request) => {
      await new User(request.payload).save();
      return User.findOne(request.payload);
    },
    config: {
      tags: ["api"],
      auth: false,
    },
  },
];

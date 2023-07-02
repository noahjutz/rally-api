import Boom from "@hapi/boom";
import Jwt from "jsonwebtoken";
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
    handler: async (request, h) => {
      await new User(request.payload).save();
      return h.response(await User.findOne(request.payload));
    },
    config: {
      tags: ["api"],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: async (request) => {
      const user = request.payload;
      if (await User.findOne(user)) {
        const token = Jwt.sign(user, process.env.JWT_KEY);
        return { token };
      }
      return Boom.unauthorized("Invalid credentials");
    },
    config: {
      tags: ["api"],
      auth: false,
    },
  },
];

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
    handler: async (request, h) => {
      const { username, password } = request.payload;
      if (await User.findOne({ username, password })) {
        const key = process.env.JWT_KEY;
        const jwt = Jwt.sign({ username, password }, key);
        return h.response().state("token", jwt);
      }
      return Boom.unauthorized("Invalid credentials");
    },
    config: {
      tags: ["api"],
      auth: false,
    },
  },
];

import Hello from "./model/domain/hello.js";

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
    handler: () => "Not Yet Implemented",
    config: {
      tags: ["api"],
      auth: false,
    },
  },
];

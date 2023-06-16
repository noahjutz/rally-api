import Hello from "./model/domain/hello.js";

export default [
  {
    method: "GET",
    path: "/",
    handler: () => Hello.find(),
    config: {
      tags: ["api"],
      description: "Hello, world!",
    },
  },
];

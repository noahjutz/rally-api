import Hello from "./model/domain/hello.js";

export default [
  {
    method: "GET",
    path: "/",
    handler: () => Hello.find(),
  },
];

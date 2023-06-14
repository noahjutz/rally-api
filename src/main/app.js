import Hapi from "@hapi/hapi";
import routes from "./routes.js";

const server = Hapi.server({ host: "localhost", port: 8080 });

const init = async () => {
  server.route(routes);
  await server.start();
  console.log("Server running at " + server.info.uri);
};

init();

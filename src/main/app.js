import Hapi from "@hapi/hapi";
import Swagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import routes from "./routes.js";

const swaggerOptions = {
  info: {
    title: "rally-api",
    version: "1.0.0-dev01",
  },
};

const server = Hapi.server({ host: "localhost", port: 8080 });

const init = async () => {
  server.route(routes);

  await server.register([Inert, Vision]);
  await server.register({ plugin: Swagger, options: swaggerOptions });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();

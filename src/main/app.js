import "dotenv/config";
import Hapi from "@hapi/hapi";
import Swagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Mongoose from "mongoose";
import routes from "./routes.js";

const swaggerOptions = {
  info: {
    title: "rally-api",
    version: process.env.npm_package_version,
  },
};

const server = Hapi.server({
  host: process.env.HOST,
  port: process.env.PORT,
});

const init = async () => {
  await Mongoose.connect(process.env.MONGO_URL);
  server.route(routes);

  await server.register([Inert, Vision]);
  await server.register({ plugin: Swagger, options: swaggerOptions });

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();

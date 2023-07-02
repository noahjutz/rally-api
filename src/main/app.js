import "dotenv/config";
import Hapi from "@hapi/hapi";
import Swagger from "hapi-swagger";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Mongoose from "mongoose";
import AuthJwt from "hapi-auth-jwt2";
import routes from "./routes.js";

// todo: authorize request based on decoded JWT token and request
const validate = async () => ({ isValid: true });

const swaggerOptions = {
  info: {
    title: "rally-api",
    version: process.env.npm_package_version,
  },
};

const server = Hapi.server({
  host: process.env.HOST,
  port: process.env.PORT,
  routes: {
    cors: true,
  },
  debug: {
    request: process.env.DEBUG ? ["error"] : [],
  },
});

const init = async () => {
  await Mongoose.connect(`${process.env.MONGO_URL}/rally`);
  server.route(routes);

  await server.register(AuthJwt);
  await server.register([Inert, Vision]);
  await server.register({ plugin: Swagger, options: swaggerOptions });

  server.auth.strategy("jwt", "jwt", { key: process.env.JWT_KEY, validate });
  server.auth.default("jwt");

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

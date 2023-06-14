import Hapi from "@hapi/hapi";

const server = Hapi.server({ host: "localhost", port: 8080 });

const init = async () => {
  await server.start();
  console.log("Server running at " + server.info.uri);
};

init();

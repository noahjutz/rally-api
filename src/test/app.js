import "dotenv/config";
import { assert } from "chai";
import axios from "axios";
import { MongoClient } from "mongodb";

const client = axios.create({ baseURL: "http://localhost:8080" });
const mongoClient = new MongoClient(process.env.MONGO_URL);

suite("app", () => {
  suiteSetup(async () => {
    await mongoClient.connect();
  });

  suiteTeardown(async () => {
    await mongoClient.close();
  });

  test("GET / returns Hello, World!", async () => {
    const res = await client.get("/");
    assert.equal(res.data, "Hello, World!");
  });
});

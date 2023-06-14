import "dotenv/config";
import { assert } from "chai";
import axios from "axios";
import { MongoClient } from "mongodb";

const client = axios.create({ baseURL: "http://localhost:8080" });
const mongoClient = new MongoClient(process.env.MONGO_URL);
const hellos = mongoClient.db("test").collection("hellos");

suite("app", () => {
  suiteSetup(async () => {
    await mongoClient.connect();
  });

  suiteTeardown(async () => {
    await mongoClient.close();
  });

  teardown(async () => {
    await mongoClient.db("test").dropDatabase();
  });

  test("GET / returns hello collection", async () => {
    const myHello = { text: "Hello, world!" };
    await hellos.insertOne(myHello);
    const res = await client.get("/");
    assert.deepEqual(res.data, myHello);
  });
});

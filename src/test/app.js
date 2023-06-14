import "dotenv/config";
import { assert } from "chai";
import axios from "axios";
import { MongoClient } from "mongodb";

const client = axios.create({ baseURL: "http://localhost:8080" });
const mongoClient = new MongoClient(process.env.MONGO_URL);
const testCollection = mongoClient.db("test").collection("test");

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

  test("GET / returns testCollection", async () => {
    const hello = { text: "Hello, world!" };
    await testCollection.insertOne(hello);
    const res = await client.get("/");
    assert.deepEqual(res.data, hello);
  });
});

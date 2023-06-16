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

  test("GET / returns hello collection", async () => {
    const actual = (await client.get("/")).data;
    const expected = (await hellos.find().toArray()).map((e) => {
      e._id = e._id.toString();
      return e;
    }); // todo reformat

    assert.deepEqual(actual, expected);
  });
});

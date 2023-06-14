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
    await hellos.insertOne({ text: "Hello, World!" });

    const actual = (await client.get("/")).data;
    const expected = (await hellos.find().toArray()).map((e) => {
      e._id = e._id.toString();
      return e;
    }); // todo reformat

    console.log("From MongoDB Node Driver:");
    console.log(expected);

    console.log("From mongoose:");
    console.log(actual);

    assert.deepEqual(actual, expected);
  });
});

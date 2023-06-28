import { assert } from "chai";
import { ax, mongo, hellos, users } from "./fixtures.js";
import mapIds from "./util.js";

suite("app", () => {
  suiteSetup(async () => {
    await mongo.connect();
  });

  suiteTeardown(async () => {
    await mongo.close();
  });

  setup(async () => {
    await mongo.db("test").dropDatabase();
    await mongo.db("rally").dropDatabase();
  });

  suite("/", () => {
    test("GET returns hello collection", async () => {
      const actual = (await ax.get("/")).data;
      const expected = mapIds(await hellos.find().toArray());

      assert.deepEqual(actual, expected);
    });
  });

  suite("/insertUser", () => {
    test("POST inserts user to database", async () => {
      await ax.post("/insertUser", { username: "John Doe", password: "123" });
      const actual = await users.find({ username: "John Doe" }).toArray();
      assert.isNotEmpty(actual); // todo make sure result is correct
    });
  });
});

import { assert } from "chai";
import Jwt from "jsonwebtoken";
import { ax, mongo, hellos, users } from "./fixtures.js";
import { mapIds, parseCookie } from "./util.js";

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

  suite("/login", () => {
    test("returns error if wrong credentials", async () => {
      const response = await ax.post("/login", {
        username: "nonexistentUser",
        password: "wrong",
      });
      assert.equal(response.status, 401);
    });
    test("returns valid JWT", async () => {
      const key = process.env.JWT_KEY;

      const user = {
        username: "newUser123",
        password: "password123",
      };
      await users.insertOne(user);
      const response = await ax.post("/login", user);
      const cookie = parseCookie(response.headers["set-cookie"][0]);

      assert.equal(cookie[0], "token");
      assert.doesNotThrow(() => Jwt.verify(cookie[1], key));
    });
  });
});

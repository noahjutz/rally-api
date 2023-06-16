import { assert } from "chai";
import { ax, mongo, hellos } from "./fixtures.js";
import mapIds from "./util.js";

suite("app", () => {
  suiteSetup(async () => {
    await mongo.connect();
  });

  suiteTeardown(async () => {
    await mongo.close();
  });

  test("GET / returns hello collection", async () => {
    const actual = (await ax.get("/")).data;
    const expected = mapIds(await hellos.find().toArray());

    assert.deepEqual(actual, expected);
  });
});

import { assert } from "chai";
import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:8080" });

suite("app", () => {
  test("GET / returns Hello, World!", async () => {
    const res = await client.get("/");
    assert.equal(res.data, "Hello, World!");
  });
});

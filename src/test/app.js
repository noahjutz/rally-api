import { assert } from "chai";
import axios from "axios";

const client = axios.create();

suite("app", () => {
  test("hello world", async () => {
    const res = await client.get("/");
  });
});

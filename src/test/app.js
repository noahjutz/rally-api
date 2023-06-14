import { assert } from "chai";
import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:8080" });

suite("app", () => {
  test("hello world", async () => {
    const res = await client.get("/");
  });
});

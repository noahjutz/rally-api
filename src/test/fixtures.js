import "dotenv/config";
import axios from "axios";
import { MongoClient } from "mongodb";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

export const ax = axios.create({ baseURL: "http://localhost:8080" });
export const mongo = new MongoClient(process.env.MONGO_URL);

export const hellos = mongo.db("test").collection("hellos");
export const users = mongo.db("rally").collection("users");

import "dotenv/config";
import axios from "axios";
import { MongoClient } from "mongodb";

export const ax = axios.create({ baseURL: "http://localhost:8080" });
export const mongo = new MongoClient(process.env.MONGO_URL);

export const hellos = mongo.db("test").collection("hellos");
export const users = mongo.db("rally").collection("users");

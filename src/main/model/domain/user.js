import Mongoose, { Schema } from "mongoose";

export default Mongoose.model(
  "User",
  new Schema({ username: String, password: String })
);

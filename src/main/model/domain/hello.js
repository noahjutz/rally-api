import Mongoose, { Schema } from "mongoose";

export default Mongoose.model("Hello", new Schema({ text: String }));

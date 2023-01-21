import mongoose from "mongoose";

import User from "./user";
import EndPoint from "./endpoint";

const connectDb = () => {
  mongoose.set("useCreateIndex", true);
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { User, EndPoint };

export { connectDb };

export default models;

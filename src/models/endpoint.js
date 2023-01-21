import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema({
  value1: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: String, required: true },
});

const EndPoint = mongoose.model("EndPoint", exampleSchema);

export default EndPoint;

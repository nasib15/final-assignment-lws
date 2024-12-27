import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

const cached = {};

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env");
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }

  return cached.connection;
}

export default dbConnect;

import mongoose, { Mongoose } from "mongoose";

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cashed: MongooseConn = (global as any).mongoose;

if (!cashed) {
  cashed = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (cashed.conn) {
    return cashed.conn;
  }

  cashed.promise =
    cashed.promise ||
    mongoose.connect(mongoUri, {
      dbName: "x-bot",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

  cashed.conn = await cashed.promise;
  return cashed.conn;
};

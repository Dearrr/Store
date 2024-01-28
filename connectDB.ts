import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

async function connectDB() {
  try {
    await mongoose.connect(`${DATABASE_URL}`);
    console.log("Mongo connection successful");
  } catch (error) {
    throw new Error("Error in connecting to mongoDB");
  }
}

export default connectDB;

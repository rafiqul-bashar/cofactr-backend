import mongoose from "mongoose";

export default async function connectDB() {
  const mongoURI = Bun.env.MONGODB_URI;
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected success on # Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  }
}

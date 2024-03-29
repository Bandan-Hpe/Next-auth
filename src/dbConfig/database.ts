import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function Connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongodb connected successfully");
    });

    connection.on("error", (err) => {
      console.log("mongodb connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong with hitting the API");
    console.log(error);
    process.exit();
  }
}

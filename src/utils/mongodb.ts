import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

let db: any = null;

export async function connectToDatabase() {
  if (db) return db;

  try {
    await client.connect();
    db = client.db();
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "blogsummary";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToMongo() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function saveToMongo(data: { url: string; blogText: string }) {
  try {
    const { db } = await connectToMongo();
    const collection = db.collection("blogs");

    await collection.insertOne({
      url: data.url,
      content: data.blogText,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("MongoDB Error:", err);
    throw err;
  }
}

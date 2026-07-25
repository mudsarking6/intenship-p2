import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE || "spacesync";

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing. Add it to atlas-credentials.env before starting the backend.",
  );
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  appName: "SpaceSync",
  serverSelectionTimeoutMS: 10_000,
});

let connectionPromise;

export async function connectToMongoDB() {
  if (!connectionPromise) {
    connectionPromise = client.connect().catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  await connectionPromise;
  return client.db(databaseName);
}

export async function checkMongoDBConnection() {
  const database = await connectToMongoDB();
  await database.command({ ping: 1 });
  return { connected: true, database: database.databaseName };
}

export async function closeMongoDBConnection() {
  if (connectionPromise) {
    await client.close();
    connectionPromise = undefined;
  }
}

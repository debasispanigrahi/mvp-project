
// src/lib/mongodb.js

import { MongoClient } from "mongodb";

if (!import.meta.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

declare global {
  var _mongoConnection: Awaited<ReturnType<typeof connectToDB>>;
}
const uri = import.meta.env.MONGODB_URI;
const options = {};
let cachedMongo: Awaited<ReturnType<typeof connectToDB>>;

const connectToDB = async () => {
  const mongo = await new MongoClient(uri, options).connect();
  return mongo.db("astro-mvp");
};

export const getDB = async () => {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (import.meta.env.NODE_ENV === "development") {
    if (!global._mongoConnection) {
      global._mongoConnection = await connectToDB();
      cachedMongo = global._mongoConnection;
    }
    return cachedMongo||global._mongoConnection;
  }
  const mongo = await connectToDB();
  return mongo;
};
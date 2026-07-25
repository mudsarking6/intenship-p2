import {
  checkMongoDBConnection,
  closeMongoDBConnection,
} from "./mongodb.mjs";

try {
  const result = await checkMongoDBConnection();
  console.log(`MongoDB connected successfully. Database: ${result.database}`);
} catch (error) {
  console.error(`MongoDB connection failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await closeMongoDBConnection();
}

// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: {
  vendors?: mongoDB.Collection,
  deals?:mongoDB.Collection,
  trips?: mongoDB.Collection,
  users?: mongoDB.Collection,
  tags?: mongoDB.Collection,
  wishlist?: mongoDB.Collection
} = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const vendorsCollection: mongoDB.Collection = db.collection(
    process.env.VENDORS_COLLECTION_NAME || 'vendors');
  const dealsCollection: mongoDB.Collection = db.collection(
    process.env.DEALS_COLLECTION_NAME || 'deals');
  const tripsCollection: mongoDB.Collection = db.collection(
    process.env.TRIPS_COLLECTION_NAME || 'trips'
  );
  const wishlistCollection: mongoDB.Collection = db.collection(
      process.env.WISHLIST_COLLECTION_NAME || 'wishlist'
  );
  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME || 'users'
  );
  const tagsCollection: mongoDB.Collection = db.collection(
    process.env.TAGS_COLLECTION_NAME || 'tags'
  );


  collections.vendors = vendorsCollection; 
  collections.deals = dealsCollection; 
  collections.trips = tripsCollection;
  collections.users = usersCollection;
  collections.tags = tagsCollection;
  collections.wishlist = wishlistCollection;

  console.log(`Successfully connected to database: ${db.databaseName} 
  and collections:
  ${vendorsCollection.collectionName},
  ${dealsCollection.collectionName}, 
  ${tripsCollection.collectionName}
  ${usersCollection.collectionName},
  ${tagsCollection.collectionName},
  ${wishlistCollection.collectionName}`);
}

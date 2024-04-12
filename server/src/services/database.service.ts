// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { trips?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const tripsCollection: mongoDB.Collection = db.collection(process.env.TRIPS_COLLECTION_NAME);
 
    collections.trips = tripsCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${tripsCollection.collectionName}`);
 }
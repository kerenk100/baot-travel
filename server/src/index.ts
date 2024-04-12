import express from "express";
import { connectToDatabase } from "./services/database.service"
import { tripsRouter } from "./routes/trips.router";

const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        // send all calls to /trips to our tripsRouter
        app.use("/trips", tripsRouter);

        // start the Express server
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
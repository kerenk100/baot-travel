import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";
import { vendorsRouter } from "./routes/vendors.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5174' // Only allow this origin to access your API
}));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverrrr");
});

 connectToDatabase()
    .then(() => {
        app.use("/vendors", vendorsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);// move up and catch if theres an err
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
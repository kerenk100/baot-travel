import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";
import { userRouter } from "./routes/user.router";
import { vendorsRouter } from "./routes/vendors.router";
import { tripsRouter } from "./routes/trips.router";
import { tagsRouter } from "./routes/tags.router";

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
const port = process.env.port || 8080; // default port to listen

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173' // Only allow this origin to access your API
}));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Serverrrr");
});

connectToDatabase()
  .then(() => {
    app.use("/vendors", vendorsRouter);
    app.use("/trips", tripsRouter);
    app.use("/user", userRouter);
    app.use("/tags", tagsRouter);

    app.get("/", (req, res) => {
      res.send("hello");
    });

    // start the Express server
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./services/database.service";
import { userRouter } from "./routes/user.router";
import { tripsRouter } from "./routes/trips.router";

const app = express();

app.use(bodyParser.json());
const port = process.env.port || 8080; // default port to listen

connectToDatabase()
  .then(() => {
    app.use("/trips", tripsRouter);
    app.use("/user", userRouter);

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

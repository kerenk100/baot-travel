import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { User } from "../models/user";
import crypto from "crypto";

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(await collections.users.find<User>({}).toArray());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const existUser = await collections.users.findOne({
      email: req.body.email,
    });

    if (existUser) {
      return res.status(400).send("User already exists. Please sign in");
    }

    let newUser = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.dateOfBirth,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.country
    );

    newUser.salt = crypto.randomBytes(16).toString("hex");
    newUser.hash = crypto
      .pbkdf2Sync(req.body.password, newUser.salt, 1000, 64, `sha512`)
      .toString(`hex`);

    const result = await collections.users?.insertOne(newUser);

    result
      ? res
          .status(201)
          .send(`Successfully created a new user with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new user.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.details[0].message);
  }
});

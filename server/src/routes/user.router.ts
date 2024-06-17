import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { User } from "../models/user";
import crypto from "crypto";
import { ObjectId } from 'mongodb';
import { clearToken, generateToken } from "../utils/auth";


export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send(await collections.users.find<User>({}).toArray());
  } catch (error) {
    res.status(500).send(error.message);
  }
});


userRouter.post("/login", async (req: Request, res: Response) => {
  try {
  const { email, password } = req.body;
  const user = await collections.users.findOne({email});

  const verifyPassword = (password: string, storedHash: string, storedSalt: string) => {
    const hash = crypto.pbkdf2Sync(password, storedSalt, 1000, 64, 'sha512').toString('hex');
    return hash === storedHash;
};

  if (user && (verifyPassword(password, user.hash, user.salt))) {
    console.log("Password is correct!")
    generateToken(res, user._id.toString());
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401).send({ message: "User not found / password incorrect" });
  }
} catch (error) {
  res.status(500).send(error.message);
}
});

userRouter.post("/logout", async (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "User logged out" });
});


userRouter.get("/partners-search", async (req: Request, res: Response) => {
  try {
    const partnerUsers = (await collections.users.find<User>({ partnerSearch: "yes" }, { projection: { email: 1, firstName: 1, lastName: 1, _id: 0 } }).toArray());
    res.status(200).send(partnerUsers);
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

    console.log('req.body', req.body);

    let newUser = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.dateOfBirth,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.country,
      req.body.connectedUsers,
      req.body.partnerSearch,
      req.body.image
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

userRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const user = await collections.users.findOne({ _id: new ObjectId(req.params.userId) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

userRouter.put("/:userId/edit", async (req: Request, res: Response) => {
  try {
    // Update user data in the database
    delete req.body._id;
    const result = await collections.users.updateOne(
      { _id: new ObjectId(req.params.userId) },
      { $set: req.body } // Send entire req.body to update all fields
    );

    if (result.modifiedCount === 1) {
      res.status(200).send("User data updated successfully");
    } else {
      res.status(404).send("User was not updated");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


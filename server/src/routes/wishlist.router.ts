// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Wish from "../models/wish";

// Global Config
export const wishlistRouter = express.Router();

wishlistRouter.use(express.json());
// GET
wishlistRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const userId = _req.headers ? _req.headers.authorization : null;
    if (!userId) {
      throw new Error("No user");
    }

    const wishlist = (await collections.wishlist
      .find<Wish>({ userId: userId })
      .toArray()) as Wish[];
    res.status(200).send(wishlist);
  } catch (error) {
    if (error.message == "No user") {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

wishlistRouter.get("/trips", async (_req: Request, res: Response) => {
  try {
    const userId = _req.headers ? _req.headers.authorization : null;
    if (!userId) {
      throw new Error("No user");
    }

    const trips = await collections.wishlist
      .aggregate([
        {
          $match: { userId: userId },
        },
        {
          $lookup: {
            from: process.env.TRIPS_COLLECTION_NAME,
            localField: "tripId",
            foreignField: "_id",
            as: "tripDetails",
          },
        },
        {
          $unwind: "$tripDetails",
        },
        {
          $addFields: { "tripDetails.wishId": "$_id" },
        },
        {
          $replaceRoot: { newRoot: "$tripDetails" },
        },
      ])
      .toArray();

    res.status(200).send(trips);
  } catch (error) {
    if (error.message == "No user") {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

// POST
wishlistRouter.post("/:tripId", async (req: Request, res: Response) => {
  try {
    const userId = req.headers ? req.headers.authorization : null;
    if (!userId) {
      throw new Error("No user");
    }
    const wish = {
      userId: req.headers.authorization,
      tripId: new ObjectId(req.params.tripId),
    };
    console.log({ wish });
    const exists = await collections.wishlist.findOne(wish);
    if (exists) {
      throw new Error("conflict");
    }
    const result = await collections.wishlist.insertOne(wish);
    result
      ? res.status(200).send(result.insertedId)
      : res.status(500).send("Failed to add trip to the wishlist.");
  } catch (error) {
    console.error(error);
    if (error.message == "conflict") {
      res.status(409).send("User already liked this trip");
    } else if (error.message == "No user") {
      res.status(404).send(error.message);
    } else {
      res.status(400).send(error.message);
    }
  }
});

// DELETE
wishlistRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.wishlist.deleteOne(query);

    if (result && result.deletedCount) {
      res
        .status(202)
        .send(`Successfully removed trip with id ${id} from the wishlist.`);
    } else if (!result) {
      res
        .status(400)
        .send(`Failed to remove trip with id ${id} from the wishlist`);
    } else if (!result.deletedCount) {
      res.status(404).send(`trip with id ${id} does not exist in the wishlist`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

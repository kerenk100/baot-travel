// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Trip from "../models/trip";

// Global Config
export const wishlistRouter = express.Router();

wishlistRouter.use(express.json());
// GET
wishlistRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const wishlist = (await collections.wishlist.find<Trip>({}).toArray()) as Trip[];
        res.status(200).send(wishlist);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

wishlistRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const trip = (await collections.wishlist.findOne<Trip>(query)) as Trip;

        if (trip) {
            res.status(200).send(trip);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching wishlist trip with id: ${req.params.id}`);
    }
});

// POST
wishlistRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newTrip = req.body as Trip;
        const result = await collections.wishlist.insertOne(newTrip);

        result
            ? res.status(201).send(`Successfully added a new trip with id ${result.insertedId} to the wishlist.`)
            : res.status(500).send("Failed to add a new trip to the wishlist.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// DELETE
wishlistRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.wishlist.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed trip with id ${id} from the wishlist.`);
        } else if (!result) {
            res.status(400).send(`Failed to remove trip with id ${id} from the wishlist`);
        } else if (!result.deletedCount) {
            res.status(404).send(`trip with id ${id} does not exist in the wishlist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
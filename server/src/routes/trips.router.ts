// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Trip from "../models/trip";

// Global Config
export const tripsRouter = express.Router();

tripsRouter.use(express.json());
// GET
tripsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const trips = (await collections.trips.find<Trip>({}).toArray()) as Trip[];

        res.status(200).send(trips);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

tripsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const trip = (await collections.trips.findOne<Trip>(query)) as Trip;

        if (trip) {
            res.status(200).send(trip);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
tripsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newTrip = req.body as Trip;
        const result = await collections.trips.insertOne(newTrip);

        result
            ? res.status(201).send(`Successfully created a new trip with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new trip.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT
tripsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedTrip: Trip = req.body as Trip;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.trips.updateOne(query, { $set: updatedTrip });

        result
            ? res.status(200).send(`Successfully updated trip with id ${id}`)
            : res.status(304).send(`trip with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
tripsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.trips.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed trip with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove trip with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`trip with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Deal from "../models/deal";

// Global Config
export const dealsRouter = express.Router();

dealsRouter.use(express.json());

// GET
dealsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const deals = (await collections.deals?.find<Deal>({}).toArray()) as Deal[];

        res.status(200).send(deals);
    } catch (error) {
        res.status(500).send(error);
    }
});

dealsRouter.get("/:vendorId", async (req: Request, res: Response) => {
    const vendorId = req?.params?.vendorId;

    try {
        
        const query = { vendorId: vendorId };
        const deal = (await collections.deals?.findOne<Deal>(query)) as Deal;

        if (deal) {
            res.status(200).send(deal);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.vendorId}`);
    }
});

// POST
dealsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newDeal = req.body as Deal;
        const result = await collections.deals?.insertOne(newDeal);

        result
            ? res.status(201).send(`Successfully created a new deal with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new deal.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// PUT
dealsRouter.put("/", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedDeal: Deal = req.body as Deal;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.deals?.updateOne(query, { $set: updatedDeal });

        result
            ? res.status(200).send(`Successfully updated deal with id ${id}`)
            : res.status(304).send(`Deal with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// DELETE
dealsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.deals?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed deal with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove deal with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Deal with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
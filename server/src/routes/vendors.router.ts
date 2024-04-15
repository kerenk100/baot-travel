// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Vendor from "../models/vendor";

// Global Config
export const vendorsRouter = express.Router();

vendorsRouter.use(express.json());

// GET
vendorsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const vendors = (await collections.vendors?.find<Vendor>({}).toArray()) as Vendor[];

        res.status(200).send(vendors);
    } catch (error) {
        res.status(500).send(error);
    }
});

vendorsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const vendor = (await collections.vendors?.findOne<Vendor>(query)) as Vendor;

        if (vendor) {
            res.status(200).send(vendor);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST
vendorsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newVendor = req.body as Vendor;
        const result = await collections.vendors?.insertOne(newVendor);

        result
            ? res.status(201).send(`Successfully created a new vendor with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new vendor.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// PUT
vendorsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedVendor: Vendor = req.body as Vendor;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.vendors?.updateOne(query, { $set: updatedVendor });

        result
            ? res.status(200).send(`Successfully updated vendor with id ${id}`)
            : res.status(304).send(`Vendor with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// DELETE
vendorsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.vendors?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed vendor with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove vendor with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Vendor with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
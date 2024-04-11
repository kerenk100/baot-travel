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

// PUT

// DELETE
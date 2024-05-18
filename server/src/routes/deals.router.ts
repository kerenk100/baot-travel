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
    const deals = (await collections.deals.find<Deal>({}).toArray()) as Deal[];

    res.status(200).send(deals);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

dealsRouter.get("/vendor/:vendorid", async (req: Request, res: Response) => {
  const uniqueValue = req.params.vendorid;

  try {
    const deals = (await collections.deals
      .find({
        vendorId: req.params.vendorid,
      })
      .toArray()) as unknown as Deal[];

    res.status(200).send(deals);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST
dealsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newDeal = req.body;
    const result = await collections.tags.insertOne(newDeal);

    result
      ? res
          .status(201)
          .send(`Successfully created a new deal with id ${result.insertedId}`)
      : res.status(400).send("Failed to create a new deal.");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// PUT
dealsRouter.put("/:value", async (req: Request, res: Response) => {
  const uniqueValue = req?.body?.value;

  try {
    const updatedTrip: Deal = req.body as Deal;
    const query = { _id: new ObjectId(uniqueValue) };

    const result = await collections.tags.updateOne(query, {
      $set: updatedTrip,
    });

    result
      ? res.status(200).send(`Successfully updated deal with id ${uniqueValue}`)
      : res
          .status(304)
          .send(`Deal with uniqueValue: ${uniqueValue} not updated`);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE
dealsRouter.delete("/:id", async (req: Request, res: Response) => {
  const uniqueValue = req?.body?.value;

  try {
    const query = { _id: new ObjectId(uniqueValue) };
    const result = await collections.tags.deleteOne(query);

    if (result && result.deletedCount) {
      res
        .status(202)
        .send(`Successfully removed deal with uniqueValue ${uniqueValue}`);
    } else if (!result) {
      res
        .status(400)
        .send(`Failed to remove deal with uniqueValue ${uniqueValue}`);
    } else if (!result.deletedCount) {
      res
        .status(404)
        .send(`trip with uniqueValue ${uniqueValue} does not exist`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

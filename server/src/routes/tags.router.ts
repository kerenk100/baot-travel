// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Tag from "../models/tag";

// Global Config
export const tagsRouter = express.Router();

tagsRouter.use(express.json());
// GET
tagsRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const tags = (await collections.tags.find<Tag>({}).toArray()) as Tag[];

    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

tagsRouter.get("/:value", async (req: Request, res: Response) => {
  const uniqueValue = req?.body?.value;

  try {
    const tag = await collections.tags.findOne<Tag>(uniqueValue);

    if (tag) {
      res.status(200).send(tag);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching tag with value: ${uniqueValue}`);
  }
});

// POST
tagsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newTag = req.body;
    const result = await collections.tags.insertOne(newTag);

    result
      ? res
          .status(201)
          .send(`Successfully created a new trip with id ${result.insertedId}`)
      : res.status(400).send("Failed to create a new trip.");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// PUT
tagsRouter.put("/:value", async (req: Request, res: Response) => {
  const uniqueValue = req?.body?.value;

  try {
    const updatedTrip: Tag = req.body as Tag;
    const query = { _id: new ObjectId(uniqueValue) };

    const result = await collections.tags.updateOne(query, {
      $set: updatedTrip,
    });

    result
      ? res.status(200).send(`Successfully updated trip with id ${uniqueValue}`)
      : res
          .status(304)
          .send(`trip with uniqueValue: ${uniqueValue} not updated`);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE
tagsRouter.delete("/:id", async (req: Request, res: Response) => {
  const uniqueValue = req?.body?.value;

  try {
    const query = { _id: new ObjectId(uniqueValue) };
    const result = await collections.tags.deleteOne(query);

    if (result && result.deletedCount) {
      res
        .status(202)
        .send(`Successfully removed trip with uniqueValue ${uniqueValue}`);
    } else if (!result) {
      res
        .status(400)
        .send(`Failed to remove trip with uniqueValue ${uniqueValue}`);
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

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
  const currentUserId = _req.headers ? _req.headers.authorization : null; 
  if (currentUserId) {
    console.log("yes user")
    try {
      const trips = (await collections.trips
        .aggregate([
          {
            $lookup: {
              from: process.env.WISHLIST_COLLECTION_NAME,
              localField: "_id",
              foreignField: "tripId",
              as: "wishDetails"
            }
          },
          {
            $unwind: {
              path:"$wishDetails",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $addFields:{wishId:"$wishDetails._id"}
          },
          {
            $project:{
              wishDetails:0
            }
          }
        ]).toArray()) as (Trip & { wishId: string })[];
      res.status(200).send(trips);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    try {
      const trips = (await collections.trips
        .find<Trip>({})
        .toArray()) as Trip[];
      if (trips) {
        res.status(200).send(trips);
      }
    } catch (error) {
      res.status(500).send(`An error occured while fetching trips`);
    }
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
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
tripsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newTrip = req.body as Trip;
    const result = await collections.trips.insertOne(newTrip);
    const insertedTrip = await collections.trips.findOne({
      _id: result.insertedId,
    });

    result
      ? res.status(201).send(insertedTrip)
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

    const result = await collections.trips.updateOne(query, {
      $set: updatedTrip,
    });

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

tripsRouter.get("/:id/suggested_trips", async (req: Request, res: Response) => {
  try {
    const id = new ObjectId(req?.params?.id);
    const currentTrip = await collections.trips.findOne({ _id: id });

    let suggestedTripsQuery: object[];
    const tags = currentTrip.tags ?? [];
    const country = currentTrip.country;

    const tagQuery = { $match: { tags: { $in: tags } } };
    const countryQuery = { $match: { country: country } };
    const randomQuery = { $sample: { size: 3 } };
    const excludeQuery = { $match: { _id: { $ne: id } } }; // Exclude documents with the given ID

    suggestedTripsQuery = [
      {
        $facet: {
          tagResults: [tagQuery, { $sample: { size: 3 } }, excludeQuery],
          countryResults: [
            countryQuery,
            { $sample: { size: 3 } },
            excludeQuery,
          ],
          randomResults: [randomQuery, excludeQuery],
        },
      },
      {
        $project: {
          suggestions: {
            $setUnion: ["$tagResults", "$countryResults", "$randomResults"],
          },
        },
      },
      { $unwind: "$suggestions" },
      { $sample: { size: 3 } },
      { $replaceRoot: { newRoot: "$suggestions" } },
    ];

    const suggestedTrips = await collections.trips
      .aggregate(suggestedTripsQuery)
      .toArray();

    res.status(200).send(suggestedTrips);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

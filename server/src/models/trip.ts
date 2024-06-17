// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Trip {
    constructor(public title: string,
        public startDate: Date, 
        public endDate: Date,
        public description: string,
        public image: string,
        public budget: number,
        public country: string,
        public isPublic: boolean,
        public _id?: ObjectId,
        public tags?: string[]
    ) {}
}
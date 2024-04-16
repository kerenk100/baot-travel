// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Trip {
    constructor(public title: string,
        public startDate: Date, 
        public endDate: Date,
        public category: string[], 
        public description: string,
        public image: string,
        public budget: number,
        public destination: string,
        public isPublicPost: boolean,
        public id?: ObjectId
    ) {}
}
// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Deal {
    constructor(
        public vendorId: string, 
        public description: string, 
        public link: string, 
        public startDate: Date,
        public endDate: Date,
        public id?: ObjectId) {}
}

// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Vendor {
    constructor(
        public vendorId: string,
        public name: string, 
        public type: string, 
        public website: string, 
        public phoneNumber: number,
        public email: string,
        public tags: string[],
        public id?: ObjectId) {}
}

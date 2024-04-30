// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Tag {
    constructor(
        public tagId: string, 
        public label: string, 
        public value: string, 
        public id?: ObjectId) {}
}

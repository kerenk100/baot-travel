// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Trip {
    constructor(public title: string, public date: Date, public category: string, public id?: ObjectId) {}
}
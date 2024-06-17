// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Wish {
    constructor(
        public userId: string,
       public tripId:string,
       public wishId:ObjectId
    ) {}
}
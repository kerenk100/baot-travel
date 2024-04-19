import React from 'react'
import { Trip } from './components/Trip/Trip'

export interface TripProps{
    id:string
    name:string,
    description:string,
    country:string,
    tags:string[],

}
export interface TripsFeedProps{
    trips:TripProps[]
    isLoading:boolean
}
export const TripsFeed:React.FC<TripsFeedProps> =({trips, isLoading})=>{

    return isLoading ? <div>Loading...</div> : trips.map((trip)=>{
        return <Trip {...trip}/>
    })

}
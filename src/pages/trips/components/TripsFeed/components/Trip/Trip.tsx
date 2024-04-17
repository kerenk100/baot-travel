import { Box, Chip } from "@mui/material"
import { TripProps,  } from "../../TripsFeed"

export const Trip:React.FC<TripProps> = ({country,description,name,tags})=>{
    return <Box>
        <div>{name}</div>
        <div>{country}</div>
        <div>{description}</div>
        {tags.map((tag)=> <Chip label={tag}/>)}
    </Box>
}
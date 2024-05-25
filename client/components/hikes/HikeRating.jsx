import React, {useState} from "react";
import { Rating, Button, Box } from "@mui/material";

const HikeRating = ({ savedRating, rateFavHike }) => {
  const [newRating, setRating] = useState(savedRating);

  const handleChange = (e) => {
    setRating(e.target.value)
  }
  
  const handleSubmit = () => {
    rateFavHike(newRating)
  }

  return (
    <Box sx={{margin: 1, display: 'flex', justifyContent:'start'}}>
      <Rating value={+newRating} onChange={handleChange} />
      <Button onClick={handleSubmit}>Rate</Button>
    </Box>
  )
}

export default HikeRating;
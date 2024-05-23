import React from "react";
import { Chip } from "@mui/material";

const Tag = ({ tag }) => {
  const { name, color } = tag;
  return (
    <Chip size="small" sx={{backgroundColor: color, color: 'grey'}} label={name} />
  )
}

export default Tag;
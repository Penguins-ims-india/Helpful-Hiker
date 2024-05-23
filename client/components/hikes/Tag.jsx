import React from "react";
import { Chip } from "@mui/material";

const Tag = ({ tag, deleteTag }) => {
  const { name, color } = tag;
  return (
    <Chip size="small" sx={{backgroundColor: color, color: 'black'}} label={name} onDelete={() => {deleteTag(tag.id)}}/>
  )
}

export default Tag;
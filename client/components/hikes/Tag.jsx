import React from "react";
import { Chip } from "@mui/material";

const Tag = ({ tag, deleteTag, handleClick }) => {
  const { name, color } = tag;
  const styling = {backgroundColor: color, color: 'black', margin: 1}
  return (
    deleteTag ?
    <Chip size="small" sx={styling} label={name} onDelete={() => {deleteTag(tag.id)}}/> :
    <Chip onClick={() => handleClick(tag)} size="small" sx={styling} label={name}/>
  )
}

export default Tag;
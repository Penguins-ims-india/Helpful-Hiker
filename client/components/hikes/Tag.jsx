import React from "react";
import { Chip } from "@mui/material";

const Tag = ({ tag, deleteTag, handleClick, changeFilter }) => {
  const { name, color } = tag;
  const styling = {backgroundColor: 'white', color, margin: 1, borderColor: color}
  return (
    deleteTag ?
    <Chip variant="outlined" size="small" sx={styling} label={name} onClick={() => changeFilter(name)} onDelete={() => {deleteTag(tag.id)}}/> :
    <Chip variant='outlined' size="small" sx={styling} label={name} onClick={() => handleClick(tag)}/>
  )
}

export default Tag;
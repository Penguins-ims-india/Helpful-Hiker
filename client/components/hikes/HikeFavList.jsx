import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import HikeFav from './HikeFav.jsx';

const HikeFavList = ({ favHikes, getFavHikes }) => {

  const [tags, setTags] = useState([]);
  const tagsRef = useRef(tags)
  
  useEffect(() => {
    axios.get('/hikes/tags')
      .then(({data}) => {
        setTags(data);
      })
      .catch((err) => {
        console.error('Cannot get all tags: ', err);
      })
  }, tagsRef)

  console.log(tags)

  return (
    <div className="fav-hike-list">
      {
        favHikes.map((favHike, i) => {
          return (
            <HikeFav
              favHike={ favHike }
              key={`${favHike}-${i}`}
              getFavHikes={ getFavHikes }
              allTags={tags}
            />
          )
        })
      }
    </div>
  )
}

export default HikeFavList;
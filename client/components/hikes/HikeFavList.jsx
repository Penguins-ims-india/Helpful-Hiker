import React, {useState} from 'react';
import axios from 'axios';
import HikeFav from './HikeFav.jsx';

const HikeFavList = ({ favHikes, getFavHikes, allTags }) => {

  const [filter, setFilter] = useState('all')

  const filteredHikes = favHikes[filter] || [];
  console.log('allTags', allTags)

  return (
    <div className="fav-hike-list">
      {
        filteredHikes.map((favHike, i) => {
          return (
            <HikeFav
              favHike={ favHike }
              key={`${favHike}-${i}`}
              getFavHikes={ getFavHikes }
              allTags={allTags}
            />
          )
        })
      }
    </div>
  )
}

export default HikeFavList;
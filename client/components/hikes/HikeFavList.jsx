import React, {useState} from 'react';
import axios from 'axios';
import HikeFav from './HikeFav.jsx';

const HikeFavList = ({ favHikes, getFavHikes, allTags }) => {

  const [filter, setFilter] = useState('all')

  const changeFilter = (newFilter) => {
    if (favHikes.hasOwnProperty(newFilter)) { setFilter(newFilter); }
  }

  const filteredHikes = favHikes[filter] || [];

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
              changeFilter={changeFilter}
            />
          )
        })
      }
    </div>
  )
}

export default HikeFavList;
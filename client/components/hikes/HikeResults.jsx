import React from 'react';

import HikeResult from './HikeResult.jsx';

const HikeResults = ({ results, getFavHikes }) => {

  return (
    <div className="hike-search-result-list">
      {
        results.map((result, i) => {
          return (
            <HikeResult
              hike={ result }
              key={`${result}-${i}`}
              getFavHikes={ getFavHikes }
            />
          )
        })
      }
    </div>
  )
}

export default HikeResults;
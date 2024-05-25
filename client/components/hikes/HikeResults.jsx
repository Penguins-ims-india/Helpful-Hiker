import React from 'react';

import HikeResult from './HikeResult.jsx';

const HikeResults = ({ results, getFavHikes }) => {

  return (
    <div className="hike-search-result-list">
      <form >
        <input >Start Date</input>
        <input >End Date</input>
        <button type='submit'/>
      </form>
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
import React from "react";
import axios from "axios";

const PlantSearch = ({updatePlantList}) => {
  const [plantInput, setPlant] = React.useState('');

  const handleInputChange = (e) => {
    // console.log(e.target.value)
    setPlant(e.target.value);
  }
  
  const postPlant = () => {
    axios.post('/api/plants', {
      plantName: plantInput
    })
      .then(({ data }) => {
        // pass data to plantList ?
        console.log(data)
        // const searchRes = data.data;
        // console.log('search data: ', searchRes);
        updatePlantList(data)
      })
      .catch(err => console.error(err));
  }

  return (
    (
      <div>
        <h2>Search Plant</h2>
        <input 
        placeholder="Oleander" 
        onChange={(e) => handleInputChange(e)}
        />
        <button 
          type='button'
          onClick={postPlant}
        >Search Plant</button>
      </div>
    )
  );
};

export default PlantSearch;

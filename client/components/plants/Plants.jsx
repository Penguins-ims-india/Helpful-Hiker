import React, { useState, useEffect } from "react";
import PlantSearch from "./PlantSearch.jsx";
import PlantList from "./PlantList.jsx";
import axios from "axios";


const Plants = () => {
  const [plantArr, setPlantArr] = useState([]);

  const loadPlants = () => {
    axios.get('/api/plants')
      .then(({data}) => {
        // console.log(data);
        setPlantArr(data);
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('/plants')
      .then(({ data }) => {
        // console.log(data);
        setPlantArr(data)
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* {loadPlants()} */}
      <h1>Plants</h1>
      <PlantSearch updatePlantList={setPlantArr} />
      <PlantList plants={plantArr} />
    </div>
  );
};

export default Plants;

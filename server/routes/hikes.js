const express = require('express');
const axios = require('axios');
const hikes = express.Router();
const { Hike, Tags } = require('../database');
const { GOOGLE_MAPS_API_KEY } = process.env;

// routes for hike related requests

hikes.post('/hikeSearch', (req, res) => {

  const { location } = req.body.search;

  // fetch search results from google places api
  axios({
    method: 'post',
    url: 'https://places.googleapis.com/v1/places:searchText',
    params: {
      key: GOOGLE_MAPS_API_KEY,
      fields: 'places.id,places.displayName,places.location,places.primaryTypeDisplayName,places.rating,places.formattedAddress',
      textQuery: `hikes near ${location}`,
      maxResultCount: 5,
      rankPreference: 'DISTANCE',
    }
  })
    .then(({ data }) => {

      // map data.places to custom object
      let relevantHikeProps = data.places.map((result) => {
        return {
          description: result.displayName.text,
          location: result.formattedAddress,
          rating: result.rating,
        }
      })
      res.status(201).send(relevantHikeProps);
    })
    .catch((err) => {
      console.error('Failed to fetch results from Google Maps', err);
      res.sendStatus(500);
    })

});

hikes.post('/hikes', (req, res) => {

  const { description, location, rating } = req.body.hike;

  // add hike to the database
  Hike.create({ description, location, rating })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Failed to add favorite hike: ', err);
      res.sendStatus(500);
    });
});

hikes.get('/hikes', (req, res) => {

  // find all hikes in database
  Hike.findAll({include: Tags})
    .then((hikes) => {
      // reduce hikes to an object of tag arrays
      const sortedByTags = hikes.reduce((acc, cur) => {
        // add hike to all hikes
        acc.all.push(cur)
        // for each tag add hike to that tag's array
        cur.tags.forEach((tag) => {
          // if the tag array doesn't exist create it
          if (!acc.hasOwnProperty(tag.name)) {
            acc[tag.name] = [];
          }
          // add hike to tag array
          acc[tag.name].push(cur)
        })
        return acc;
      }, {all: []})
      res.status(200).send(sortedByTags);
    })
    .catch((err) => {
      console.error('Failed to get hikes from database: ', err);
      res.sendStatus(500);
    });

});

hikes.patch('/hikes', (req, res) => {

  const { description, rating } = req.body.hike;

  // update selected hike rating in database
  Hike.update(
      { rating },
      {
        where: {
          description
        },
      },
    )
    .then(() => {
      res.sendStatus(202);
    })
    .catch((err) => {
      console.error('Failed to update hike rating: ', err);
      res.sendStatus(500);
    });
});

hikes.delete('/hikes', (req, res) => {

  const { description } = req.body;

  // delete a hike from the database
  Hike.destroy({
    where: {
      description,
    },
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Failed to delete a hike: ', err);
      res.sendStatus(500);
    });
});

hikes.post('/hikes/:id/tags', (req, res) => {
  const { tag } = req.body;
  const { id } = req.params;
  let foundHike;
  Hike.findByPk(id)
    .then((hike) => {
      if (hike) {
        foundHike = hike;
        return Tags.findCreateFind({where: tag});
      }
      else {
        throw 'Hike not found';
      }
    })
    .then((tag) => {
      foundHike.addTag(tag[0])
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('Failed to add tag: ', err);
      if (err === 'Hike not found') {
        res.sendStatus(404);
      }
      else {
        res.sendStatus(500)
      }
    });
})

hikes.delete('/hikes/:id/tags/:tagID', (req, res) => {
  const { id, tagID } = req.params;
  Hike.findByPk(id)
    .then((hike) => {
      if (hike) {
        return hike.removeTag(tagID)
      }
      else {
        throw 'Hike not found'
      }
    })
    .then((data) => {
      if (data > 0) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(404)
      }
    })
    .catch((err) => {
      console.error('Failed to add tag: ', err);
      if (err === 'Hike not found') {
        res.sendStatus(404);
      }
      else {
        res.sendStatus(500)
      }
    });
})

hikes.get('/hikes/tags', (req, res) => {
  Tags.findAll()
    .then((tags) => {
      res.send(tags)
    })
    .catch((err) => {
      console.error('Failed to get all tags: ', err);
      res.sendStatus(500);
    });
})

module.exports = hikes;

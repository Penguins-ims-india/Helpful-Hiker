const express = require('express');
const packingList = express.Router();
const { PackingList } = require('../database/index.js');

// get packing list for a specific user
packingList.get('/packingList', (req, res) => {
  // PackingList from server/database/index.js references the User id so lets use that
  const userId = req.user[0]['id'];
  // look inside of PackingList and see if there are any lists that belong to the user's id
  PackingList.findAll({ where: { userId } })
    // if there is, send it
    .then((packingLists) => {
      res.json(packingLists);
    })
    // if not, error
    .catch((err) => {
      console.error('Error getting packing lists', err);
      res.sendStatus(500);
    });
});

// create a new packing list
packingList.post('/packingList', (req, res) => {
  // get access to the user's id
  const userId = req.user[0]['id'];
  // destructure name from req.body
  const { name } = req.body;
  // use create sequelize prop to make a new packinglist
  PackingList.create({ userId, name })
  // set status to 201 and send new packinglist
    .then(() => {
      res.sendStatus(201);
    })
    // if the query fails, send 500 sc and error message
    .catch((err) => {
      console.error('Error creating packing list', err);
      res.sendStatus(500);
    })
});

// get a specific packing list by its id
packingList.get('/packingList/:id', (req, res) => {
  // get access to the user's id and destructure id from req.params
  const userId = req.user[0]['id'];
  const { id } = req.params;

  // use findOne sequelize method to find the specific list
  PackingList.findOne({ where: { userId, id } })
  // if you find the list, send it but if you don't send a 404 sc
  .then((packingList) => {
    if (packingList) {
      res.json(packingList);
    } else {
      res.sendStatus(404);
    }
  })
  // catch block if the packing list isn't found
  .catch((err) => {
    console.error('Error getting specific packing list', err);
    res.sendStatus(500);
  })
});

// update an existing packing list by its id
packingList.put('/packingList/:id', (req, res) => {
  // get access to the user's id and destructure id from params and name from req.body
  const userId = req.user[0]['id'];
  const { id } = req.params;
  const { name } = req.body;

  // use update sequelize method to update the name of the packing list
  PackingList.update({ name }, { where: { userId, id } })
    .then(([affectedRows]) => {
      // if there is an affected row, sc 200
      if (affectedRows > 0) {
        res.sendStatus(200);
        // if there isn't, sc 404
      } else {
        res.sendStatus(404);
      }
    })
    // catch block if unable to update packing list
    .catch((err) => {
      console.error('Error updating packing list', err);
      res.sendStatus(500);
    });
});

// delete a specific packing list by its id
packingList.delete('/packingList/:id', (req, res) => {
  // get access to the user's id and destructure id from req.params
  const userId = req.user[0]['id'];
  const { id } = req.params;

  // use destroy sequelize method to delete a specific packing list
  PackingList.destroy({ where: { userId, id } })
    .then((affectedRows) => {
      // if there is an affected row, sc 200
      if (affectedRows > 0) {
        res.sendStatus(200);
        // if there isn't, sc 404
      } else {
        res.sendStatus(404);
      }
    })
    // catch block if unable to update packing list
    .catch((err) => {
      console.error('Error deleting packing list', err);
      res.sendStatus(500);
    });
});

module.exports = packingList;
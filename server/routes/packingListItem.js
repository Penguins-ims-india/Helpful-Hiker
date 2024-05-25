const express = require('express');
const packingListItem = express.Router();
const { PackingListItem } = require('../database/index.js');

// get all items for a specific packing list
// endpoint = /packingListItem/:id to get all items for a specific packing list thru its packingListId
packingListItem.get('/packingListItem/:id', (req, res) => {
  const { id } = req.params;
  PackingListItem.findAll({ where: { packingListId: id } })
  .then((items) => {
    res.json(items);
  })
  .catch((err) => {
    console.error('Error getting packing list items', err);
    res.sendStatus(500);
  })
});

// create a new packing list item
packingListItem.post('/packingListItem/:id', (req, res) => {
  const { name, quantity, packed } = req.body;
  const { id } = req.params;
  PackingListItem.create({ name, quantity, packed, packingListId: id })
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.error('Error creating new packing list item', err);
    res.sendStatus(500);
  })
});

// update an existing packing list item by its id
packingListItem.put('/packingListItem/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity, packed, packingListId } = req.body;
  PackingListItem.update({ name, quantity, packed, packingListId }, { where: { id } })
  .then(([affectedRows]) => {
    if (affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  })
  .catch((err) => {
    console.error('Error updating packing list item', err);
    res.sendStatus(500);
  });
});


// delete a specific packing list item by its id
packingListItem.delete('/packingListItem/:id', (req, res) => {
  const { id } = req.params;

  PackingListItem.destroy({ where: { id } })
    .then((affectedRows) => {
      if (affectedRows > 0) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('Error deleting packing list item', err);
      res.sendStatus(500);
    });
});

module.exports = packingListItem;
const express = require('express');
const packingList = express.Router();
const { PackingList } = require('../database/index.js');

/*
NOTE
TO TEST THIS:
in client/components/App.jsx added this to App
  const handleClick = () => {
    axios.get('/packingList')
    .then((response) => {
      console.log('response data', response.data);
    })
    .catch((err) => {
      console.error('could not get user data', err)
    });
  }
and in the return statement i added this
  <button onClick={handleClick}>get packing list</button>
navigated to localhost:3000 then signed in, then clicked get packing list
added this to packingList.get
  console.log('Request received:', req.headers);
    Request received: {
    host: 'localhost:3000',
    connection: 'keep-alive',
    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    accept: 'application/json, text/plain, *',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    referer: 'http://localhost:3000/home',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en-US,en;q=0.9',
    cookie: 'connect.sid=s%3A7_Uu_LcQvlPPlxTnKotAkw1awTvPLUdz.ceCdv2OEqPCq88una%2FD1x1C9l85XJ5O99CO7oA%2B7FcQ'
  }
  console.log('Request user:', req.user)
    Request user: [
  {
    id: 1,
    username: null,
    googleId: '115005075666417817657',
    createdAt: '2024-05-21T23:36:31.000Z',
    updatedAt: '2024-05-21T23:36:31.000Z'
  },
  false
]
  const userId = req.user[0]['id'];
  console.log('user id', userId);
  user id 1
*/

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
  const userId = req.user[0]['id'];
  const { name } = req.body;
  console.log('name: ', name);
  PackingList.create({ userId, name })
    .then((newPackingList) => {
      res.status(201).json(newPackingList);
    })
    .catch((err) => {
      console.error('Error creating packing list', err);
      res.sendStatus(500);
    })
});

// get a specific packing list by its id
packingList.get('packingList/:id', (req, res) => {

});

// update an existing packing list by its id
packingList.put('packingList/:id', (req, res) => {

});

// delete a specific packing list by its id
packingList.delete('packingList/:id', (req, res) => {

});

module.exports = packingList;
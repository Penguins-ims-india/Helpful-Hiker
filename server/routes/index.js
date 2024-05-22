const { Router } = require('express');
const observations = require('./observations');
const wildlife = require('./wildlife');
const plants = require('./plants');
const hikes = require('./hikes');
const user = require('./user');
const packingList = require('./packingList');
const packingListItem = require('./packingListItem');

const safeTree = Router();

safeTree.post('/hikeSearch', hikes);
safeTree.all('/hikes', hikes);

safeTree.all('/observations/', observations);
safeTree.all('/observations/:id', observations);

safeTree.all('/user', user);

safeTree.all('/plants', plants);
safeTree.all('/plants/:id', plants);


safeTree.all('/wildlife', wildlife);

safeTree.all('/wildLifeSearch', wildlife)

// PackingList routes
safeTree.all('/packingList', packingList);
safeTree.all('/packingList/:id', packingList);

// PackingListItem routes
safeTree.all('/packingListItem', packingListItem);
safeTree.all('/packingListItem/:id', packingListItem);

module.exports = safeTree;

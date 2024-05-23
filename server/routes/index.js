const { Router } = require('express');
const observations = require('./observations');
const wildlife = require('./wildlife');
const plants = require('./plants');
const hikes = require('./hikes');
const user = require('./user');

const safeTree = Router();

safeTree.all('/hikes', hikes);
safeTree.post('/hikeSearch', hikes);
safeTree.all('/hikes/tags', hikes);
safeTree.post('/hikes/:id/tags', hikes);
safeTree.delete('/hikes/:id/tags/:tagID', hikes);

safeTree.all('/observations/', observations);
safeTree.all('/observations/:id', observations);

safeTree.all('/user', user);

safeTree.all('/plants', plants);
safeTree.all('/plants/:id', plants);


safeTree.all('/wildlife', wildlife);

safeTree.all('/wildLifeSearch', wildlife)

module.exports = safeTree;

const { Router } = require('express');
const observations = require('./observations');
const wildlife = require('./wildlife');
const plants = require('./plants');
const hikes = require('./hikes');
const user = require('./user');
const weather = require('./weather');

const safeTree = Router();

safeTree.post('/hikeSearch', hikes);
safeTree.all('/hikes', hikes);

safeTree.all('/observations/', observations);
safeTree.all('/observations/:id', observations);

safeTree.all('/user', user);

safeTree.all('/plants', plants);
safeTree.all('/plants/:id', plants);

safeTree.all('/weather', weather);

safeTree.all('/wildlife', wildlife);

safeTree.all('/wildLifeSearch', wildlife)

module.exports = safeTree;

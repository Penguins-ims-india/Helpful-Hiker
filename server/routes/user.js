const { use } = require('passport');
const { User } = require('../database');
const { Router } = require('express');
const user = Router();

user.post('/user', (req, res) => {
  User.findOrBuild({}).then((data) => {
    console.log(data);
  });
});
user.get('/user', (req, res) => {
  console.log('hiya')
  const userId = req.user[0]['id'];
  User.findByPk(userId)
    .then(data => {
      res.status(200).send(data);
    })
});
user.patch('/user', (req, res) => {
  User.update({}).then((data) => {
    console.log(data);
  });
});
user.delete('/user', (req, res) => {
  User.destroy({}).then((data) => {
    console.log(data);
  });
});

module.exports = user
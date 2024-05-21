const { Sequelize, DataTypes } = require('sequelize');
const colotGenerator = require('../helpers/colorGenerator');

const sequelize = new Sequelize('safetree', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // stops the spamming on CLI
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(), console.log('Connected');
  } catch (err) {
    console.error('Failed to connect:', err);
  }
})();

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  googleId: DataTypes.STRING,
});

const Plant = sequelize.define('Plant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  species: DataTypes.STRING,
  isEdible: DataTypes.BOOLEAN,
  isObserved: DataTypes.BOOLEAN,
  image: DataTypes.STRING,
  scientificName: DataTypes.STRING,
});

const Animal = sequelize.define('Animal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  species: DataTypes.STRING,
  isPredator: DataTypes.BOOLEAN,
  location: DataTypes.STRING,
});

const Itinerary = sequelize.define('Itinerary', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  hikeId: DataTypes.INTEGER, // Probably wont work without creating the relationships
  date: DataTypes.DATE, // Sequelize automatically adds this feature
  userId: DataTypes.INTEGER, // Probably wont work without creating the relationships
});

const Hike = sequelize.define('Hike', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: DataTypes.STRING,
  location: DataTypes.STRING,
  rating: DataTypes.INTEGER,
});

const Observations = sequelize.define('observation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: DataTypes.TEXT,
  isSafe: DataTypes.BOOLEAN,
});
User.Observations = User.hasMany(Observations);
Observations.User = Observations.belongsTo(User);

//HELPFUl HIKER
// Tags for hiking trails
const Tags = sequelize.define('tag', {
  name: DataTypes.TEXT,
  color: {
    type: DataTypes.TEXT,
    set() { this.setDataValue(colorGenerator()); }
  },
})

Hike.belongsToMany(Tags, {through: 'Hikes_Tags'});
Tags.belongsToMany(Hike, {through: 'Hikes_Tags'});

module.exports = {
  User,
  Plant,
  Animal,
  Itinerary,
  Hike,
  Observations,
  Tags,
  sequelize,
};

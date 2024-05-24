const { Sequelize, DataTypes } = require('sequelize');
const colorGenerator = require('../helpers/colorGenerator');

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

// define a sequelize model called PackingList
const PackingList = sequelize.define('PackingList', {
  // define id column of PackingList table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  // define userId column of PackingList table
  // it is a foreign key aka references the id column of the User table
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// define a sequelize model called PackingListItem
const PackingListItem = sequelize.define('PackingListItem', {
  // define the id column of the PackingListItem
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // columns in the table
  name: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  packed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // define packingListId column of PackingListItem table
  // it is a foreign key aka references the id column of the PackingList table
  packingListId: {
    type: DataTypes.INTEGER,
    references: {
      model: PackingList,
      key: 'id',
    },
  },
});

// 1:1 relationship between User and PackingList
// aka 1 User has 1 PackingList
// add foreignKey to specify which column in PackingList references User table
User.hasMany(PackingList, { foreignKey: 'userId' });
// PackingList belongs to user
// again adds foreignKey to specify which column in PackingList references User table
PackingList.belongsTo(User, { foreignKey: 'userId' });

// 1:N relationship between PackingList and PackingListItem
// aka PackingList can have many PackingListItems
// add foreignKey to specify which column in PackingListItem references PackingList table
PackingList.hasMany(PackingListItem, { foreignKey: 'packingListId' });
// each PackingListItem belongs to a PackingList
// again adds foreignKey to specify which column in PackingListItem references PackingList table
PackingListItem.belongsTo(PackingList, { foreignKey: 'packingListId' });

User.Observations = User.hasMany(Observations);
Observations.User = Observations.belongsTo(User);

//HELPFUl HIKER
// Tags for hiking trails
const Tags = sequelize.define('tag', {
  name: DataTypes.TEXT,
  color: {
    type: DataTypes.TEXT,
    defaultValue: () => colorGenerator()
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
  PackingList,
  PackingListItem,
  Tags,
  sequelize,
};
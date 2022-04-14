const { Sequelize, DataTypes } = require('sequelize');

//TODO: Use env variables for production deployment
const sequelize = new Sequelize('postgres://postgres:mysecretpassword@localhost:5432') 


const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  // Define other needed user information here
  //
}, {
  // Other model options go here
});

User.sync()

const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  },
  linkUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  }
}, {
});

Link.sync()


module.exports = {User, Link}


const enviroment = require('./environment')

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(enviroment.getPostgresURI())


const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  linkUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fundsAccountUsername: {
    type: DataTypes.STRING,
  },
  fundsAccountPassword: {
    type: DataTypes.STRING,
  },
}, {
});

Link.sync()


module.exports = {Link}

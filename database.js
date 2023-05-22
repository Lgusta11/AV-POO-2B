const Sequelize = require('sequelize');

const sequelize = new Sequelize('programa', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
});

module.exports = sequelize

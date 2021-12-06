const { models } = require('../../models');
const sequelize = require('sequelize');

module.exports = {
    getCurrentUser: () => models.admin
}
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        key: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: true, notEmpty: false },
        value: { type: DataTypes.FLOAT, allowNull: true }
    };
    const options = {};

    return sequelize.define('Sensor', attributes, options);
}
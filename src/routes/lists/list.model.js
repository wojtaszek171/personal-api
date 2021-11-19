const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        items: {
            type: DataTypes.JSON,
            allowNull: false,
            default: []
        }
    };

    return sequelize.define('Lists', attributes, {});
}

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
        isPublished: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };

    return sequelize.define('CV', attributes, {});
}

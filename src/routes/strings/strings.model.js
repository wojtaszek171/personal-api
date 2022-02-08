const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        'en-us': {
            type: DataTypes.STRING,
            allowNull: true
        },
        'pl-pl': {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
    const options = {
        updatedAt: false,
        createdAt: false
    };

    return sequelize.define('Strings', attributes, options);
}

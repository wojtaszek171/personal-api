const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        details: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };
    const options = {
        updatedAt: false,
        createdAt: false
    };

    return sequelize.define('CVLanguage', attributes, options);
}

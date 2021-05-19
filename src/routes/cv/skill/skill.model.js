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
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        details: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };
    const options = {
        updatedAt: false,
        createdAt: false
    };

    return sequelize.define('CVSkill', attributes, options);
}

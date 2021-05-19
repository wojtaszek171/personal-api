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
        school: {
            type: DataTypes.STRING,
            allowNull: true
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
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

    return sequelize.define('CVEducation', attributes, options);
}

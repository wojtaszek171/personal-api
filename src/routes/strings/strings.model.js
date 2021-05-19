const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        en_us: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pl_pl: {
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

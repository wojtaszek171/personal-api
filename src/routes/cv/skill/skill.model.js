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
            allowNull: true,
            references: {
                model: 'Strings',
                key: 'id'
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        details: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Strings',
                key: 'id'
            }
        }
    };
    const options = {
        defaultScope: {
            include: [{
                model: db.Strings,
                as: 'nameString'
            },
            {
                model: db.Strings,
                as: 'detailsString'
            }],
        },
        updatedAt: false,
        createdAt: false
    };

    return sequelize.define('CVSkill', attributes, options);
}

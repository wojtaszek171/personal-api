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
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };
    const options = {
        defaultScope: {
            include: [
                {
                    model: db.Strings,
                    as: 'name'
                },
                {
                    model: db.Strings,
                    as: 'details'
                }
            ],
        },
        updatedAt: false,
        createdAt: false
    };

    const CVSkill = sequelize.define('CVSkill', attributes, options);

    CVSkill.belongsTo(db.Strings, { as: 'name' });
    CVSkill.belongsTo(db.Strings, { as: 'details' });

    return CVSkill;
}

const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cvId: {
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

    const CVLanguage = sequelize.define('CVLanguage', attributes, options);

    CVLanguage.belongsTo(db.Strings, { as: 'name' });
    CVLanguage.belongsTo(db.Strings, { as: 'details' });

    return CVLanguage;
}

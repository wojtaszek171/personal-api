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
        startDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true
        }
    };
    const options = {
        defaultScope: {
            include: [
                {
                    model: db.Strings,
                    as: 'school'
                },
                {
                    model: db.Strings,
                    as: 'degree'
                },
                {
                    model: db.Strings,
                    as: 'location'
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

    const CVEducation = sequelize.define('CVEducation', attributes, options);

    CVEducation.belongsTo(db.Strings, { as: 'school' });
    CVEducation.belongsTo(db.Strings, { as: 'degree' });
    CVEducation.belongsTo(db.Strings, { as: 'location' });
    CVEducation.belongsTo(db.Strings, { as: 'details' });

    return CVEducation;
}

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
        company: {
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
        }
    };
    const options = {
        defaultScope: {
            include: [
                {
                    model: db.Strings,
                    as: 'position'
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

    const CVEmployment = sequelize.define('CVEmployment', attributes, options);

    CVEmployment.belongsTo(db.Strings, { as: 'position' });
    CVEmployment.belongsTo(db.Strings, { as: 'location' });
    CVEmployment.belongsTo(db.Strings, { as: 'details' });


    return CVEmployment;
}

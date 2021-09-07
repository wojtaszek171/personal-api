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
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        photo: {
            type: DataTypes.BLOB,
            allowNull: true
        }
    };
    const options = {
        defaultScope: {
            include: [
                {
                    model: db.Strings,
                    as: 'address'
                },
                {
                    model: db.Strings,
                    as: 'position'
                },
                {
                    model: db.Strings,
                    as: 'presentation'
                }
            ],
        },
        updatedAt: false,
        createdAt: false
    };

    const CVUser = sequelize.define('CVUser', attributes, options);

    CVUser.belongsTo(db.Strings, { as: 'address' });
    CVUser.belongsTo(db.Strings, { as: 'position' });
    CVUser.belongsTo(db.Strings, { as: 'presentation' });

    return CVUser;
}

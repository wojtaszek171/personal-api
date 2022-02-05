const config = require('../config.js');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('smart-home-api-namespace');
Sequelize.useCLS(namespace);

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, user, password, port, database } = config.database;

    const connection = await mysql.createConnection({ host, user, port, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql', port, host });

    db.connection = sequelize;
    // init models and add them to the exported db object
    db.User = require('../routes/users/user.model')(sequelize);
    db.Sensor = require('../routes/sensors/sensor.model')(sequelize);
    db.Sockets = require('../routes/sockets/socket.model')(sequelize);
    db.Weather = require('../routes/weather/weather.model')(sequelize);
    db.Settings = require('../routes/settings/settings.model')(sequelize);
    db.Strings = require('../routes/strings/strings.model')(sequelize);
    db.Lists = require('../routes/lists/list.model')(sequelize);

    db.CV = require('../routes/cv/cv.model')(sequelize);
    db.CVUser = require('../routes/cv/user/user.model')(sequelize);
    db.CVEmployment = require('../routes/cv/employment/employment.model')(sequelize);
    db.CVEducation = require('../routes/cv/education/education.model')(sequelize);
    db.CVSkill = require('../routes/cv/skill/skill.model')(sequelize);
    db.CVLink = require('../routes/cv/link/link.model')(sequelize);
    db.CVLanguage = require('../routes/cv/language/language.model')(sequelize);

    const cvForeignKey = {
        name: 'cvId',
        allowNull: false
    };

    db.User.hasMany(db.Lists, {
        foreignKey: 'userId'
    })
    db.User.hasMany(db.CV, {
        foreignKey: 'userId'
    })

    db.CV.hasOne(db.CVUser, {
        foreignKey: cvForeignKey
    });
    // db.CVUser.belongsTo(db.CV, { as: 'userDetails', sourceKey: 'cvId', foreignKey: 'id' });
    db.CV.hasMany(db.CVEmployment, {
        foreignKey: cvForeignKey
    });
    db.CV.hasMany(db.CVEducation, {
        foreignKey: cvForeignKey
    });
    db.CV.hasMany(db.CVSkill, {
        foreignKey: cvForeignKey
    });
    db.CV.hasMany(db.CVLink, {
        foreignKey: cvForeignKey
    });
    db.CV.hasMany(db.CVLanguage, {
        foreignKey: cvForeignKey
    });

    await sequelize.sync();
}

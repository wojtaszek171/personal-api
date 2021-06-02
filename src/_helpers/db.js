const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../routes/users/user.model')(sequelize);
    db.Sensor = require('../routes/sensors/sensor.model')(sequelize);
    db.Sockets = require('../routes/sockets/socket.model')(sequelize);
    db.Weather = require('../routes/weather/weather.model')(sequelize);
    db.Settings = require('../routes/settings/settings.model')(sequelize);
    db.Strings = require('../routes/strings/strings.model')(sequelize);

    db.CVUser = require('../routes/cv/user/user.model')(sequelize);
    db.CVEmployment = require('../routes/cv/employment/employment.model')(sequelize);
    db.CVEducation = require('../routes/cv/education/education.model')(sequelize);
    db.CVSkill = require('../routes/cv/skill/skill.model')(sequelize);
    db.CVLink = require('../routes/cv/link/link.model')(sequelize);
    db.CVLanguage = require('../routes/cv/language/language.model')(sequelize);

    const userForeignKey = {
        name: 'user_id',
        allowNull: false
    };
    db.User.hasOne(db.CVUser, {
        foreignKey: userForeignKey
    });
    db.User.hasMany(db.CVEmployment, {
        foreignKey: userForeignKey
    });
    db.User.hasMany(db.CVEducation, {
        foreignKey: userForeignKey
    });
    db.User.hasMany(db.CVSkill, {
        foreignKey: userForeignKey
    });
    db.User.hasMany(db.CVLink, {
        foreignKey: userForeignKey
    });
    db.User.hasMany(db.CVLanguage, {
        foreignKey: userForeignKey
    });
    // sync all models with database
    db.Strings.hasMany(db.Strings, { foreignKey: 'id', sourceKey: 'id'});
    db.CVSkill.belongsTo(db.Strings, { foreignKey: 'name', targetKey: 'id', as: 'nameString'});
    db.CVSkill.belongsTo(db.Strings, { foreignKey: 'details', targetKey: 'id', as: 'detailsString'});

    await sequelize.sync();
}

const db = require('_helpers/db');

module.exports = {
    getAll,
    getByKey,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Sensor.findAll();
}


async function getByKey(key) {
    const sensor = await db.Sensor.findOne({ where: { key } });
    if (!sensor) throw 'Sensor not found';
    return sensor;
}

async function set(params) {
    if (await db.Sensor.findOne({ where: { key: params.key } })) {
        update(params.key, params);
    } else {
        await db.Sensor.create(params);
    }
}

async function update(key, params) {
    const sensor = await getSensor(key);

    // copy params to sensor and save
    Object.assign(sensor, params);
    await sensor.save();
}

async function _delete(key) {
    const sensor = await getSensor(key);
    await sensor.destroy();
}

// helper functions

async function getSensor(key) {
    const sensor = await db.Sensor.findByPk(key);
    if (!sensor) throw 'Sensor not found';
    return sensor;
}

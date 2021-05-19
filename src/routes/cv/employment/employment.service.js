const db = require('_helpers/db');

module.exports = {
    getById,
    set,
    update
};

async function getById(id) {
    const employment = await db.CVEmployment.findByPk(id);
    if (!employment) throw 'CVEmployment not found';
    return employment;
}

async function set(params) {
    await db.CVEmployment.create(params);
}

async function update(id, params) {
    const employment = await getEmployment(id);

    Object.assign(employment, params);
    await employment.save();
}

async function getEmployment(id) {
    const employment = await db.CVEmployment.findByPk(id);
    if (!employment) throw 'CVEmployment not found';
    return employment;
}
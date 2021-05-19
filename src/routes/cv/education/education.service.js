const db = require('_helpers/db');

module.exports = {
    getById,
    set,
    update
};

async function getById(id) {
    const education = await db.CVEducation.findByPk(id);
    if (!education) throw 'CVEducation not found';
    return education;
}

async function set(params) {
    await db.CVEducation.create(params);
}

async function update(id, params) {
    const education = await getEducation(id);

    Object.assign(education, params);
    await education.save();
}

async function getEducation(id) {
    const education = await db.CVEducation.findByPk(id);
    if (!education) throw 'CVEducation not found';
    return education;
}
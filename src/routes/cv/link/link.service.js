const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CVLink.findAll();
}

async function getById(id) {
    const link = await db.CVLink.findByPk(id);
    if (!link) throw 'CVLink not found';
    return link;
}

async function set(params) {
    await db.CVLink.create(params);
}

async function update(id, params) {
    const link = await getLink(id);

    Object.assign(link, params);
    await link.save();
}

async function getLink(id) {
    const link = await db.CVLink.findByPk(id);
    if (!link) throw 'CVLink not found';
    return link;
}

async function _delete(id) {
    const skill = await getSkill(id);
    await skill.destroy();
}

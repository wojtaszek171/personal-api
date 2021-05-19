const db = require('_helpers/db');

module.exports = {
    getById,
    set,
    update
};

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
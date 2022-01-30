const db = require('src/_helpers/db');
const cvService = require('../cv.service');

module.exports = {
    getAll,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll(userId, cvId) {
    await cvService.validateOwnership(cvId, userId);

    return await db.CVLink.findAll({
        where: { cvId }
    });
}

async function getById(userId, id, cvId) {
    const link = await getLink(userId, id, cvId);

    return link;
}

async function set(userId, cvId, params) {
    await cvService.validateOwnership(cvId, userId);

    await db.CVLink.create({
        ...params,
        cvId
    });
}

async function update(userId, id, cvId, params) {
    const link = await getLink(userId, id, cvId);

    Object.assign(link, params);
    await link.save();
}

async function getLink(userId, id, cvId) {
    await cvService.validateOwnership(cvId, userId);

    const link = await db.CVLink.findOne({ where: { id, cvId }});
    if (!link) throw 'Link not found';
    return link;
}

async function _delete(userId, id, cvId) {
    const skill = await getLink(userId, id, cvId);
    await skill.destroy();
}

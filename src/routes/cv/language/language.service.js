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

    return await db.CVLanguage.findAll({
        where: { cvId }
    });
}

async function getById(userId, id, cvId) {
    const language = await getLanguage(userId, id, cvId);

    return language;
}

async function set(userId, cvId, params) {
    await cvService.validateOwnership(cvId, userId);

    const { name, details } = params;
    const nameString = await db.Strings.create(name);
    const detailsString = await db.Strings.create(details);

    const language = await db.CVLanguage.create({
        ...params,
        cvId
    });

    language.setName(nameString);
    language.setDetails(detailsString);
}

async function update(userId, id, cvId, params) {
    const { name, details } = params;
    const language = await getLanguage(userId, id, cvId);
    const { nameId, detailsId } = language.get({ plain: true });
    await db.Strings.update(name, { where: { id: nameId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(language, params);
    await language.save();
}

async function getLanguage(userId, id, cvId) {
    await cvService.validateOwnership(cvId, userId);

    const language = await db.CVLanguage.findOne({ where: { id, cvId }});
    if (!language) throw 'CVLanguage not found';
    return language;
}

async function _delete(userId, id, cvId) {
    const language = await getLanguage(userId, id, cvId);
    const { nameId, detailsId } = language.get({ plain: true });
    await db.Strings.destroy({ where: { id: nameId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await language.destroy();
}

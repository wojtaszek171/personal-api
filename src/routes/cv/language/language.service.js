const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CVLanguage.findAll();
}

async function getById(id) {
    const language = await getLanguage(id);

    return language;
}

async function set(params) {
    const { name, details } = params;
    const nameString = await db.Strings.create(name);
    const detailsString = await db.Strings.create(details);

    const language = await db.CVLanguage.create(params);

    language.setName(nameString);
    language.setDetails(detailsString);
}

async function update(id, params) {
    const { name, details } = params;
    const language = await getLanguage(id);
    const { nameId, detailsId } = language.get({ plain: true });
    await db.Strings.update(name, { where: { id: nameId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(language, params);
    await language.save();
}

async function getLanguage(id) {
    const language = await db.CVLanguage.findByPk(id);
    if (!language) throw 'CVLanguage not found';
    return language;
}

async function _delete(id) {
    const language = await getLanguage(id);
    const { nameId, detailsId } = language.get({ plain: true });
    await db.Strings.destroy({ where: { id: nameId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await language.destroy();
}

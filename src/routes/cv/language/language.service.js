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
    const language = await db.CVLanguage.findByPk(id);
    language.name = await db.Strings.findByPk(language.name);
    language.details = await db.Strings.findByPk(language.details);

    if (!language) throw 'CVLanguage not found';
    return language;
}

async function set(params) {
    const { name, details } = params;
    const { id: nameId } = (await db.Strings.create(name)).get({ plain: true });
    const { id: detailsId } = (await db.Strings.create(details)).get({ plain: true });

    await db.CVLanguage.create({
        ...params,
        name: nameId,
        details: detailsId
    });
}

async function update(id, params) {
    const { name: nameStrings, details: detailsStrings } = params;
    const language = await getLanguage(id);
    const { name, details } = language.get({ plain: true });
    await db.Strings.update(nameStrings, { where: { id: name }});
    await db.Strings.update(detailsStrings, { where: { id: details }});

    Object.assign(language, {
        ...params,
        name,
        details
    });
    await language.save();
}

async function getLanguage(id) {
    const language = await db.CVLanguage.findByPk(id);
    if (!language) throw 'CVLanguage not found';
    return language;
}

async function _delete(id) {
    const language = await getLanguage(id);
    const { name, details } = language.get({ plain: true });
    await db.Strings.destroy({ where: { id: name }});
    await db.Strings.destroy({ where: { id: details }});
    await language.destroy();
}

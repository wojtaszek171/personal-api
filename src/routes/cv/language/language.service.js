const db = require('_helpers/db');

module.exports = {
    getById,
    set,
    update
};

async function getById(id) {
    const language = await db.CVLanguage.findByPk(id);
    if (!language) throw 'CVLanguage not found';
    return language;
}

async function set(params) {
    await db.CVLanguage.create(params);
}

async function update(id, params) {
    const language = await getLanguage(id);

    Object.assign(language, params);
    await language.save();
}

async function getLanguage(id) {
    const language = await db.CVLanguage.findByPk(id);
    if (!language) throw 'CVLanguage not found';
    return language;
}
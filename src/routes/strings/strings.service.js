const db = require('_helpers/db');

module.exports = {
    getById,
    set,
    update
};

async function getById(id) {
    const strings = await db.Strings.findByPk(id);
    if (!strings) throw 'Strings not found';
    return strings;
}

async function set(params) {
    const newString = await db.Strings.create(params);
    return newString.dataValues.id
}

async function update(id, params) {
    const strings = await getStrings(id);

    Object.assign(strings, {
        ...params
    });
    await strings.save();
}

async function getStrings(id) {
    const strings = await db.Strings.findByPk(id);
    if (!strings) throw 'Strings not found';
    return strings;
}
const db = require('_helpers/db');

module.exports = {
    getById,
    set,
    update
};

async function getById(id) {
    const user = await db.CVUser.findByPk(id);
    if (!user) throw 'CVUser not found';
    return user;
}

async function set(params) {
    if (await db.CVUser.findOne({ where: { name: params.name } })) {
        update(params.name, params);
    } else {
        await db.CVUser.create(params);
    }
}

async function update(id, params) {
    const user = await getUser(id);

    Object.assign(user, params);
    await user.save();
}

async function getUser(id) {
    const user = await db.CVUser.findByPk(id);
    if (!user) throw 'CVUser not found';
    return user;
}
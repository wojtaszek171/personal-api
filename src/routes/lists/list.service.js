const db = require('_helpers/db');
const { Op } = require("sequelize");

module.exports = {
    getAllOwned,
    getById,
    set,
    update,
    delete: _delete
};

async function getAllOwned(userId) {
    return await db.Lists.findAll({
        where: {
            [Op.or]: [
                { userId }
            ]
        }
    });
}

async function getById(id) {
    const cv = await getList(id);

    return cv;
}

async function set(params) {
    await db.Lists.create(params);
}

async function update(id, params) {
    const cv = await getList(id);

    Object.assign(cv, params);
    await cv.save();
}

async function getList(id) {
    const cv = await db.Lists.findByPk(id);
    if (!cv) throw 'List not found';
    return cv;
}

async function _delete(id) {
    const cv = await getList(id);
    await cv.destroy();
}

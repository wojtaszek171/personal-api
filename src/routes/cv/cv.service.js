const db = require('src/_helpers/db');
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getAllOwned,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CV.findAll({
        where: {
            isPublished: true
        }
    });
}

async function getAllOwned(userId) {
    return await db.CV.findAll({
        where: {
            [Op.or]: [
                { userId: userId }
            ]
        }
    });
}

async function getById(id) {
    const cv = await getCV(id);

    return cv;
}

async function set(params) {
    await db.CV.create(params);
}

async function update(id, params) {
    const cv = await getCV(id);

    Object.assign(cv, params);
    await cv.save();
}

async function getCV(id) {
    const cv = await db.CV.findByPk(id);
    if (!cv) throw 'CV not found';
    return cv;
}

async function _delete(id) {
    const cv = await getCV(id);
    await cv.destroy();
}

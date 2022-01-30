const db = require('src/_helpers/db');
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getAllOwned,
    getById: getCV,
    set,
    update,
    delete: _delete,
    validateOwnership
};

async function getAll(userId) {
    const orParams = [{
        isPublished: true
    }];

    if (userId) {
        orParams.push({ userId });
    }

    return await db.CV.findAll({
        where: {
            [Op.or]: orParams
        }
    });
}

async function getAllOwned(userId) {
    return await db.CV.findAll({
        where: {
            userId
        }
    });
}

async function set(params) {
    const { id } = await db.CV.create(params);

    return {
        id
    };
}

async function update(id, params) {
    const cv = await getOwnedCV(id);

    Object.assign(cv, params);
    await cv.save();
}

async function getOwnedCV(id, userId) {
    const cv = await db.CV.findOne({
        where: {
            id,
            userId
        }
    });
    if (!cv) throw `You don't own this CV`;
    return cv;
}

async function validateOwnership(id, userId = undefined) {
    try {
        await getCV(id, userId);
    } catch (e) {
        throw `CV not found or you don't have privileges to see it`;
    }
}

async function getCV(id, userId = undefined) {
    const orParams = [{
        isPublished: true
    }];

    if (userId) {
        orParams.push({ userId });
    }

    const cv = await db.CV.findOne({
        where: {
            id,
            [Op.or]: orParams
        }
    });
    if (!cv) throw 'CV not found';
    return cv;
}

async function _delete(id, userId) {
    const cv = await getOwnedCV(id, userId);
    await cv.destroy();
}

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

    return await db.CVUser.findAll({
        where: { cvId }
    });
}

async function getById(userId, id, cvId) {
    const user = await getUser(userId, id, cvId);

    return user;
}

async function set(userId, cvId, params) {
    await cvService.validateOwnership(cvId, userId);

    const { address, position, presentation } = params;
    const addressString = await db.Strings.create(address);
    const positionString = await db.Strings.create(position);
    const presentationString = await db.Strings.create(presentation);

    const user = await db.CVUser.create({
        ...params,
        cvId
    });

    user.setAddress(addressString);
    user.setPosition(positionString);
    user.setPresentation(presentationString);
}

async function update(userId, id, cvId, params) {
    const { address, position, presentation } = params;
    const user = await getUser(userId, id, cvId);
    const { addressId, positionId, presentationId } = user.get({ plain: true });
    await db.Strings.update(address, { where: { id: addressId }});
    await db.Strings.update(position, { where: { id: positionId }});
    await db.Strings.update(presentation, { where: { id: presentationId }});

    Object.assign(user, params);
    await user.save();
}

async function getUser(userId, id, cvId) {
    await cvService.validateOwnership(cvId, userId);

    const user = await db.CVUser.findOne({ where: { id, cvId }});
    if (!user) throw 'CVUser not found';
    return user;
}

async function _delete(userId, id, cvId) {
    const user = await getUser(userId, id, cvId);
    const { addressId, positionId, presentationId } = user.get({ plain: true });
    await db.Strings.destroy({ where: { id: addressId }});
    await db.Strings.destroy({ where: { id: positionId }});
    await db.Strings.destroy({ where: { id: presentationId }});
    await user.destroy();
}

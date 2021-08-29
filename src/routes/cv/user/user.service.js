const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CVUser.findAll();
}

async function getById(id) {
    const user = await getUser(id);

    return user;
}

async function set(params) {
    const { address, position, presentation } = params;
    const addressString = await db.Strings.create(address);
    const positionString = await db.Strings.create(position);
    const presentationString = await db.Strings.create(presentation);

    const user = await db.CVUser.create(params);

    user.setAddress(addressString);
    user.setPosition(positionString);
    user.setPresentation(presentationString);
}

async function update(id, params) {
    const { address, position, presentation } = params;
    const user = await getUser(id);
    const { addressId, positionId, presentationId } = user.get({ plain: true });
    await db.Strings.update(address, { where: { id: addressId }});
    await db.Strings.update(position, { where: { id: positionId }});
    await db.Strings.update(presentation, { where: { id: presentationId }});

    Object.assign(user, params);
    await user.save();
}

async function getUser(id) {
    const user = await db.CVUser.findByPk(id);
    if (!user) throw 'CVUser not found';
    return user;
}

async function _delete(id) {
    const user = await getUser(id);
    const { addressId, positionId, presentationId } = user.get({ plain: true });
    await db.Strings.destroy({ where: { id: addressId }});
    await db.Strings.destroy({ where: { id: positionId }});
    await db.Strings.destroy({ where: { id: presentationId }});
    await user.destroy();
}

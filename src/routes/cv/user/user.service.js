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
    const user = await db.CVUser.findByPk(id);
    user.address = await db.Strings.findByPk(user.address);
    user.position = await db.Strings.findByPk(user.position);
    user.presentation = await db.Strings.findByPk(user.presentation);

    if (!user) throw 'CVUser not found';
    return user;
}

async function set(params) {
    const { address, position, presentation } = params;
    const { id: addressId } = (await db.Strings.create(address)).get({ plain: true });
    const { id: positionId } = (await db.Strings.create(position)).get({ plain: true });
    const { id: presentationId } = (await db.Strings.create(presentation)).get({ plain: true });

    await db.CVUser.create({
        ...params,
        address: addressId,
        position: positionId,
        presentation: presentationId
    });
}

async function update(id, params) {
    const { address: addressStrings, position: positionStrings, presentation: presentationStrings } = params;
    const user = await getUser(id);
    const { address, position, presentation } = user.get({ plain: true });
    await db.Strings.update(addressStrings, { where: { id: address }});
    await db.Strings.update(positionStrings, { where: { id: position }});
    await db.Strings.update(presentationStrings, { where: { id: presentation }});

    Object.assign(user, {
        ...params,
        address,
        position,
        presentation
    });
    await user.save();
}

async function getUser(id) {
    const user = await db.CVUser.findByPk(id);
    if (!user) throw 'CVUser not found';
    return user;
}

async function _delete(id) {
    const user = await getUser(id);
    const { address, position, presentation } = user.get({ plain: true });
    await db.Strings.destroy({ where: { id: address }});
    await db.Strings.destroy({ where: { id: position }});
    await db.Strings.destroy({ where: { id: presentation }});
    await user.destroy();
}

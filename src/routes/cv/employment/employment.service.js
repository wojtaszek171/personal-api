const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CVEmployment.findAll();
}

async function getById(id) {
    const employment = await getEmployment(id);

    return employment;
}

async function set(params) {
    const { position, location, details } = params;

    const positionString = await db.Strings.create(position);
    const locationString = await db.Strings.create(location);
    const detailsString = await db.Strings.create(details);

    const employment = await db.CVEmployment.create(params);

    employment.setPosition(positionString);
    employment.setLocation(locationString);
    employment.setDetails(detailsString);
}

async function update(id, params) {
    const { position, location, details } = params;
    const employment = await getEmployment(id);
    const { positionId, locationId, detailsId } = employment.get({ plain: true });
    await db.Strings.update(position, { where: { id: positionId }});
    await db.Strings.update(location, { where: { id: locationId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(employment, params);
    await employment.save();
}

async function getEmployment(id) {
    const employment = await db.CVEmployment.findByPk(id);
    if (!employment) throw 'CVEmployment not found';
    return employment;
}

async function _delete(id) {
    const employment = await getEmployment(id);
    const { positionId, locationId, detailsId } = employment.get({ plain: true });
    await db.Strings.destroy({ where: { id: positionId }});
    await db.Strings.destroy({ where: { id: locationId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await employment.destroy();
}

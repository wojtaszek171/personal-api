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
    const employment = await db.CVEmployment.findByPk(id);
    employment.position = await db.Strings.findByPk(employment.position);
    employment.location = await db.Strings.findByPk(employment.location);
    employment.details = await db.Strings.findByPk(employment.details);

    if (!employment) throw 'CVEmployment not found';
    return employment;
}

async function set(params) {
    const { position, location, details } = params;
    const { id: positionId } = (await db.Strings.create(position)).get({ plain: true });
    const { id: locationId } = (await db.Strings.create(location)).get({ plain: true });
    const { id: detailsId } = (await db.Strings.create(details)).get({ plain: true });

    await db.CVEmployment.create({
        ...params,
        position: positionId,
        location: locationId,
        details: detailsId
    });
}

async function update(id, params) {
    const { position: positionStrings, location: locationStrings, details: detailsStrings } = params;
    const employment = await getEmployment(id);
    const { position, location, details } = employment.get({ plain: true });
    await db.Strings.update(positionStrings, { where: { id: position }});
    await db.Strings.update(locationStrings, { where: { id: location }});
    await db.Strings.update(detailsStrings, { where: { id: details }});

    Object.assign(employment, {
        ...params,
        position,
        location,
        details
    });
    await employment.save();
}

async function getEmployment(id) {
    const employment = await db.CVEmployment.findByPk(id);
    if (!employment) throw 'CVEmployment not found';
    return employment;
}

async function _delete(id) {
    const employment = await getEmployment(id);
    const { position, location, details } = employment.get({ plain: true });
    await db.Strings.destroy({ where: { id: position }});
    await db.Strings.destroy({ where: { id: location }});
    await db.Strings.destroy({ where: { id: details }});
    await employment.destroy();
}

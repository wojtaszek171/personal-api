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

    return await db.CVEmployment.findAll({
        where: { cvId }
    });
}

async function getById(userId, id, cvId) {
    const employment = await getEmployment(userId, id, cvId);

    return employment;
}

async function set(userId, cvId, params) {
    await cvService.validateOwnership(cvId, userId);

    const { position, location, details } = params;

    const positionString = await db.Strings.create(position);
    const locationString = await db.Strings.create(location);
    const detailsString = await db.Strings.create(details);

    const employment = await db.CVEmployment.create({
        ...params,
        cvId
    });

    employment.setPosition(positionString);
    employment.setLocation(locationString);
    employment.setDetails(detailsString);
}

async function update(userId, id, cvId, params) {
    const { position, location, details } = params;
    const employment = await getEmployment(userId, id, cvId);
    const { positionId, locationId, detailsId } = employment.get({ plain: true });
    await db.Strings.update(position, { where: { id: positionId }});
    await db.Strings.update(location, { where: { id: locationId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(employment, params);
    await employment.save();
}

async function getEmployment(userId, id, cvId) {
    await cvService.validateOwnership(cvId, userId);

    const employment = await db.CVEmployment.findOne({ where: { id, cvId }});
    if (!employment) throw 'CVEmployment not found';
    return employment;
}

async function _delete(userId, id, cvId) {
    const employment = await getEmployment(userId, id, cvId);
    const { positionId, locationId, detailsId } = employment.get({ plain: true });
    await db.Strings.destroy({ where: { id: positionId }});
    await db.Strings.destroy({ where: { id: locationId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await employment.destroy();
}

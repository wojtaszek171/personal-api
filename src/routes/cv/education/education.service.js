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

    return await db.CVEducation.findAll({
        where: { cvId }
    });
}

async function getById(userId, id, cvId) {
    const education = await getEducation(userId, id, cvId);

    return education;
}

async function set(userId, cvId, params) {
    await cvService.validateOwnership(cvId, userId);

    const { school, degree, location, details } = params;
    const schoolString = await db.Strings.create(school);
    const degreeString = await db.Strings.create(degree);
    const locationString = await db.Strings.create(location);
    const detailsString = await db.Strings.create(details);

    const education = await db.CVEducation.create({
        ...params,
        cvId
    });

    education.setSchool(schoolString);
    education.setDegree(degreeString);
    education.setLocation(locationString);
    education.setDetails(detailsString);
}

async function update(userId, id, cvId, params) {
    await cvService.validateOwnership(cvId, userId);

    const { school, degree, location, details } = params;
    const education = await getEducation(userId, id, cvId);
    const { schoolId, degreeId, locationId, detailsId } = education.get({ plain: true });
    await db.Strings.update(school, { where: { id: schoolId }});
    await db.Strings.update(degree, { where: { id: degreeId }});
    await db.Strings.update(location, { where: { id: locationId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(education, params);
    await education.save();
}

async function getEducation(userId, id, cvId) {
    await cvService.validateOwnership(cvId, userId);

    const education = await db.CVEducation.findOne({ where: { id, cvId }});
    if (!education) throw 'CVEducation not found';
    return education;
}

async function _delete(userId, id, cvId) {
    await cvService.validateOwnership(cvId, userId);

    const education = await getEducation(userId, id, cvId);
    const { schoolId, degreeId, locationId, detailsId } = education.get({ plain: true });
    await db.Strings.destroy({ where: { id: schoolId }});
    await db.Strings.destroy({ where: { id: degreeId }});
    await db.Strings.destroy({ where: { id: locationId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await education.destroy();
}

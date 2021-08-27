const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CVEducation.findAll();
}

async function getById(id) {
    const education = await getEducation(id);

    return education;
}

async function set(params) {
    const { school, degree, location, details } = params;
    const schoolString = await db.Strings.create(school);
    const degreeString = await db.Strings.create(degree);
    const locationString = await db.Strings.create(location);
    const detailsString = await db.Strings.create(details);

    const education = await db.CVEducation.create(params);

    education.setSchool(schoolString);
    education.setDegree(degreeString);
    education.setLocation(locationString);
    education.setDetails(detailsString);
}

async function update(id, params) {
    const { school, degree, location, details } = params;
    const education = await getEducation(id);
    const { schoolId, degreeId, locationId, detailsId } = education.get({ plain: true });
    await db.Strings.update(school, { where: { id: schoolId }});
    await db.Strings.update(degree, { where: { id: degreeId }});
    await db.Strings.update(location, { where: { id: locationId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(education, {
        ...params,
        school,
        degree,
        location,
        details
    });
    await education.save();
}

async function getEducation(id) {
    const education = await db.CVEducation.findByPk(id);
    if (!education) throw 'CVEducation not found';
    return education;
}

async function _delete(id) {
    const education = await getEducation(id);
    const { schoolId, degreeId, locationId, detailsId } = education.get({ plain: true });
    await db.Strings.destroy({ where: { id: schoolId }});
    await db.Strings.destroy({ where: { id: degreeId }});
    await db.Strings.destroy({ where: { id: locationId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await education.destroy();
}

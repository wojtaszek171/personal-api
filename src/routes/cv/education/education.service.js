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
    const education = await db.CVEducation.findByPk(id);
    skill.school = await db.Strings.findByPk(skill.school);
    skill.degree = await db.Strings.findByPk(skill.degree);
    skill.location = await db.Strings.findByPk(skill.location);
    skill.details = await db.Strings.findByPk(skill.details);

    if (!education) throw 'CVEducation not found';
    return education;
}

async function set(params) {
    const { school, degree, location, details } = params;
    const { id: schoolId } = (await db.Strings.create(school)).get({ plain: true });
    const { id: degreeId } = (await db.Strings.create(degree)).get({ plain: true });
    const { id: locationId } = (await db.Strings.create(location)).get({ plain: true });
    const { id: detailsId } = (await db.Strings.create(details)).get({ plain: true });

    await db.CVEducation.create({
        ...params,
        school: schoolId,
        degree: degreeId,
        location: locationId,
        details: detailsId
    });}

async function update(id, params) {
    const { schoolStrings, degreeStrings, locationStrings, detailsStrings } = params;
    const education = await getEducation(id);
    const { school, degree, location, details } = education.get({ plain: true });
    await db.Strings.update(schoolStrings, { where: { id: school }});
    await db.Strings.update(degreeStrings, { where: { id: degree }});
    await db.Strings.update(locationStrings, { where: { id: location }});
    await db.Strings.update(detailsStrings, { where: { id: details }});

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
    const { school, degree, location, details } = education.get({ plain: true });
    await db.Strings.destroy({ where: { id: school }});
    await db.Strings.destroy({ where: { id: degree }});
    await db.Strings.destroy({ where: { id: location }});
    await db.Strings.destroy({ where: { id: details }});
    await education.destroy();
}

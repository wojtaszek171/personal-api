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

    return await db.CVSkill.findAll({
        where: { cvId }
    });
}

async function getById(userId, id, cvId) {
    const skill = await getSkill(userId, id, cvId);

    return skill;
}

async function set(userId, cvId, params) {
    await cvService.validateOwnership(cvId, userId);

    const { name, details } = params;
    const nameString = await db.Strings.create(name);
    const detailsString = await db.Strings.create(details);

    const skill = await db.CVSkill.create({
        ...params,
        cvId
    });

    skill.setName(nameString);
    skill.setDetails(detailsString);
}

async function update(userId, id, cvId, params) {
    const { name, details } = params;
    const skill = await getSkill(id);
    const { nameId, detailsId } = skill.get({ plain: true });
    await db.Strings.update(name, { where: { id: nameId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(skill, params);
    await skill.save();
}

async function getSkill(userId, id, cvId) {
    await cvService.validateOwnership(cvId, userId);

    const skill = await db.CVSkill.findOne({ where: { id, cvId }});
    if (!skill) throw 'Skill not found';
    return skill;
}

async function _delete(userId, id, cvId) {
    const skill = await getSkill(id);
    const { nameId, detailsId } = skill.get({ plain: true });
    await db.Strings.destroy({ where: { id: nameId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await skill.destroy();
}

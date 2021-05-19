const db = require('_helpers/db');

module.exports = {
    getById,
    set,
    update,
    delete: _delete
};

async function getById(id) {
    const skill = await db.CVSkill.findByPk(id);
    skill.name = await db.Strings.findByPk(skill.name);
    skill.details = await db.Strings.findByPk(skill.details);

    if (!skill) throw 'CVSkill not found';
    return skill;
}

async function set(params) {
    const { name, details } = params;
    const { id: nameId } = (await db.Strings.create(name)).get({ plain: true });
    const { id: detailsId } = (await db.Strings.create(details)).get({ plain: true });

    await db.CVSkill.create({
        ...params,
        name: nameId,
        details: detailsId
    });
}

async function update(id, params) {
    const { name: nameStrings, details: detailsStrings } = params;
    const skill = await getSkill(id);
    const { name, details } = skill.get({ plain: true });
    await db.Strings.update(nameStrings, { where: { id: name }});
    await db.Strings.update(detailsStrings, { where: { id: details }});

    Object.assign(skill, {
        ...params,
        name,
        details
    });
    await skill.save();
}

async function getSkill(id) {
    const skill = await db.CVSkill.findByPk(id);
    if (!skill) throw 'CVSkill not found';
    return skill;
}

async function _delete(id) {
    const skill = await getSkill(id);
    const { name, details } = skill.get({ plain: true });
    await db.Strings.destroy({ where: { id: name }});
    await db.Strings.destroy({ where: { id: details }});
    await skill.destroy();
}

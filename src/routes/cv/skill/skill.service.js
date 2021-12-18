const db = require('src/_helpers/db');

module.exports = {
    getAll,
    getById,
    set,
    update,
    delete: _delete
};

async function getAll() {
    return await db.CVSkill.findAll();
}

async function getById(id) {
    const skill = await db.CVSkill.findByPk(id);

    if (!skill) throw 'CVSkill not found';
    return skill;
}

async function set(params) {
    const { name, details } = params;
    const nameString = await db.Strings.create(name);
    const detailsString = await db.Strings.create(details);

    const skill = await db.CVSkill.create({
        ...params,
        name: undefined,
        details: undefined
    });

    skill.setName(nameString);
    skill.setDetails(detailsString);
}

async function update(id, params) {
    const { name, details } = params;
    const skill = await getSkill(id);
    const { nameId, detailsId } = skill.get({ plain: true });
    await db.Strings.update(name, { where: { id: nameId }});
    await db.Strings.update(details, { where: { id: detailsId }});

    Object.assign(skill, params);
    await skill.save();
}

async function getSkill(id) {
    const skill = await db.CVSkill.findByPk(id);
    if (!skill) throw 'CVSkill not found';
    return skill;
}

async function _delete(id) {
    const skill = await getSkill(id);
    const { nameId, detailsId } = skill.get({ plain: true });
    await db.Strings.destroy({ where: { id: nameId }});
    await db.Strings.destroy({ where: { id: detailsId }});
    await skill.destroy();
}

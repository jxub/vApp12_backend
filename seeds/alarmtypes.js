const faker = require("faker");

const createFakeAlarmtype = () => ({
  code: faker.random.word(),
  name: faker.name.findName()
});

// eslint-disable-next-line no-unused-vars
exports.seed = (knex, Promise) => {
  return knex("alarmtypes")
    .del()
    .then(() => {
      const alarmtypes = [];
      for (let i = 0; i < 10; i += 1) {
        alarmtypes.push(createFakeAlarmtype());
      }
      return knex("alarmtypes").insert(alarmtypes);
    });
};

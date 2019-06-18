const faker = require("faker");

const createFakeAlarm = () => ({
  origin: faker.random.word(),
  company: faker.company.companyName(),
  machine: faker.random.word(),
  type: faker.random.word(),
  name: faker.random.word(),
  detected: faker.random.word(),
  timestamp: faker.date.recent()
});

const createFakeIntervention = alarmId => ({
  duration: faker.random.number(),
  comment: faker.random.words(),
  solution: faker.random.words(),
  timestamp: faker.date.recent(),
  alarm_id: alarmId
});

// eslint-disable-next-line no-unused-vars
exports.seed = (knex, Promise) => {
  return knex("interventions")
    .del()
    .then(() => {
      return knex("alarms").del();
    })
    .then(() => {
      const alarms = [];
      for (let i = 0; i < 10; i += 1) {
        alarms.push(createFakeAlarm());
      }
      return knex("alarms").insert(alarms);
    })
    .then(() => {
      knex("alarms")
        .pluck("id")
        .then(alarmIds => {
          const interventions = [];
          for (let i = 0; i < alarmIds.length; i += 1) {
            const it = createFakeIntervention(alarmIds[i]);
            interventions.push(it);
          }

          return knex("interventions").insert(interventions);
        });
    });
};

/* eslint-disable no-unused-vars */
const faker = require("faker");

const createFakeAlarm = () => ({
  timestamp: faker.date.past(),
  status: faker.lorem.word(),
  code: faker.random.word(),
  name: faker.random.word(),
  type: faker.random.word(),
  machine: faker.random.word(),
  company: faker.company.companyName(),
  origin: faker.random.word()
});

exports.iiiiseed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex("alarms")
    .del()
    .then(() => {
      // Inserts seed entries
      const fakeAlarms = [];
      for (let i = 0; i < 10; i += 1) {
        fakeAlarms.push(createFakeAlarm());
      }

      return knex("alarms").insert(fakeAlarms);
    });
};

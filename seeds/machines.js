const faker = require("faker");

const createFakeMachine = () => ({
  name: faker.random.word()
});

// eslint-disable-next-line no-unused-vars
exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex("machines")
    .del()
    .then(() => {
      // Inserts seed entries
      const machines = [];
      for (let i = 0; i < 10; i += 1) {
        machines.push(createFakeMachine());
      }
      return knex("machines").insert(machines);
    });
};

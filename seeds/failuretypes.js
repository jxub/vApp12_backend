const faker = require("faker");

const createFakeFailuretype = () => ({
  code: faker.random.word(),
  name: faker.name.findName()
});

// eslint-disable-next-line no-unused-vars
exports.seed = (knex, Promise) => {
  return knex("failuretypes")
    .del()
    .then(() => {
      const failuretypes = [];
      for (let i = 0; i < 10; i += 1) {
        failuretypes.push(createFakeFailuretype());
      }
      return knex("failuretypes").insert(failuretypes);
    });
};

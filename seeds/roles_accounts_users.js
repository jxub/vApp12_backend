const faker = require("faker");

const createFakeRole = () => ({
  description: faker.random.word(),
  account_type: faker.random.word()
});

const createFakeAccount = roleId => ({
  user_name: faker.name.findName(),
  user_hash: faker.random.alphaNumeric(),
  user_salt: faker.random.number(),
  role_id: roleId
});

const createFakeUser = accountId => ({
  mail: faker.internet.email(),
  company: faker.company.companyName(),
  account_id: accountId
});

const ITERS = 10;

// eslint-disable-next-line no-unused-vars
exports.seed = (knex, Promise) => {
  return knex("users")
    .del()
    .then(() => {
      return knex("accounts").del();
    })
    .then(() => {
      return knex("roles").del();
    })
    .then(() => {
      const roles = [];
      for (let i = 0; i < ITERS; i += 1) {
        roles.push(createFakeRole());
      }

      return knex("roles").insert(roles);
    })
    .then(() => {
      return knex("roles")
        .pluck("id")
        .then(roleIds => {
          const accounts = [];
          for (let i = 0; i < roleIds.length; i += 1) {
            const a = createFakeAccount(roleIds[i]);
            accounts.push(a);
          }

          return knex("accounts").insert(accounts);
        });
    })
    .then(() => {
      return knex("accounts")
        .pluck("id")
        .then(accountIds => {
          const users = [];
          for (let i = 0; i < accountIds.length; i += 1) {
            const u = createFakeUser(accountIds[i]);
            users.push(u);
          }

          return knex("users").insert(users);
        });
    });
};

const faker = require("faker");

const createFakeRole = () => ({
  description: faker.random.word(),
  account_type: faker.random.word()
});

const createFakeAccount = () => ({
  user_name: faker.name.findName(),
  user_hash: faker.random.alphaNumeric(),
  user_salt: faker.random.number()  ,
  role_id: null
});

const ACCOUNTS_NUM = 10;
const ROLES_NUM = 10;

// eslint-disable-next-line no-unused-vars
exports.seed = (knex, Promise) => {
  return knex("accounts")
    .del()
    .then(() => {
      return knex("roles").del();
    })
    .then(() => {
      const roles = [];
      for (let i = 0; i < ROLES_NUM; i += 1) {
        roles.push(createFakeRole());
      }

      return knex("roles").insert(roles);
    })
    .then(() => {
      return knex("roles")
        .pluck("id")
        .then(roleIds => {
          const accounts = [];
          for (let i = 0; i < ACCOUNTS_NUM; i += 1) {
            const a = createFakeAccount();
            a.role_id = roleIds[i];
            accounts.push(a);
          }

          return knex("accounts").insert(accounts);
        });
    });
};

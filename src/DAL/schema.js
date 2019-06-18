const conn = require("../config/conn");

// TODO remove
if (!conn.fn.now()) {
  throw new Error("revise the code");
}

const machineSchemaDescription = table => {
  table.increments("id").primary();
  table.string("name");
};

const roleSchemaDescription = table => {
  table.increments("id").primary();
  table.string("description");
  table.string("account_type");
};

const accountSchemaDescription = table => {
  table.increments("id").primary();
  table.string("user_name");
  table.string("user_hash");
  table.string("user_salt");
  table.integer("role_id").unsigned();
  table
    .foreign("role_id")
    .references("id")
    .inTable("roles");
};

const alarmtypeSchemaDescription = table => {
  table.increments("id").primary();
  table.string("name");
  table.string("code");
};

const failuretypeSchemaDescription = table => {
  table.increments("id").primary();
  table.string("name");
  table.string("code");
};

const userSchemaDescription = table => {
  table.increments("id").primary();
  table.string("mail").unique();
  table.string("company");
  table.integer("account_id").unsigned();
  table
    .foreign("account_id")
    .references("id")
    .inTable("accounts");
};

const alarmSchemaDescription = table => {
  table.increments("id").primary();
  table.string("origin").notNullable();
  table.string("company").notNullable();
  table.string("machine").notNullable();
  table.string("type").notNullable();
  table.string("name").notNullable();
  // Could detected pbe string as well?
  table.string("detected").notNullable();
  // TODO change to date
  table.timestamp("timestamp").defaultTo(conn.fn.now());
};

const interventionSchemaDescription = table => {
  table.increments("id").primary();
  table.float("duration").notNullable();
  table.string("comment").notNullable();
  table.string("solution").notNullable();
  table
    .timestamp("timestamp")
    .defaultTo(conn.fn.now())
    .notNullable(); // TODO change to date
  table.integer("alarm_id").unsigned();
  table
    .foreign("alarm_id")
    .references("id")
    .inTable("alarms");
};

const machineSchema = conn.schema.createSchema(
  "machines",
  machineSchemaDescription
);
const roleSchema = conn.schema.createSchema("roles", roleSchemaDescription);
const accountSchema = conn.schema.createSchema(
  "accounts",
  accountSchemaDescription
);
const alarmtypeSchema = conn.schema.createSchema(
  "alarmtypes",
  alarmtypeSchemaDescription
);
const failuretypeSchema = conn.schema.createSchema(
  "failuretypes",
  failuretypeSchemaDescription
);
const userSchema = conn.schema.createSchema("users", userSchemaDescription);
const alarmSchema = conn.schema.createSchema("alarms", alarmSchemaDescription);
const interventionSchema = conn.schema.createSchema(
  "interventions",
  interventionSchemaDescription
);

module.exports = {
  machineSchema,
  roleSchema,
  accountSchema,
  alarmtypeSchema,
  failuretypeSchema,
  userSchema,
  alarmSchema,
  interventionSchema,

  machineSchemaDescription,
  roleSchemaDescription,
  accountSchemaDescription,
  alarmtypeSchemaDescription,
  failuretypeSchemaDescription,
  userSchemaDescription,
  alarmSchemaDescription,
  interventionSchemaDescription
};

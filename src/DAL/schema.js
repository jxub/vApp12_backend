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

const projectSchemaDescription = table => {
  table.increments("id").primary();
  table.string("name").notNullable();
  table.string("description").notNullable();
  table.boolean("status").notNullable();
  table.integer("threshold").notNullable();
};

const userSchemaDescription = table => {
  table.increments("id").primary();
  table.integer("project_id").unsigned();
  table.integer("account_id").unsigned();
  table
    .foreign("project_id")
    .references("id")
    .inTable("projects");
  table
    .foreign("account_id")
    .references("id")
    .inTable("accounts");
};

const equipmentSchemaDescription = table => {
  table.increments("id").primary();
  table.string("name");
  table.integer("project_id").unsigned();
  table
    .foreign("project_id")
    .references("id")
    .inTable("projects");
};

const slumpSchemaDescription = table => {
  table.increments("id").primary();
  table.integer("value");
  table.date("date").defaultTo(conn.fn.now());
  table.integer("equipment_id").unsigned();
  table.integer("project_id").unsigned();
  table.integer("account_id").unsigned();
  table
    .foreign("equipment_id")
    .references("id")
    .inTable("equipments");
  table
    .foreign("project_id")
    .references("id")
    .inTable("projects");
  table
    .foreign("account_id")
    .references("id")
    .inTable("accounts");
};

const notificationSchemaDescription = table => {
  table.increments("id").primary();
  table.boolean("read");
  table.date("date").defaultTo(conn.fn.now());
  table.integer("account_id").unsigned();
  table.integer("slump_id").unsigned();
  table
    .foreign("account_id")
    .references("id")
    .inTable("equipments");
  table
    .foreign("slump_id")
    .references("id")
    .inTable("slumps");
};

const alarmSchemaDescription = table => {
  table.increments("id").primary();
  table.string("origin").notNullable();
  table.string("company").notNullable();
  table.string("machine").notNullable();
  table.string("type").notNullable();
  table.string("name").notNullable();
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
const projectSchema = conn.schema.createSchema(
  "projects",
  projectSchemaDescription
);
const userSchema = conn.schema.createSchema("users", userSchemaDescription);
const equipmentSchema = conn.schema.createSchema(
  "equipments",
  equipmentSchemaDescription
);
const slumpSchema = conn.schema.createSchema("slumps", slumpSchemaDescription);
const notificationSchema = conn.schema.createSchema(
  "notifications",
  notificationSchemaDescription
);
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
  projectSchema,
  userSchema,
  equipmentSchema,
  slumpSchema,
  notificationSchema,
  alarmSchema,
  interventionSchema,

  machineSchemaDescription,
  roleSchemaDescription,
  accountSchemaDescription,
  alarmtypeSchemaDescription,
  failuretypeSchemaDescription,
  projectSchemaDescription,
  userSchemaDescription,
  equipmentSchemaDescription,
  slumpSchemaDescription,
  notificationSchemaDescription,
  alarmSchemaDescription,
  interventionSchemaDescription
};

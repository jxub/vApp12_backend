const conn = require("../config/knex");
const logger = require("../config/logger");

// TODO remove
if (!conn.fn.now()) {
  throw new Error("revise the code");
}
  
const machineSchemaDescription = table => {
  table.increments("id");
  table.string("name");
};

const roleSchemaDescription = table => {
  table.increments("id");
  table.string("description");
  table.string("account_type");
};

const accountSchemaDescription = table => {
  table.increments("id");
  table.string("user_name");
  table.string("user_hash");
  table.string("user_salt");
  table.foreign("role_id").references("roles.id");
};

const alarmtypeSchemaDescription = table => {
  table.increments("id");
  table.string("name");
  table.string("code");
};

const failuretypeSchemaDescription = table => {
  table.increments("id");
  table.string("name");
  table.string("code");
};

const projectSchemaDescription = table => {
  table.increments("id");
  table.string("name").notNullable();
  table.string("description").notNullable();
  table.boolean("status").notNullable();
  table.integer("threshold").notNullable();
};

const userSchemaDescription = table => {
  table.increments("id");
  table.foreign("project_id").references("projects.id");
  table.foreign("account_id").references("accounts.id");
};

const equipmentSchemaDescription = table => {
  table.increments("id");
  table.string("name");
  table.foreign("project_id").references("project.id");
};

const slumpSchemaDescription = table => {
  table.increments("id");
  table.integer("value");
  table.date("date").defaultTo(conn.fn.now());
  table.foreign("equipment_id").references("equipments.id");
  table.foreign("project_id").references("projects.id");
  table.foreign("account_id").references("accounts.id");
};

const notificationSchemaDescription = table => {
  table.increments("id");
  table.boolean("read");
  table.date("date").defaultTo(conn.fn.now());
  table.foreign("account_id").references("accounts.id");
  table.foreign("slump_id").references("slumps.id");
};

const alarmSchemaDescription = table => {
  table.increments("id");
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
  table.increments("id");
  table.float("duration").notNullable();
  table.string("comment").notNullable();
  table.string("solution").notNullable();
  table
    .timestamp("timestamp")
    .defaultTo(conn.fn.now())
    .notNullable(); // TODO change to date
  table.foreign("alarm_id").references("alarms.id");
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

const up = async (connection, Promise) => {
  if (!connection) {
    logger.error("You must supply a knex connection object.");
  }
  try {
    if (!(await connection.schema.hasTable("machines"))) {
      await connection.schema.createTable("machines", machineSchemaDescription);
    }

    if (!(await connection.schema.hasTable("roles"))) {
      await connection.schema.createTable("roles", roleSchemaDescription);
    }

    if (!(await connection.schema.hasTable("accounts"))) {
      await connection.schema.createTable("accounts", accountSchemaDescription);
    }

    if (!(await connection.schema.hasTable("alarmtypes"))) {
      await connection.schema.createTable(
        "alarmtypes",
        alarmtypeSchemaDescription
      );
    }

    if (!(await connection.schema.hasTable("failuretypes"))) {
      await connection.schema.createTable(
        "failuretypes",
        failuretypeSchemaDescription
      );
    }

    if (!(await connection.schema.hasTable("projects"))) {
      await connection.schema.createTable("projects", projectSchemaDescription);
    }

    if (!(await connection.schema.hasTable("users"))) {
      await connection.schema.createTable("users", userSchemaDescription);
    }

    if (!(await connection.schema.hasTable("equipments"))) {
      await connection.schema.createTable(
        "equipments",
        equipmentSchemaDescription
      );
    }

    if (!(await connection.schema.hasTable("slumps"))) {
      await connection.schema.createTable("slumps", slumpSchemaDescription);
    }

    if (!(await connection.schema.hasTable("notifications"))) {
      await connection.schema.createTable(
        "notifications",
        notificationSchemaDescription
      );
    }

    if (!(await connection.schema.hasTable("alarms"))) {
      await connection.schema.createTable("alarms", alarmSchemaDescription);
    }

    if (!(await connection.schema.hasTable("interventions"))) {
      await connection.schema.createTable(
        "interventions",
        interventionSchemaDescription
      );
    }
  } catch (e) {
    logger.error(e);
  }
};

const down = async (connection, Promise) => {
  if (!connection || !("schema" in connection)) {
    logger.error("You must supply a knex connection object.");
  }
  try {
    if (await connection.schema.hasTable("machines")) {
      await connection.schema.dropTable("machines", machineSchemaDescription);
    }

    if (await connection.schema.hasTable("roles")) {
      await connection.schema.dropTable("roles", roleSchemaDescription);
    }

    if (await connection.schema.hasTable("accounts")) {
      await connection.schema.dropTable("accounts", accountSchemaDescription);
    }

    if (await connection.schema.hasTable("alarmtypes")) {
      await connection.schema.dropTable(
        "alarmtypes",
        alarmtypeSchemaDescription
      );
    }

    if (await connection.schema.hasTable("failuretypes")) {
      await connection.schema.dropTable(
        "failuretypes",
        failuretypeSchemaDescription
      );
    }

    if (await connection.schema.hasTable("projects")) {
      await connection.schema.dropTable("projects", projectSchemaDescription);
    }

    if (await connection.schema.hasTable("users")) {
      await connection.schema.dropTable("users", userSchemaDescription);
    }

    if (await connection.schema.hasTable("equipments")) {
      await connection.schema.dropTable(
        "equipments",
        equipmentSchemaDescription
      );
    }

    if (await connection.schema.hasTable("slumps")) {
      await connection.schema.dropTable("slumps", slumpSchemaDescription);
    }

    if (await connection.schema.hasTable("notifications")) {
      await connection.schema.dropTable(
        "notifications",
        notificationSchemaDescription
      );
    }

    if (await connection.schema.hasTable("alarms")) {
      await connection.schema.dropTable("alarms", alarmSchemaDescription);
    }

    if (await connection.schema.hasTable("interventions")) {
      await connection.schema.dropTable(
        "interventions",
        interventionSchemaDescription
      );
    }
  } catch (e) {
    logger.error(e);
  }
};

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
  interventionSchemaDescription,

  up,
  down
};

const conn = require("../../../config/conn");

// TODO remove
if (!conn.fn.now()) {
  throw new Error("revise the code");
}

conn.schema.createSchema("machines", table => {
  table.increments("id");
  table.string("name");
});

conn.schema.createSchema("roles", table => {
  table.increments("id");
  table.string("description");
  table.string("account_type");
});

conn.schema.createSchema("accounts", table => {
  table.increments("id");
  table.string("user_name");
  table.string("user_hash");
  table.string("user_salt");
  table.foreign("role_id").references("roles.id");
});

conn.schema.createSchema("alarmtypes", table => {
  table.increments("id");
  table.string("name");
  table.string("code");
});

conn.schema.createSchema("failuretypes", table => {
  table.increments("id");
  table.string("name");
  table.string("code");
});

conn.schema.createSchema("projects", table => {
  table.increments("id");
  table.string("name").notNullable();
  table.string("description").notNullable();
  table.boolean("status").notNullable();
  table.integer("threshold").notNullable();
});

conn.schema.createSchema("users", table => {
  table.increments("id");
  table.foreign("project_id").references("projects.id");
  table.foreign("account_id").references("accounts.id");
});

conn.schema.createSchema("equipments", table => {
  table.increments("id");
  table.string("name");
  table.foreign("project_id").references("project.id");
});

conn.createSchema("slumps", table => {
  table.increments("id");
  table.integer("value");
  table.date("date").defaultTo(conn.fn.now());
  table.foreign("equipment_id").references("equipments.id");
  table.foreign("project_id").references("projects.id");
  table.foreign("account_id").references("accounts.id");
});

conn.createSchema("notifications", table => {
  table.increments("id");
  table.boolean("read");
  table.date("date").defaultTo(conn.fn.now());
  table.foreign("account_id").references("accounts.id");
  table.foreign("slump_id").references("slumps.id");
});

conn.createSchema("alarms", table => {
  table.increments("id");
  table.string("origin").notNullable();
  table.string("company").notNullable();
  table.string("machine").notNullable();
  table.string("type").notNullable();
  table.string("name").notNullable();
  table.string("detected").notNullable();
  table.timestamp("timestamp").defaultTo(conn.fn.now()); // TODO change to date
});

conn.createSchema("interventions", table => {
  table.increments("id");
  table.float("duration").notNullable();
  table.string("comment").notNullable();
  table.string("solution").notNullable();
  table
    .timestamp("timestamp")
    .defaultTo(conn.fn.now())
    .notNullable(); // TODO change to date
  table.foreign("alarm_id").references("alarms.id");
});

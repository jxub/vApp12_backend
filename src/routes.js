const express = require("express");
const ctl = require("./controllers");

const router = express.Router();

router.route("/test").get((req, res, next) => {
  res.json({ hello: "world" });
});

// API ROUTES

// auth
router.route("/register").post(ctl.auth.register);
router.route("/login").post(ctl.auth.login);

// accounts
router.route("/accounts").get(ctl.accounts.get);
router.route("/accounts").post(ctl.accounts.create);
router.route("/accounts").patch(ctl.accounts.update);
router.route("/accounts").delete(ctl.accounts.delete);

// alarms
router.route("/alarms").get(ctl.alarms.get);
router.route("/alarms").post(ctl.alarms.create);
router.route("/alarms").patch(ctl.alarms.update);
router.route("/alarms").delete(ctl.alarms.delete);

// alarmtypes
router.route("/alarmtypes").get(ctl.alarmtypes.get);
router.route("/alarmtypes").post(ctl.alarmtypes.create);
router.route("/alarmtypes").delete(ctl.alarmtypes.delete);

// failuretypes
router.route("/failuretypes").get(ctl.failuretypes.get);
router.route("/failuretypes").post(ctl.failuretypes.create);
router.route("/failuretypes").patch(ctl.failuretypes.update);
router.route("/failuretypes").delete(ctl.failuretypes.delete);

// interventions
router.route("/interventions").get(ctl.interventions.get);
router.route("/interventions").post(ctl.interventions.create);
router.route("/interventions").patch(ctl.interventions.update);
router.route("/interventions").delete(ctl.interventions.delete);

// machines
router.route("/machines").get(ctl.machines.get);
router.route("/machines").post(ctl.machines.create);
router.route("/machines").patch(ctl.machines.update);
router.route("/machines").delete(ctl.machines.delete);

// stats
router.route("/stats").get(ctl.stats.get);

// users
router.route("/users").get(ctl.users.get);
router.route("/users").post(ctl.users.create);
router.route("/users").patch(ctl.users.update);
router.route("/users").delete(ctl.users.delete);

module.exports = router;

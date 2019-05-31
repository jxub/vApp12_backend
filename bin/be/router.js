const express = require('express');
const router = express.Router();
const ctl = require('./controllers');

router.route('/test').get(function(req,res){
    res.json({hello:'world'})
})

//API ROUTES

//auth
router.route('/register').post(ctl.auth.register);
router.route('/login').post(ctl.auth.login);

// --------

//accounts
router.route('/accounts').get(ctl.accounts.get);
router.route('/accounts').post(ctl.accounts.create);
router.route('/accounts').patch(ctl.accounts.update);
router.route('/accounts').delete(ctl.accounts.delete);

//alarms
router.route('/alarms').get(ctl.projects.get);
router.route('/alarms').post(ctl.projects.create);
router.route('/alarms').patch(ctl.projects.update);
router.route('/alarms').delete(ctl.projects.delete);

//alarmtypes
router.route('/alarmtypes').get(ctl.alarmtypes.get);
router.route('/alarmtypes').post(ctl.alarmtypes.create);
router.route('/alarmtypes').patch(ctl.alarmtypes.update);
router.route('/alarmtypes').delete(ctl.alarmtypes.delete);

//equipments
router.route('/equipments').get(ctl.equipments.get);
router.route('/equipments').post(ctl.equipments.create);
router.route('/equipments').patch(ctl.equipments.update);
router.route('/equipments').delete(ctl.equipments.delete);

//failuretypes
router.route('/failuretypes').get(ctl.failuretypes.get);
router.route('/failuretypes').post(ctl.failuretypes.create);
router.route('/failuretypes').patch(ctl.failuretypes.update);
router.route('/failuretypes').delete(ctl.failuretypes.delete);

//interventions
router.route('/interventions').get(ctl.interventions.get)
router.route('/interventions').post(ctl.interventions.create)
router.route('/interventions').patch(ctl.interventions.update)
router.route('/interventions').delete(ctl.interventions.delete)

//machines
router.route('/machines').get(ctl.machines.get)
router.route('/machines').post(ctl.machines.create)
router.route('/machines').patch(ctl.machines.update)
router.route('/machines').delete(ctl.machines.delete)

//projects
router.route('/projects').get(ctl.projects.get)
router.route('/projects').post(ctl.projects.create)
router.route('/projects').patch(ctl.projects.update)
router.route('/projects').delete(ctl.projects.delete)

//stats
router.route('/stats').get(ctl.stats.get)
router.route('/stats').post(ctl.stats.create)
router.route('/stats').patch(ctl.stats.update)
router.route('/stats').delete(ctl.stats.delete)

//users
router.route('/users').get(ctl.users.get);
router.route('/users').post(ctl.users.create);
router.route('/users').patch(ctl.users.update);
router.route('/users').delete(ctl.users.delete);

module.exports = router;

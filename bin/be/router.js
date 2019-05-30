var express = require('express');
var router = express.Router();
var ctl = require('./controllers');

router.route('/test').get(function(req,res){
    res.json({hello:'world'})
})

//API ROUTES

//authentication
router.route('/register').post(ctl.auth.register);
router.route('/login').post(ctl.auth.login);

//alarms
router.route('/alarms').get(ctl.projects.get);
router.route('/alarms').post(ctl.projects.create);
router.route('/alarms').patch(ctl.projects.update);
router.route('/alarms').delete(ctl.projects.delete);

//interventions
router.route('/equipments').get(ctl.equipments.get);
router.route('/equipments').post(ctl.equipments.create);
router.route('/equipments').delete(ctl.equipments.delete);

//alarmtypes
router.route('/equipments').get(ctl.equipments.get);
router.route('/equipments').post(ctl.equipments.create);
router.route('/equipments').delete(ctl.equipments.delete);

//failuretypes
router.route('/equipments').get(ctl.equipments.get);
router.route('/equipments').post(ctl.equipments.create);
router.route('/equipments').delete(ctl.equipments.delete);

//machines
router.route('/equipments').get(ctl.equipments.get);
router.route('/equipments').post(ctl.equipments.create);
router.route('/equipments').delete(ctl.equipments.delete);

//stats
router.route('/equipments').get(ctl.equipments.get);
router.route('/equipments').post(ctl.equipments.create);
router.route('/equipments').delete(ctl.equipments.delete);

//users
router.route('/users').get(ctl.users.get);
router.route('/users').post(ctl.users.create);
router.route('/users').delete(ctl.users.delete);


//accounts
router.route('/accounts').get(ctl.accounts.get);

module.exports = router;

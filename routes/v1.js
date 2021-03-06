const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const GroupController 	= require('../controllers/group.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController 	= require('../controllers/home.controller');
const LicenceController 	= require('../controllers/licence.controller');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',           UserController.create);                                                    // C
//router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.getAll);     // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

router.post(    '/groups',           passport.authenticate('jwt', {session:false}), GroupController.create);     // C
router.get(     '/groups',           passport.authenticate('jwt', {session:false}), GroupController.getAll);     // R
router.put(     '/groups',           passport.authenticate('jwt', {session:false}), GroupController.update);     // U
router.delete(  '/groups',           passport.authenticate('jwt', {session:false}), GroupController.remove);     // D

router.post(    '/licences',           passport.authenticate('jwt', {session:false}), LicenceController.create);     // C
router.get(     '/licences',           passport.authenticate('jwt', {session:false}), LicenceController.getAll);     // R
router.get(     '/licences/:id',       passport.authenticate('jwt', {session:false}), LicenceController.get);        // R
router.patch(   '/licences',           passport.authenticate('jwt', {session:false}), LicenceController.update);     // U
router.delete(  '/licences/:id',           passport.authenticate('jwt', {session:false}), LicenceController.remove);     // D

router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  // U
router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;

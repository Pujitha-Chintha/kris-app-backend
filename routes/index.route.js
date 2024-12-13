const express = require('express')
const router = express.Router();
const userController = require('../controllers/users.controller')
const leaveController = require('../controllers/leave.management.controller')
const userMappingController = require('../controllers/user.mapping.controller')
const addressController = require('../controllers/address.controller')
const verifyJwt = require("../common/jwt");

/** user routes */
router.post('/create', userController.createUser)
router.post('/login', userController.login)
router.post('/create-user-mapping', verifyJwt, userMappingController.createUserMapping)
router.get('/view-user-mapping', verifyJwt, userMappingController.getUserMapping)


/** leave management routes */
router.post('/leave-create', verifyJwt, leaveController.createLeaveManagement)
router.get('/leave-view', verifyJwt, leaveController.getLeaveManagement)


// update profile
// personal details
router.get('/user-details/:userId', verifyJwt, userMappingController.getUserDetailsByUserId)


// contact Details
router.post('/create-address', verifyJwt, addressController.createAddress)
router.post('/get-contact-details', verifyJwt, addressController.getContactDetailsByUserId)
router.put('/update-contact-details/:userId', verifyJwt, addressController.updateContactDetailsByUserId)












module.exports = router;
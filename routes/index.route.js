const express = require('express')
const router = express.Router();
const userController = require('../controllers/users.controller')
const leaveController = require('../controllers/leave.management.controller')
const userMappingController = require('../controllers/user.mapping.controller')
const addressController = require('../controllers/address.controller')
const kinController = require('../controllers/kin.controller')
const academicController = require('../controllers/academic.controller')
const guarantorController = require('../controllers/guarantor.controller')
const familyController = require('../controllers/family.controller')
const financialController = require('../controllers/financial.controller')
const verifyJwt = require("../common/jwt");

/** user routes */
router.post('/create', userController.createUser)  //to register user
router.post('/login', userController.login) //to remember user and login
router.post('/create-user-mapping', verifyJwt, userMappingController.createUserMapping) //to use data where-ever needed
router.get('/view-user-mapping', verifyJwt, userMappingController.getUserMapping) //to use for user dashboard page(name;jobTitle)


/** leave management routes */
router.post('/leave-create', verifyJwt, leaveController.createLeaveManagement) //to store data from form
router.get('/leave-view', verifyJwt, leaveController.getLeaveManagement) //to get leaveHistory in leavemngmnt


// update profile
// personal details
router.get('/user-details/:userId', verifyJwt, userMappingController.getUserDetailsByUserId) //to use in personalDetails


// contact Details
router.post('/create-address', verifyJwt, addressController.createAddress)
router.get('/get-contact-details/:userId', verifyJwt, addressController.getContactDetailsByUserId) /**to use in contact details */
router.put('/update-contact-details', verifyJwt, addressController.updateContactDetailsByUserId)


/**next of kin details */
router.post('/create-kin-details', verifyJwt, kinController.createKin)
router.get('/get-kin-details/:userId', verifyJwt, kinController.getKinDetailsByUserId)
router.put('/update-kin-details', verifyJwt, kinController.updateKinDetailsByUserId)


/**academic details */
router.post('/create-academic-details', verifyJwt, academicController.createAcademicDetails)
router.get('/get-academic-details/:userId', verifyJwt, academicController.getAcademicDetailsByUserId)
router.put('/update-academic-details', verifyJwt, academicController.updateAcademicDetailsByUserId)

/**guarantor details */
router.post('/create-guarantor-details', verifyJwt, guarantorController.createGuarantorDetails)
router.get('/get-guarantor-details/:userId', verifyJwt, guarantorController.getGuarantorDetailsByUserId)
router.put('/update-guarantor-details', verifyJwt, guarantorController.updateGuarantorDetailsByUserId)


/**family details */
router.post('/create-family-details', verifyJwt, familyController.createFamilyDetails)
router.get('/get-family-details/:userId', verifyJwt, familyController.getFamilyDetailsByUserId)
router.put('/update-family-details', verifyJwt, familyController.updateFamilyDetailsByUserId)

/**job details */
router.get('/user-job-details/:userId', verifyJwt, userMappingController.getUserJObDetailsByUserId) //to use in job details page

/**financial details */
router.post('/create-financial-details', verifyJwt, financialController.createFinancialDetails)
router.get('/get-financial-details/:userId', verifyJwt, financialController.getFinancialDetailsByUserId)
router.put('/update-financial-details', verifyJwt, financialController.updateFinancialDetailsByUserId)






















module.exports = router;
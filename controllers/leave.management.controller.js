const leaveManagementServices = require('../services/leave.management.service')

class leaveManagementController {
    async createLeaveManagement(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody")


        try {
            let payLoad = {
                leaveType: req.body.leaveType,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                duration: req.body.duration,
                resumptionDate: req.body.resumptionDate,
                leaveReason: req.body.leaveReason,
                reliefOfficer: req.body.reliefOfficer,
                status: req.body.status,
                newResumptionDate: req.body.newResumptionDate,
                daysRemain: req.body.daysRemain,
                userId: req.user.id

            };
            console.log(payLoad, ">>>>>payLoad");

            const data = await leaveManagementServices.createLeaveManagementService(payLoad)

            if (data) {
                res.status(200).send({ success: true, data: data })

            } else {
                res.status(400).send({ success: false, data: data })

            }



        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }

    async getLeaveManagement(req, res) {
        console.log(req.user, ">>>>>>>>>reqbody");

        try {

            let leaveHistoryDetails = await leaveManagementServices.getLeaveHistory(req.user.id);

            console.log(leaveHistoryDetails, '-<leaveHistoryDetails')
            leaveHistoryDetails.map((el) => {
                el.name = `${el.userId.firstName} ${el.userId.lastName}`
                delete el.userId
                return el
            })

            // leaveHistoryDetails[0].name = `${leaveHistoryDetails[0].userId.firstName} ${leaveHistoryDetails[0].userId.lastName}`
            // delete leaveHistoryDetails[0].userId;

            res.status(200).json({ success: true, data: leaveHistoryDetails });


        } catch (error) {
            console.log(error, '>>>>error');
            res.status(500).json({ success: false, message: "Error in getting orders data", error: error.message });
        }
    }



}

module.exports = new leaveManagementController()
const leaveManagementModal = require('../modals/leave.application.modal')


class leaveServices {
    async createLeaveManagementService(payLoad) {
        const data = await leaveManagementModal.create(payLoad)
        return data;
    }



    async getUserMapping(filters) {
        const data = await leaveManagementModal.find({}).populate('userId')
        return data;
    }


    async getLeaveHistory(userId) {
        const data = await leaveManagementModal.find({ "userId": userId }).populate('userId', 'firstName lastName').lean();
        return data;
    }

}

module.exports = new leaveServices();
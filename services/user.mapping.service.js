const userMappingModal = require('../modals/user.mapping.modal')

class UserMappingServices {
    async createUserMapping(payLoad) {
        const data = await userMappingModal.create(payLoad)
        return data;
    }

    async getUserMapping(filters) {
        const data = await userMappingModal.find({}).populate('userId')
        return data;
    }

    async getUserDetailsByUserId(userId) {
        const data = await userMappingModal.find({ 'userId': userId }).populate('userId', 'firstName lastName').lean()
        return data;
    }

}


module.exports = new UserMappingServices();
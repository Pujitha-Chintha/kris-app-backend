const userMappingModal = require('../modals/user.mapping.modal')

class UserMappingServices {
    async createUserMap(payLoad) {
        const data = await userMappingModal.create(payLoad)
        return data;
    }

    async getUserMapping(filters) {
        const data = await userMappingModal.find({}).populate('userId', 'firstName lastName').lean()
        return data;
    }

    async getUserDetailsByUserId(userId) {
        const data = await userMappingModal.find({ 'userId': userId }).populate('userId', 'firstName lastName').lean()
        return data;
    }

    async getUserJobDetailsByUserId(userId) {
        const data = await userMappingModal.find({ 'userId': userId }).populate()
        return data;
    }

}


module.exports = new UserMappingServices();
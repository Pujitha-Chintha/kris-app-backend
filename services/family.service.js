const familyModal = require('../modals/family.modal')

class familyService {
    async createFamilyDetails(payLoad) {
        const data = await familyModal.create(payLoad)
        return data;
    }

    async getFamilyDetailsByUserId(payLoad) {
        const data = await familyModal.find({}).populate()
        return data;
    }

    async updateFamilyDetailsByUserId(id, payload) {
        const data = await familyModal.findByIdAndUpdate(id, payload)
        return data;
    }
}

module.exports = new familyService();
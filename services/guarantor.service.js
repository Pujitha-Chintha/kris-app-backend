const guarantorModal = require('../modals/guarantor.modal')

class guarantorServices {
    async createGuarantorDetails(payLoad) {
        const data = await guarantorModal.create(payLoad)
        return data;
    }

    async getGuarantorDetailsByUserId(payLoad) {
        const data = await guarantorModal.find({}).populate()
        return data;
    }

    async updateGuarantorDetailsByUserId(id, payload) {
        const data = await guarantorModal.findByIdAndUpdate(id, payload)
        return data;
    }

}

module.exports = new guarantorServices();
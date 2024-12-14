const kinModal = require('../modals/kin.modal')


class kinServices {
    async createKin(payLoad) {
        const data = await kinModal.create(payLoad)
        return data;
    }


    async getKinDetailsByUserId() {
        const data = await kinModal.find({}).populate()
        return data;
    }

    async updateKinDetailsByUserId(id, payload) {
        const data = await kinModal.findByIdAndUpdate(id, payload)
        return data;
    }

}

module.exports = new kinServices();
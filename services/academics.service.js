const academicModal = require('../modals/academics.modal')

class academicServices {
    async createAcademicDetails(payLoad) {
        const data = await academicModal.create(payLoad)
        return data;
    }

    async getAcademicDetailsByUserId() {
        const data = await academicModal.find({}).populate()
        return data;
    }

    async updateAcademicDetailsByUserId(id, payload) {
        const data = await academicModal.findByIdAndUpdate(id, payload)
        return data;
    }


}

module.exports = new academicServices();
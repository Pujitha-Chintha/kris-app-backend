const financialModal = require('../modals/financial.modal')

class financialService {

    async createFinancialDetails(payload) {
        const data = await financialModal.create(payload);
        return data;
    }

    async getFinancialDetailsByUserId(payload) {
        const data = await financialModal.find({}).populate()
        return data;
    }

    async updateFinancialDetailsByUserId(id, payload) {
        const data = await financialModal.findByIdAndUpdate(id, payload)
        return data;
    }

}

module.exports = new financialService;
const financialService = require('../services/financial.service')

class financialController {

    async createFinancialDetails(req, res) {
        try {
            let payload = {
                bankName: req.body.bankName,
                accountNumber: req.body.accountNumber,
                accountName: req.body.accountName,
                registeredWith: req.body.registeredWith,
                pensionNumber: req.body.pensionNumber,
                userId: req.user.id

            }
            console.log(payload);

            const data = await financialService.createFinancialDetails(payload)
            res.status(200).send(data)

        } catch (err) {
            res.status(500).send("error in inserting data")
        }
    }

    async getFinancialDetailsByUserId(req, res) {
        try {
            const financialDetails = await financialService.getFinancialDetailsByUserId(req.params.userId)
            console.log(financialDetails, '>><><><financialDetails')

            let updatedFinancialDetails = financialDetails.map((el) => {
                delete el.userId
                return el
            })
            console.log(updatedFinancialDetails, '<><><>updatedFinancialDetails')

            res.status(200).json({ success: true, data: updatedFinancialDetails });

        } catch (err) {
            res.status(500).send("error in getting data")
        }
    }

    async updateFinancialDetailsByUserId(req, res) {
        try {
            const updateData = {};
            if (req.body.bankName) updateData.bankName = req.body.bankName;
            if (req.body.accountNumber) updateData.accountNumber = req.body.accountNumber;
            if (req.body.accountName) updateData.accountName = req.body.accountName;
            if (req.body.registeredWith) updateData.registeredWith = req.body.registeredWith;
            if (req.body.pensionNumber) updateData.pensionNumber = req.body.pensionNumber;

            console.log(req.body, "<><><>675d33eb3cf21d2604d3af65");


            const updatedFinancialDetails = await financialService.updateFinancialDetailsByUserId(
                req.body._id,
                updateData
            )

            console.log(updatedFinancialDetails, '<><><>updatedFinancialDetails');


            // if (!updatedFinancialDetails) {
            //     console.log("details not found with ID:", req.body.id);
            //     return res.status(404).send("Details not found");
            // }

            console.log(">>>>updatedFinancialDetails", updatedFinancialDetails);
            res.status(200).send("Details updated successfully");


        } catch (err) {
            res.status(500).send('error in updating financial details')
        }
    }

}

module.exports = new financialController;
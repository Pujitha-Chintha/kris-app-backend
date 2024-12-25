const guarantorService = require('../services/guarantor.service')

class guarantorController {
    async createGuarantorDetails(req, res) {
        try {
            let payload = {
                guarantorName: req.body.guarantorName,
                occupation: req.body.occupation,
                PhoneNumber: req.body.PhoneNumber,
                userId: req.user.id

            };
            console.log(payload, ">>>>>payLoad");

            const data = await guarantorService.createGuarantorDetails(payload)
            res.status(200).send(data)

        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }

    async getGuarantorDetailsByUserId(req, res) {
        try {
            let guarantorDetails = await guarantorService.getGuarantorDetailsByUserId(req.params.userId);
            console.log(guarantorDetails);

            let updatedGuarantorDetails = guarantorDetails.map((el) => {
                delete el.userId
                return el
            })

            res.status(200).json({ success: true, data: updatedGuarantorDetails });


        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }


    async updateGuarantorDetailsByUserId(req, res) {
        // console.log('in controller');

        try {
            const updateData = {};
            if (req.body.guarantorName) updateData.guarantorName = req.body.guarantorName;
            if (req.body.occupation) updateData.occupation = req.body.occupation;
            if (req.body.PhoneNumber) updateData.PhoneNumber = req.body.PhoneNumber;



            const updatedGuarantorDetails = await guarantorService.updateGuarantorDetailsByUserId(
                req.body._id,
                updateData
            )

            console.log(updatedGuarantorDetails, '<<updatedGuarantorDetails');


            // if (!updatedGuarantorDetails) {
            //     console.log("details not found with ID:", req.params.id);
            //     return res.status(404).send("Details not found");
            // }


            console.log(">>>>updatedGuarantorDetails", updatedGuarantorDetails);
            res.status(200).send("Details updated successfully");
        } catch (error) {
            console.log(error, '>>>>error')
            res.status(500).send('error in updating academic details')

        }
    }




}


module.exports = new guarantorController()
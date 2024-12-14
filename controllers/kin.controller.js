const kinService = require('../services/kin.service')



class kinDetailController {
    async createKin(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody")

        try {
            let payLoad = {
                kinName: req.body.kinName,
                kinJob: req.body.kinJob,
                kinPhoneNumber: req.body.kinPhoneNumber,
                kinRelationship: req.body.kinRelationship,
                kinResidentialAddress: req.body.kinResidentialAddress,
                userId: req.user.id

            };
            console.log(payLoad, ">>>>>payLoad");

            const data = await kinService.createKin(payLoad)
            res.status(200).send(data)


        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }


    async getKinDetailsByUserId(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody");

        try {


            let kinDetails = await kinService.getKinDetailsByUserId(req.params.userId);
            console.log(kinDetails, '-<<kinDetails')

            let updatedKinDetails = kinDetails.map((el) => {
                // el.email = el.userId.email
                // el.phoneNumber = el.userId.phoneNumber || ''
                // el.phoneNumber2 = el.userId.phoneNumber2

                // delete el.doorNumber
                // delete el.pinCode
                delete el.userId

                return el
            })

            res.status(200).json({ success: true, data: updatedKinDetails });

        } catch (error) {
            console.log(error, '>>>>error');
            res.status(500).json({ success: false, message: "Error in getting contact data", error: error.message });
        }
    }

    async updateKinDetailsByUserId(req, res) {
        console.log('in controller');

        try {
            const updateData = {};
            if (req.body.kinName) updateData.kinName = req.body.kinName;
            if (req.body.kinJob) updateData.kinJob = req.body.kinJob;
            if (req.body.kinPhoneNumber) updateData.kinPhoneNumber = req.body.kinPhoneNumber;
            if (req.body.kinRelationship) updateData.kinRelationship = req.body.kinRelationship;
            if (req.body.kinResidentialAddress) updateData.kinResidentialAddress = req.body.kinResidentialAddress;



            const updatedKinDetails = await kinService.updateKinDetailsByUserId(
                req.body.id,
                updateData
            )

            console.log(updatedKinDetails, '<<updatedKinDetails');


            if (!updatedKinDetails) {
                console.log("details not found with ID:", req.params.id);
                return res.status(404).send("Details not found");
            }


            console.log(">>>>updatedKinDetails", updatedKinDetails);
            res.status(200).send("Details updated successfully");
        } catch (error) {
            console.log(error, '>>>>error')
            res.status(500).send('error in updating kin details')

        }
    }

}

module.exports = new kinDetailController()
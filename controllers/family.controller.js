const familyService = require('../services/family.service')

class familyController {
    async createFamilyDetails(req, res) {
        try {
            let payload = {
                nameOfFamilyMember: req.body.nameOfFamilyMember,
                relationship: req.body.relationship,
                PhoneNumber: req.body.PhoneNumber,
                address: req.body.address,
                userId: req.user.id

            };
            console.log(payload, ">>>>>payLoad");

            const data = await familyService.createFamilyDetails(payload)
            res.status(200).send(data)

        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }

    async getFamilyDetailsByUserId(req, res) {
        try {
            let familyDetails = await familyService.getFamilyDetailsByUserId(req.params.userId);
            console.log(familyDetails);

            let updatedFamilyDetails = familyDetails.map((el) => {
                delete el.userId
                return el
            })

            res.status(200).json({ success: true, data: updatedFamilyDetails });


        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }


    async updateFamilyDetailsByUserId(req, res) {
        // console.log('in controller');

        try {
            const updateData = {};
            if (req.body.nameOfFamilyMember) updateData.nameOfFamilyMember = req.body.nameOfFamilyMember;
            if (req.body.relationship) updateData.relationship = req.body.relationship;
            if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
            if (req.body.address) updateData.address = req.body.address;


            const updatedFamilyDetails = await familyService.updateFamilyDetailsByUserId(
                req.body._id,
                updateData
            )

            console.log(updatedFamilyDetails, '<<updatedFamilyDetails');


            // if (!updatedFamilyDetails) {
            //     console.log("details not found with ID:", req.params.id);
            //     return res.status(404).send("Details not found");
            // }


            console.log(">>>>updatedFamilyDetails", updatedFamilyDetails);
            res.status(200).send("Details updated successfully");
        } catch (error) {
            console.log(error, '>>>>error')
            res.status(500).send('error in updating family details')

        }
    }
}

module.exports = new familyController;
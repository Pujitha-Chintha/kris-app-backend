const addressService = require('../services/address.service')

class addressController {
    async createAddress(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody")

        try {
            let payLoad = {
                doorNumber: req.body.doorNumber,
                city: req.body.city,
                state: req.body.state,
                pinCode: req.body.pinCode,
                residentialAddress: req.body.residentialAddress,
                userId: req.user.id

            };
            console.log(payLoad, ">>>>>payLoad");

            const data = await addressService.createAddress(payLoad)
            res.status(200).send(data)



        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }

    async getContactDetailsByUserId(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody");

        try {


            let contactDetails = await addressService.getContactDetailsByUserId(req.body.userId);
            console.log(contactDetails, '-<<contactDetails')


            // let updatedContactDetails = contactDetails.map((el) => {

            //     delete el.doorNumber
            //     delete el.pinCode
            //     return el
            // })


            res.status(200).json({ success: true, data: contactDetails });

        } catch (error) {
            console.log(error, '>>>>error');
            res.status(500).json({ success: false, message: "Error in getting contact data", error: error.message });
        }
    }


    async updateContactDetailsByUserId(req, res) {
        try {
            const updateData = {};
            if (req.body.city) updateData.city = req.body.city;
            if (req.body.state) updateData.state = req.body.state;
            if (req.body.residentialAddress) updateData.residentialAddress = req.body.residentialAddress;


            const updatedContacts = await addressService.updateContactDetailsByUserId(
                req.params.id,
                updateData,
                { new: true }
            )
            if (!updatedContacts) {
                console.log("contact not found with ID:", req.params.id);
                return res.status(404).send("contact not found");
            }
            console.log(">>>>updatedContacts", updatedContacts);
            res.status(200).send("contact updated successfully");
        } catch (error) {
            console.log(error, '>>>>error')
            res.status(500).send('error in updating contact')

        }
    }


}

module.exports = new addressController()
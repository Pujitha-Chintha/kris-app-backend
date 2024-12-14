const addressService = require('../services/address.service');
// const usersService = require('../services/users.service');

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


            let addressDetails = await addressService.getAddressDetails(req.params.userId);
            console.log(addressDetails, '-<<addressDetails')

            let updatedContactDetails = addressDetails.map((el) => {
                el.email = el.userId.email
                el.phoneNumber = el.userId.phoneNumber || ''
                el.phoneNumber2 = el.userId.phoneNumber2

                delete el.doorNumber
                delete el.pinCode
                delete el.userId

                return el
            })

            res.status(200).json({ success: true, data: updatedContactDetails });

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

            const userObj = {};
            if (req.body.email) userObj.email = req.body.email;
            if (req.body.phoneNumber) userObj.phoneNumber = req.body.phoneNumber;
            if (req.body.phoneNumber2) userObj.phoneNumber2 = req.body.phoneNumber2;


            const updatedContacts = await addressService.updateContactDetailsByUserId(
                req.body.id,
                updateData
            )

            console.log(updatedContacts, '<<updatedContacts');
            console.log(userObj, '<<userObj');

            const _id = req.user.id

            const updatedUserDetails = await addressService.updateUserDetailsByUserId(
                _id,
                userObj

            )

            console.log(updatedUserDetails, '<><>>??>?updatedUserDetails');


            if (!updatedContacts) {
                console.log("contact not found with ID:", req.params.id);
                return res.status(404).send("contact not found");
            }

            if (!updatedUserDetails) {
                return res.status(404).send("user not found");
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
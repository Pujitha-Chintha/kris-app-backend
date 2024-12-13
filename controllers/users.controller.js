const usersService = require('../services/users.service');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class userController {
    async createUser(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody")

        try {
            let payLoad = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                phoneNumber2: req.body.phoneNumber2,
                email: req.body.email,
                password: req.body.password,
                Status: req.body.status,
            };
            console.log(payLoad, ">>>>>payLoad");
            const saltRounds = 10;
            payLoad.password = await bcrypt.hash(payLoad.password, saltRounds);

            console.log(payLoad, '>>>payload')
            const data = await usersService.createUser(payLoad)
            res.status(200).send(data)



        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }

    async login(req, res) {
        console.log('incontroller')
        try {
            console.log(req.body, ">>>>>>>>>reqbody");

            // Fetch user details
            let userDetails = await usersService.fetchUser(req.body.email);
            console.log(userDetails, '>>>>>>>>>>>>>>userDetails');

            if (userDetails.length === 0) {
                return res.status(404).send('User not found');
            }

            // Compare the password
            const isPasswordMatch = await bcrypt.compare(req.body.password, userDetails[0].password);
            if (!isPasswordMatch) {
                return res.status(401).send('Incorrect password, try again');
            }
            console.log(userDetails[0], "?????userDetails[0]");

            let modifiedUser = {
                id: userDetails[0]._id,
                email: userDetails[0].email,
                firstName: userDetails[0].firstName,
                lastName: userDetails[0].lastName,
                phoneNumber: userDetails[0].phoneNumber,
                phoneNumber2: userDetails[0].phoneNumber2,
                Status: userDetails[0].Status


            }
            // console.log(userDetails, '>>><><>freshdetails')
            let token = jwt.sign(modifiedUser, 'mySecretCode');
            modifiedUser.token = token;
            var decoded = jwt.verify(token, 'mySecretCode');
            console.log(decoded, "???>?>decoded");

            return res.status(200).send(modifiedUser);
        } catch (err) {
            console.error(err);
            res.status(500).send("Error during login");
        }
    }

}

module.exports = new userController()
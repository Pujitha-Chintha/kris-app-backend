const usersMappingService = require('../services/user.mapping.service')


class userMappingController {
    async createUserMapping(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody")

        try {
            let payLoad = {
                role: req.body.role,
                department: req.body.department,
                jobTitle: req.body.jobTitle,
                jobCategory: req.body.jobCategory,
                lineManager: req.body.lineManager,
                userId: req.user.id
            };
            console.log(payLoad, ">>>>>payLoad");

            const data = await usersMappingService.createUserMap(payLoad)
            res.status(200).send(data)



        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }

    async getUserMapping(req, res) {
        console.log(req.user, ">>>>>>>>>reqbody");

        try {
            let filters = req.body;

            let userDetails = await usersMappingService.getUserMapping(filters);
            console.log(userDetails, '-<<userDetails')


            let updatedUserDetails = userDetails.map((el) => {
                return {
                    name: `${el.userId.firstName} ${el.userId.lastName}`,
                    jobTitle: el.jobTitle
                };
            });

            res.status(200).json({ success: true, data: updatedUserDetails });

        } catch (error) {
            console.log(error, '>>>>error');
            res.status(500).json({ success: false, message: "Error in getting orders data", error: error.message });
        }
    }


    async getUserDetailsByUserId(req, res) {
        console.log(req.params.userId, ">>>>>>>>>reqbody");

        try {
            let userDetails = await usersMappingService.getUserDetailsByUserId(req.params.userId);
            console.log(userDetails, '-<<userDetails')


            let updatedUserDetails = userDetails.map((el) => {
                el.name = `${el.userId.firstName} ${el.userId.lastName}`

                delete el.userId
                delete el.role
                delete el.lineManager
                return el
            })


            res.status(200).json({ success: true, data: updatedUserDetails });

        } catch (error) {
            console.log(error, '>>>>error');
            res.status(500).json({ success: false, message: "Error in getting user data", error: error.message });
        }
    }


    async getUserJObDetailsByUserId(req, res) {
        console.log(req.params.userId, ">>>>>>>>>reqbody");

        try {
            let userJobDetails = await usersMappingService.getUserJobDetailsByUserId(req.params.userId);
            console.log(userJobDetails, '-<<userDetails')


            let updatedUserJobDetails = userJobDetails.map((el) => {
                return {
                    role: el.role,
                    department: el.department,
                    lineManager: el.lineManager
                }
            })

            console.log(updatedUserJobDetails, "<???<updatedUserJobDetails")


            res.status(200).json({ success: true, data: updatedUserJobDetails });

        } catch (error) {
            console.log(error, '>>>>error');
            res.status(500).json({ success: false, message: "Error in getting user job data", error: error.message });
        }
    }




};

module.exports = new userMappingController()

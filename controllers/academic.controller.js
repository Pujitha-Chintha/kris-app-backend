const academicService = require('../services/academics.service')

class academicController {
    async createAcademicDetails(req, res) {
        try {
            let payload = {
                nameOfInstitute: req.body.nameOfInstitute,
                department: req.body.department,
                course: req.body.course,
                instituteLocation: req.body.instituteLocation,
                academicStartDate: req.body.academicStartDate,
                academicEndDate: req.body.academicEndDate,
                description: req.body.description,
                userId: req.user.id

            };
            console.log(payload, ">>>>>payLoad");

            const data = await academicService.createAcademicDetails(payload)
            res.status(200).send(data)

        } catch (err) {
            console.error(err);
            res.status(500).send("error in inserting data")
        }
    }


    async getAcademicDetailsByUserId(req, res) {
        console.log(req.body, ">>>>>>>>>reqbody");

        try {


            let academicDetails = await academicService.getAcademicDetailsByUserId(req.params.userId);
            console.log(academicDetails, '-<<academicDetails')

            let updatedAcademicDetails = academicDetails.map((el) => {
                // el.email = el.userId.email
                // el.phoneNumber = el.userId.phoneNumber || ''
                // el.phoneNumber2 = el.userId.phoneNumber2

                // delete el.doorNumber
                // delete el.pinCode
                delete el.userId

                return el
            })

            res.status(200).json({ success: true, data: updatedAcademicDetails });

        } catch (error) {
            console.log(error, '>>>>error');
            res.status(500).json({ success: false, message: "Error in getting academic data", error: error.message });
        }
    }

    async updateAcademicDetailsByUserId(req, res) {
        // console.log('in controller');

        try {
            const updateData = {};
            if (req.body.nameOfInstitute) updateData.nameOfInstitute = req.body.nameOfInstitute;
            if (req.body.department) updateData.department = req.body.department;
            if (req.body.course) updateData.course = req.body.course;
            if (req.body.instituteLocation) updateData.instituteLocation = req.body.instituteLocation;
            if (req.body.academicStartDate) updateData.academicStartDate = req.body.academicStartDate;
            if (req.body.academicEndDate) updateData.academicEndDate = req.body.academicEndDate;
            if (req.body.description) updateData.description = req.body.description;


            const updatedAcademicDetails = await academicService.updateAcademicDetailsByUserId(
                req.body.id,
                updateData
            )

            console.log(updatedAcademicDetails, '<<updatedAcademicDetails');


            if (!updatedAcademicDetails) {
                console.log("details not found with ID:", req.params.id);
                return res.status(404).send("Details not found");
            }


            console.log(">>>>updatedAcademicDetails", updatedAcademicDetails);
            res.status(200).send("Details updated successfully");
        } catch (error) {
            console.log(error, '>>>>error')
            res.status(500).send('error in updating academic details')

        }
    }
}


module.exports = new academicController()
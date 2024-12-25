const addressModal = require('../modals/address.modal')
const usersModal = require('../modals/users.modal')


class addressServices {
    async createAddress(payLoad) {
        const data = await addressModal.create(payLoad)
        return data;
    }

    // async getContactDetailsByUserId(userId) {
    //     const data = await addressModal.find({ "userId": userId }).populate('userId').lean();
    //     // const data = await addressModal.find().populate('userId').lean();
    //     return data;
    // }

    // async getContactDetailsByUserId(userId) {
    //     // const data = await addressModal
    //     //     .find({ "userId": '6759888edba23bc6582aa67d' }).populate('userId')
    //     // // .populate('userId', 'firstName lastName') // Specify fields to populate from the `users` schema
    //     // // .lean();
    //     // return data;

    //     const data = await addressModal.find({ "userId": userId }).populate('userId')
    //     // .populate('userId', 'firstName lastName') // Specify fields to populate from the `users` schema
    //     // .lean();
    //     return data;
    // }

    async getAddressDetails(userId) {
        const data = await addressModal
            .find({ "userId": userId })
            .populate('userId', 'phoneNumber phoneNumber2 email')
            .lean();
        return data;
    }


    async updateContactDetailsByUserId(id, payLoad) {
        console.log(id, payLoad, '-<,id, payLoad')
        const data = await addressModal.findByIdAndUpdate(id, payLoad)
        return data;
    }

    async updateUserDetailsByUserId(id, payLoad) {
        const data = await usersModal.findByIdAndUpdate(id, payLoad)
        return data;
    }

}

module.exports = new addressServices();
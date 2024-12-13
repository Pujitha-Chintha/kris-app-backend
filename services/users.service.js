const userModal = require('../modals/users.modal')


class UserServices {
    async createUser(payLoad) {
        const data = await userModal.create(payLoad)
        return data;
    }
    async fetchUser(email) {
        const users = await userModal.find({
            'email': email
        })
        console.log(users, ">>>>users");

        return users;


    }
}

module.exports = new UserServices();
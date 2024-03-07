const { json } = require('body-parser');
const UserControlModel = require('../model/userControl.model');
const ClubModel = require('../model/club.model')

class UserControlServices {
    static async createUserControl(userName, ownerPermission, adminOf, ownerOf, follow, pending, join) {

        const createUserControl = new UserControlModel({ userName, ownerPermission, adminOf, ownerOf, follow, pending, join });
        return await createUserControl.save();
    }

    static async addFollowClub(userName, clubId) {
        try {
            await UserControlModel.updateOne(
                { userName: userName },
                { $addToSet: { follow: clubId } }
            )

            await ClubModel.updateOne(
                { _id: clubId},
                {$addToSet: { follower: userName }}
            )
        }
        catch (error) {
            throw error;
        }

    }
}

module.exports = UserControlServices;
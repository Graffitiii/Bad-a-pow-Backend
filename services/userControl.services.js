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
                { _id: clubId },
                { $addToSet: { follower: userName } }
            )
        }
        catch (error) {
            throw error;
        }

    }

    static async unFollowClub(userName, clubId) {
        try {
            await UserControlModel.updateOne(
                { userName: userName },
                { $pull: { follow: clubId } }
            )

            await ClubModel.updateOne(
                { _id: clubId },
                { $pull: { follower: userName } }
            )
        }
        catch (error) {
            throw error;
        }

    }

    static async getFollowClubId(userName) {
        const getFollowClubId = UserControlModel.findOne({ userName: userName });
        return await getFollowClubId;
    }

    static async registerOwner(userName) {
        const registerOwner = await UserControlModel.findOneAndUpdate({ userName: userName },
            {
                $set: { ownerPermission: true }
            })

        // return await registerOwner;
    }
}

module.exports = UserControlServices;
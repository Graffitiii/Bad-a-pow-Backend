const { json } = require('body-parser');
const UserControlModel = require('../model/userControl.model');
const ClubModel = require('../model/club.model');
const EventModel = require('../model/event.model')

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

    static async getUserControl(userName) {
        const getUserControl = UserControlModel.findOne({ userName: userName });
        return await getUserControl;
    }

    static async registerOwner(userName) {
        const registerOwner = await UserControlModel.findOneAndUpdate({ userName: userName },
            {
                $set: { ownerPermission: true }
            })

        // return await registerOwner;
    }

    static async getUserControl(userName){
        try {
            const userControl = UserControlModel.findOne({userName: userName})
            return await userControl;
        } catch (error) {
            
        }
    }

    static async sendRequest(userName, event_id) {
        try {
            await UserControlModel.updateOne(
                { userName: userName },
                { $addToSet: { pending: event_id } }
            )

            await EventModel.updateOne(
                { _id: event_id },
                { $addToSet: { pending: userName } }
            )
        }
        catch (error) {
            throw error;
        }

    }

    static async unRequest(userName, event_id) {
        try {
            await UserControlModel.updateOne(
                { userName: userName },
                { $pull: { pending: event_id } }
            )

            await EventModel.updateOne(
                { _id: event_id },
                { $pull: { pending: userName } }
            )
        }
        catch (error) {
            throw error;
        }

    }

    static async joinEvent(userName, event_id) {
        try {
            await UserControlModel.updateOne(
                { userName: userName },
                { $addToSet: { join: event_id } }
            )

            await EventModel.updateOne(
                { _id: event_id },
                { $addToSet: { join: userName } }
            )
        }
        catch (error) {
            throw error;
        }

    }

    static async unJoinEvent(userName, event_id) {
        try {
            await UserControlModel.updateOne(
                { userName: userName },
                { $pull: { join: event_id } }
            )

            await EventModel.updateOne(
                { _id: event_id },
                { $pull: { join: userName } }
            )
        }
        catch (error) {
            throw error;
        }

    }

    static async getStatusId(userName) {
        const getStatusId = UserControlModel.findOne({ userName: userName });
        return await getStatusId;
    }
}

module.exports = UserControlServices;
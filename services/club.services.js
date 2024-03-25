const { json } = require('body-parser');
const ClubModel = require('../model/club.model');
const UserControlModel = require('../model/userControl.model');

class ClubServices{
    static async createClub(owner,follower,clubname,admin,event_id){

        const createClub = new ClubModel({owner,follower,clubname,admin,event_id});
        await UserControlModel.updateOne(
            { 
                userName: owner },
            { $addToSet: {ownerOf : createClub._id.toString() } }
        )
        return await createClub.save();

        
    }

    static async getClub(clubname){
        const getClub = ClubModel.findOne({clubname:clubname});
        return await getClub;
    }

    static async getClubList(){
        try{
            return await ClubModel.find();
        }catch(error){
            throw error;
        }
    }

    static async getClubById(followIdList){
        try{
            return await ClubModel.find({ 
                _id: {
                    $in: followIdList
                }
            });
        }catch(error){
            throw error;
        }
    }


   
    
}

module.exports = ClubServices;
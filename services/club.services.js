const { json } = require('body-parser');
const ClubModel = require('../model/club.model');

class ClubServices{
    static async createClub(owner,follower,clubname,admin,event_id){

        const createClub = new ClubModel({owner,follower,clubname,admin,event_id});
        return await createClub.save();

        
    }

    static async getClub(clubname){
        const getClub = ClubModel.findOne({clubname:clubname});
        return await getClub;
    }
}

module.exports = ClubServices;
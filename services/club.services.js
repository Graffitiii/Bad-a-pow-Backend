const { json } = require('body-parser');
const ClubModel = require('../model/club.model');
const UserControlModel = require('../model/userControl.model');
const EventModel = require('../model/event.model');
const ReviewModel = require('../model/review.model');
const EventServices = require('../services/event.services');

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

    static async deleteClub(id,clubname) {
        try {
          
            const deleteClub = await ClubModel.findOneAndDelete({ _id: id ,clubname:clubname});
    
            await UserControlModel.updateMany(
                { $or: [{ ownerOf: id }, { adminOf: id }, { follow: id }] },
                { $pull: { ownerOf: id, adminOf: id,follow: id } }
            );

            await ReviewModel.deleteMany({ clubname: clubname });

    
            console.log(deleteClub);

            for(let i=0 ; i<deleteClub.event_id.length ; i++){
                await EventServices.deleteEvent(deleteClub.event_id[i]);
                // await deleteEvent(deleteClub.event_id[i]);
            }

            
    
            console.log(`Club ${id} deleted successfully`);
            return deleteClub;
        } catch (error) {
            console.error(`Error deleting event: ${error.message}`);
            throw error;
        }
    }


   
    
}

module.exports = ClubServices;
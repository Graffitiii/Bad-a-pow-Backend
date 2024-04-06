const { json } = require('body-parser');
const EventModel = require('../model/event.model');
const ClubModel = require('../model/club.model');
const UserControlModel = require('../model/userControl.model');

class EventServices{
    static async createEvent(image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active,pending,join,placename,latitude,longitude,userlimit){

        const createEvent = new EventModel({image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active,pending,join,placename,latitude,longitude,userlimit});
        try {
            // console.log(createEvent);
            await ClubModel.updateOne(
                { clubname: club },
                { $addToSet: {event_id : createEvent._id.toString() } }
            )
        }
        catch (error) {
            // res.json({status:false,success:'Error'})
        }
        return await createEvent.save();

    }

    static async getEventList(){
        try{
            return await EventModel.find();
        }catch(error){
            throw error;
        }
        

    }


    static async deleteEvent(id) {
        try {
            // Find and delete the event with the given ID
            const deletedEvent = await EventModel.findOneAndDelete({ _id: id });
    
            if (!deletedEvent) {
                throw new Error('Event not found');
            }
    
            // Delete corresponding userControllerModel entries
            await UserControlModel.updateMany(
                { $or: [{ pending: id }, { join: id }] },
                { $pull: { pending: id, join: id } }
            );

            await ClubModel.updateMany(
                { $or: [{ event_id: id }] },
                { $pull: { event_id: id} }
            );
    
            console.log(`Event with ID ${id} deleted successfully`);
            return deletedEvent;
        } catch (error) {
            console.error(`Error deleting event: ${error.message}`);
            throw error;
        }
    }

    static async getOwnEventList(ownIdList){
        try{
            return await EventModel.find({ 
                _id: {
                    $in: ownIdList
                }
            });
        }catch(error){
            throw error;
        }
    }

    static async putEventStatus(eventId,status){
        try {
            return await EventModel.findOneAndUpdate({ _id: eventId },
                {
                    $set: { active: !status }
                });
        } catch (error) {
            throw error;
        }
    }

    static async getEventDetail(eventId){
        try {
            return await EventModel.findOne({ _id: eventId });
        } catch (error) {
            throw error;
        }
    }


    static async getFilter(level,sdate,distance){
        try{
            let query = {}
            if(level != undefined){
                query.level = level
            }
            if(sdate != ''){
                query.
                eventdate_start = sdate
            }
            // if(distance != ""){
            //     query.
            //     eventdate_start = sdate
            // }
            if(distance != ''){
                console.log(distance);
            }
            
            console.log(query);
            return await EventModel.find(query);
        }catch(error){
            res.json({status:false,success:'Error'})
        }
        

    }

    static async getStatusEvent(eventidList){
        try{
            return await EventModel.find({ 
                _id: {
                    $in: eventidList
                }
            });
        }catch(error){
            throw error;
        }
    }

    static async editEvent(image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details){
        try {
            // console.log(userName , picture,gender,level,about,ageShow);
           return await EventModel.findOneAndUpdate({club : club},{$set :{image : image,contact:contact,eventdate_start: eventdate_start,eventdate_end:eventdate_end,level:level,brand:brand,price_badminton:price_badminton,priceplay:priceplay,details:details}})
        } catch (error) {
            throw error;
        }
    }

   
}

module.exports = EventServices;
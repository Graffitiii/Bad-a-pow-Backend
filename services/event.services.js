const { json } = require('body-parser');
const EventModel = require('../model/event.model');
const ClubModel = require('../model/club.model');

class EventServices{
    static async createEvent(image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active){

        const createEvent = new EventModel({image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active});
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

    static async putEvent(id, newData){
        try {
            // สร้างตัวแปรที่เก็บข้อมูลที่ต้องการอัปเดต
            const updateData = {
                image: newData.image,
                club: newData.club,
                contact: newData.contact,
                eventdate: newData.eventdate,
                level: newData.level,
                brand: newData.brand,
                price_badminton: newData.price_badminton,
                priceplay: newData.priceplay,
                details: newData.details
            };
    
            // ทำการอัปเดตข้อมูลโดยใช้ _id เดิม
            const updatedEvent = await EventModel.findOneAndUpdate(
                { _id: id },
                updateData,
                { new: true } // เพื่อให้คืนค่าเหตุการณ์ที่ถูกอัปเดตกลับมา
            );
    
            return updatedEvent;
        } catch (error) {
            throw error;
        }
    }

    static async deleteEvent(id){
        const deleted = await EventModel.findOneAndDelete({_id:id});
        console.log(id);
        return deleted;
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
}

module.exports = EventServices;
const { json } = require('body-parser');
const EventModel = require('../model/event.model');
const ClubModel = require('../model/club.model');
const UserControlModel = require('../model/userControl.model');

class EventServices {
    static async createEvent(image, club, contact, eventdate_start, eventdate_end, level, brand, price_badminton, priceplay, details, active, pending, join, placename, latitude, longitude, userlimit) {

        const createEvent = new EventModel({ image, club, contact, eventdate_start, eventdate_end, level, brand, price_badminton, priceplay, details, active, pending, join, placename, latitude, longitude, userlimit });
        try {
            // console.log(createEvent);
            await ClubModel.updateOne(
                { clubname: club },
                { $addToSet: { event_id: createEvent._id.toString() } }
            )
        }
        catch (error) {
            // res.json({status:false,success:'Error'})
        }
        return await createEvent.save();

    }

    static async getEventList() {
        try {
            return await EventModel.find();
        } catch (error) {
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
        } catch (error) {
            throw error;
        }
    }

    static async putEventStatus(eventId, status) {
        try {
            return await EventModel.findOneAndUpdate({ _id: eventId },
                {
                    $set: { active: !status }
                });
        } catch (error) {
            throw error;
        }
    }

    static async getEventDetail(eventId) {
        try {
            return await EventModel.findOne({ _id: eventId });
        } catch (error) {
            throw error;
        }
    }

    static async getFilter(level, sdate, distance, latitude, longitude, club) {

        async function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2) {

            let theta = longitude1 - longitude2;
            let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(
                Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
                Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180))
            );

            return Math.round(distance * 1.609344, 2);

        }

        try {
            let distanceQuery = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
            let defaultQuery = {}
            if (level != undefined) {
                defaultQuery.level = {$all : level};
            }
            if (sdate != '') {
                defaultQuery.
                    eventdate_start = sdate;
            }
            if (club != '') {
                defaultQuery.
                    club =  {$regex : club};
            }
            if (distance == '') {
                distanceQuery.distance = parseInt('10');
            }
            if (distance != '') {
                distanceQuery.distance = parseInt(distance);
            }
            
            // defaultQuery.
            //         eventdate_start = {$gte : new Date("2024-03-5"),$lt : new Date("2024-03-6")};

            console.log('defaultQuery');
            console.log(defaultQuery);
            console.log('distanceQuery');
            console.log(distanceQuery);
            

            const result = await EventModel.find(defaultQuery);

            let distanceIdList = [];
            let kilometersList = {};
            for (let i = 0; i < result.length; i++) {
                let kilometers = await getDistanceBetweenPoints(distanceQuery.latitude, distanceQuery.longitude, result[i].latitude, result[i].longitude);
                
                if (kilometers <= distanceQuery.distance) {

                    kilometersList[result[i]._id.valueOf()] = kilometers;
                    distanceIdList.push(result[i]._id.valueOf());
                }
            }

            console.log(distanceIdList);

            const distanceResult = await EventModel.find({ 
                _id: {
                    $in: distanceIdList
                }
            });

            // console.log(distanceResult);
            // console.log(kilometersList);


            return {result:distanceResult,distance:kilometersList};
        } catch (error) {
            res.json({ status: false, success: 'Error' })
        }


    }



    static async getStatusEvent(eventidList) {
        try {
            return await EventModel.find({
                _id: {
                    $in: eventidList
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async editEvent(image, id, contact, eventdate_start, eventdate_end, level, brand, price_badminton, priceplay, details,userlimit) {
        try {
            return await EventModel.findOneAndUpdate({ _id: id }, { $set: { image: image, contact: contact, eventdate_start: eventdate_start, eventdate_end: eventdate_end, level: level, brand: brand, price_badminton: price_badminton, priceplay: priceplay, details: details, userlimit: userlimit } })
        } catch (error) {
            throw error;
        }
    }


}

module.exports = EventServices;
const EventServices = require('../services/event.services');
const UserControlServices = require('../services/userControl.services');

exports.createEvent = async (req,res,next)=>{
    try {
        const {image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active,pending,join,placename,latitude,longitude,userlimit} = req.body;

        let create = await EventServices.createEvent(image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active,pending,join,placename,latitude,longitude,userlimit);

        res.json({status:true,eventlistdata:create});

        
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.getEventList = async (req,res,next)=>{
    try {
        const {} = req.body;

        let get = await EventServices.getEventList();

        // console.log(get);

        res.json({status:true,eventlistdata:get});
    } catch (error) {
        throw err;
        // res.json({status:false,success:'Error'})
    }


}

exports.deleteEvent = async (req, res, next) => {
    try {
        const { _id } = req.body;

        let deleted = await EventServices.deleteEvent(_id);

        res.json({ status: true, eventlistdata: deleted });
    } catch (error) {
        throw error; // ใช้ throw error แทนที่จะใช้ throw err
    }
}

exports.cancelEvent = async (req, res, next) => {
    try {
        const { _id } = req.body;

        let deleted = await EventServices.cancelEvent(_id);

        res.json({ status: true, eventlistdata: deleted });
    } catch (error) {
        throw error; // ใช้ throw error แทนที่จะใช้ throw err
    }
}

exports.getOwnEventList = async (req,res,next)=>{
    try {
        const ownIdList = req.query.ownIdList;

        let result =  await EventServices.getOwnEventList(ownIdList);
        
        res.json({status:true,data:result});
    } catch (error) {
        throw error;
    }
}

exports.startEvent = async (req,res,next)=>{
    try {
        const { eventId, event_start } = req.body;
        let result =  await EventServices.startEvent(eventId,event_start);
        
        res.json({edit:true,data:result});
    } catch (error) {
        throw error;
    }
}

exports.getEventDetail = async (req,res,next)=>{
    try {
        const eventId = req.query.id;

        let result =  await EventServices.getEventDetail(eventId);
        
        res.json({status:true,data:result});
    } catch (error) {
        
    }
}


exports.getFilter = async (req,res,next)=>{
    try {
        const level = req.query.level;
        const sdate = req.query.eventdate_start;
        const stime = req.query.event_time;
        const distance = req.query.distance;
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;
        const club = req.query.club;
        const status = req.query.status;
        let get = await EventServices.getFilter(level,sdate,stime,distance,latitude,longitude,club,status);

        res.json({status:true,data:get.result,distance:get.distance});
    } catch (error) {
        
        res.json({status:false,success:'Error'})
    }


}

exports.getPendingEvent = async (req,res,next)=>{
    try {
        const userName = req.query.userName;

        let get = await UserControlServices.getStatusId(userName);

        let penddingIdList = get.pending

        let result =  await EventServices.getStatusEvent(penddingIdList);
        
        res.json({status:true,data:result});
    } catch (error) {
        console.log("dwadw");
    }
}

exports.getJoinEvent = async (req,res,next)=>{
    try {
        const userName = req.query.userName;

        let get = await UserControlServices.getStatusId(userName);

        let joinIdList = get.join

        let result =  await EventServices.getStatusEvent(joinIdList);
        
        res.json({status:true,data:result});
    } catch (error) {
        console.log("torew[re");
    }
}

exports.editEvent = async(req,res,next)=>{
    try {
        const {image,id,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,userlimit} = req.body;
        console.log(req.body);
        let result =  await EventServices.editEvent(image,id,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,userlimit);

        res.json({status:true,data:result});
    } catch (error) {
        
    }
}

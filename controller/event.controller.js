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

        console.log(get);

        res.json({status:true,eventlistdata:get});
    } catch (error) {
        throw err;
        // res.json({status:false,success:'Error'})
    }


}

exports.putEventList = async (req, res, next) => {
    try {
        const { image, club, contact, eventdate, level, brand, price_badminton, priceplay, details } = req.body;
        const eventId = req.params.id; // ดึง _id จากพารามิเตอร์ของ request

        // เรียกใช้ฟังก์ชัน putEvent โดยส่ง _id และข้อมูลที่ต้องการอัปเดตเข้าไป
        let updatedEvent = await EventServices.putEvent(eventId, { 
            image, 
            club, 
            contact, 
            eventdate, 
            level, 
            brand, 
            price_badminton, 
            priceplay, 
            details 
        });

        // ส่งค่ากลับไปในรูปแบบ JSON
        res.json({ status: true, eventlistdata: updatedEvent });
    } catch (error) {
        // ถ้าเกิด error ให้ส่ง response กลับไปพร้อมกับ status false และข้อความ error
        res.status(500).json({ status: false, error: error.message });
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

exports.getOwnEventList = async (req,res,next)=>{
    try {
        const ownIdList = req.query.ownIdList;

        let result =  await EventServices.getOwnEventList(ownIdList);
        
        res.json({status:true,data:result});
    } catch (error) {
        throw error;
    }
}

exports.putEventStatus = async (req,res,next)=>{
    try {
        const { eventId,status } = req.body;
        let result =  await EventServices.putEventStatus(eventId,status);
        
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
        

        let get = await EventServices.getFilter(level,sdate);

        res.json({status:true,success:get});
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
        const {image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details} = req.body;

        let result =  await EventServices.editEvent(image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details);

        res.json({status:true,data:result});
    } catch (error) {
        
    }
}

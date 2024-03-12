const EventServices = require('../services/event.services');

exports.createEvent = async (req,res,next)=>{
    try {
        const {image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active} = req.body;

        let create = await EventServices.createEvent(image,club,contact,eventdate_start,eventdate_end,level,brand,price_badminton,priceplay,details,active);

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
        
    }
}
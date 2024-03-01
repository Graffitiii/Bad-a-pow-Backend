const ClubServices = require('../services/club.services');

exports.createClub = async (req,res,next)=>{
    try {
        const {owner,follower,clubname,admin,event_id} = req.body;

        let create = await ClubServices.createClub(owner,follower,clubname,admin,event_id);

        res.json({status:true,success:create});
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}
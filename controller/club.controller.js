const ClubServices = require('../services/club.services');
const UserControlServices = require('../services/userControl.services');

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

exports.getClub = async (req,res,next)=>{
    try {
        // const {clubname} = req.body;
        const clubname = req.query.clubname;

        let club = await ClubServices.getClub(clubname);

        res.json({status:true,club:club});
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.getClubList = async (req,res,next)=>{
    try {
        const {} = req.body;

        let get = await ClubServices.getClubList();

        res.json({status:true,success:get});
    } catch (error) {
        throw err;
        // res.json({status:false,success:'Error'})
    }


}

exports.getFollowClub = async (req,res,next)=>{
    try {
        const userName = req.query.userName;

        let get = await UserControlServices.getUserControl(userName);

        let followIdList = get.follow

        let result =  await ClubServices.getClubById(followIdList);
        
        res.json({status:true,data:result});
    } catch (error) {
        
    }
}

exports.getOwnerClubList = async (req,res,next)=>{
    try {
        const userName = req.query.userName;

        let get = await UserControlServices.getUserControl(userName);

        let ownerIdList = get.ownerOf
        let adminIdList = get.adminOf

        let ownerresult = await ClubServices.getClubById(ownerIdList);
        let adminresult = await ClubServices.getClubById(adminIdList);

        res.json({status:true,Owner:ownerresult,Admin:adminresult});
        
    } catch (error) {
        
    }
}
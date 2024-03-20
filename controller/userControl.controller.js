const UserControlServices = require('../services/userControl.services');

exports.createUserControl = async (req,res,next)=>{
    try {
        const {userName,ownerPermission,adminOf,ownerOf,follow,pending,join} = req.body;

        let userControl = await UserControlServices.createUserControl(userName,ownerPermission,adminOf,ownerOf,follow,pending,join);

        res.json({status:true,success:userControl});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}

exports.addFollowClub = async (req,res,next)=>{
    try {
        const {userName,clubId} = req.body;

        let userControl = await UserControlServices.addFollowClub(userName,clubId);
        res.json({status:true,success:userControl});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}

exports.unFollowClub = async (req,res,next)=>{
    try {
        const {userName,clubId} = req.body;

        let userControl = await UserControlServices.unFollowClub(userName,clubId);
        res.json({delete:true,success:userControl});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}

exports.registerOwner = async (req,res,next)=>{
    try {
        const {userName} = req.body;

        let userControl = await UserControlServices.registerOwner(userName);
        // console.log(userControl)
        res.json({status:true});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}

exports.getUserControl = async (req,res,next)=>{
    try {
        const userName = req.query.userName;

        let result = await UserControlServices.getUserControl(userName);

        res.json({status:true,data:result});
    } catch (error) {
        throw error;
    }
}

exports.sendRequest = async (req,res,next)=>{
    try {
        const {userName,event_id} = req.body;

        let userControl = await UserControlServices.sendRequest(userName,event_id);
        res.json({status:true,success:userControl});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}

exports.unRequest = async (req,res,next)=>{
    try {
        const {userName,event_id} = req.body;

        let userControl = await UserControlServices.unRequest(userName,event_id);
        res.json({delete:true,success:userControl});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}

exports.joinEvent = async (req,res,next)=>{
    try {
        const {userName,event_id} = req.body;

        let userControl = await UserControlServices.joinEvent(userName,event_id);
        res.json({status:true,success:userControl});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}

exports.unJoinEvent = async (req,res,next)=>{
    try {
        const {userName,event_id} = req.body;

        let userControl = await UserControlServices.unRequest(userName,event_id);
        res.json({delete:true,success:userControl});
    } catch (error) {
        throw error;
        // res.json({status:false,success:'Error'})
    }
}


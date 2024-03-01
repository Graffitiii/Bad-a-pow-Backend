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


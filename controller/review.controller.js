const ReviewServices = require('../services/review.services');

exports.createReview = async (req,res,next)=>{
    try {
        const {score,comment,showuser,userName,clubname} = req.body;

        let create = await ReviewServices.createReview(score,comment,showuser,userName,clubname);

        res.json({status:true,success:create});

        
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.getReviewList = async (req,res,next)=>{
    try {
        const {} = req.body;

        let get = await ReviewServices.getReviewList();

        res.json({status:true,success:get});
    } catch (error) {
        throw err;
        // res.json({status:false,success:'Error'})
    }


}

exports.getReviewClub = async (req,res,next)=>{
    try {
        const userName = req.query.userName;

        let result = await ReviewServices.getReviewClub(userName);

        res.json({status:true,data:result});
    } catch (error) {
        throw error;
    }
}

exports.getReviewEvent = async (req,res,next)=>{
    try {
        const userName = req.query.userName;

        let result = await ReviewServices.getReviewEvent(userName);

        res.json({status:true,data:result});
    } catch (error) {
        throw error;
    }
}
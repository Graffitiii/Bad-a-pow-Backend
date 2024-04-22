const ReviewServices = require('../services/review.services');

exports.createReview = async (req,res,next)=>{
    try {
        const {score,comment,showuser,userName,clubname,create_at} = req.body;

        let create = await ReviewServices.createReview(score,comment,showuser,userName,clubname,create_at);

        res.json({status:true,success:create});

        
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.getReviewList = async (req,res,next)=>{
    try {
        const clubname = req.query.clubname;

        let get = await ReviewServices.getReviewList(clubname);

        res.json({status:true,success:get});
    } catch (error) {
        throw err;
        // res.json({status:false,success:'Error'})
    }


}


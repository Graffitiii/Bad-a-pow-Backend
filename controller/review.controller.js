const ReviewServices = require('../services/review.services');

exports.createReview = async (req,res,next)=>{
    try {
        const {score,comment,showuser,userName} = req.body;

        let create = await ReviewServices.createReview(score,comment,showuser,userName);

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
const { json } = require('body-parser');
const ReviewModel = require('../model/review.model');

class ReviewServices{
    static async createReview(score,comment,showuser,userName,clubname){

        const createReview = new ReviewModel({score,comment,showuser,userName,clubname});
        
        return await createReview.save();
    }

    static async getReviewList(clubname){
        try{
            return await ReviewModel.find({clubname: clubname});
        }catch(error){
            throw error;
        }
        

    }

    
}

module.exports = ReviewServices;
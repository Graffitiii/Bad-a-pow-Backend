const { json } = require('body-parser');
const ReviewModel = require('../model/review.model');

class ReviewServices{
    static async createReview(score,comment,showuser,userName){

        const createReview = new ReviewModel({score,comment,showuser,userName});
        return await createReview.save();

        
    }

    static async getReviewList(){
        try{
            return await ReviewModel.find();
        }catch(error){
            throw error;
        }
        

    }
}

module.exports = ReviewServices;
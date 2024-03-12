const { json } = require('body-parser');
const ReviewModel = require('../model/review.model');

class ReviewServices{
    static async createReview(score,comment,showuser,userName,clubname){

        const createReview = new ReviewModel({score,comment,showuser,userName,clubname});
        
        return await createReview.save();
    }

    static async getReviewList(){
        try{
            return await ReviewModel.find();
        }catch(error){
            throw error;
        }
        

    }

    static async getReviewClub(userName){
        try {
            const reviewClub = ReviewModel.findOne({userName: userName})
            return await reviewClub;
        } catch (error) {
            
        }
    }

    static async getReviewEvent(userName){
        try {
            const reviewEvent = ReviewModel.findOne({userName: userName})
            return await reviewEvent;
        } catch (error) {
            
        }
    }
}

module.exports = ReviewServices;
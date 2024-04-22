const HistoryModel = require('../model/history.model');

class HistoryServices{
    static async createHistory(join,clubname,eventdate_start,eventdate_end,placename){

        const createHistory = new HistoryModel({join,clubname,eventdate_start,eventdate_end,placename});
        
        return await createHistory.save();
    }

    static async findHistory(username,limit){
        console.log(limit);
        let result;
        if(limit != undefined){
            result = HistoryModel.find({ join: username }).limit(Number(limit));
        }
        else{
            result = HistoryModel.find({ join: username });
        }
        
        
        return result;
    }


    
}

module.exports = HistoryServices;
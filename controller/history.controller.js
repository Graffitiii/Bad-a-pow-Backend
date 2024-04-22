const HistoryServices = require('../services/history.services');

exports.createHistory = async (req,res,next)=>{
    try {
        const {join,clubname,eventdate_start,eventdate_end,placename} = req.body;

        let create = await HistoryServices.createHistory(join,clubname,eventdate_start,eventdate_end,placename);

        res.json({status:true,success:create});

        
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.findHistory = async (req,res,next)=>{
    try {
        const username = req.query.username;
        const limit = req.query.limit;

        let result = await HistoryServices.findHistory(username,limit);

        res.json({status:true,result:result});

        
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}
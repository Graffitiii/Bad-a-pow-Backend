const ToDoServices = require('../services/todo.services');

exports.createTodo = async (req,res,next)=>{
    try {
        const {image,club,contact,eventdate,level,brand,price_badminton,priceplay,details} = req.body;

        let todo = await ToDoServices.createTodo(image,club,contact,eventdate,level,brand,price_badminton,priceplay,details);

        res.json({status:true,success:todo});
    } catch (error) {
        throw err;
        // res.json({status:false,success:'Error'})
    }
}

exports.getUserTodo = async (req,res,next)=>{
    try {
        const {} = req.body;

        let todo = await ToDoServices.getTododata();

        res.json({status:true,clublistdata:todo});
    } catch (error) {
        throw err;
        // res.json({status:false,success:'Error'})
    }


}


exports.deleteTodo = async (req, res, next) => {
    try {
        const { _id } = req.body;

        let deleted = await ToDoServices.deleteTodo(_id);

        res.json({ status: true, clublistdata: deleted });
    } catch (error) {
        throw error; // ใช้ throw error แทนที่จะใช้ throw err
    }
}
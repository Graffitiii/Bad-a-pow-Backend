const { json } = require('body-parser');
const ToDoModel = require('../model/todo.model');

class ToDoServices{
    static async createTodo(image,club,contact,eventdate,level,brand,price_badminton,priceplay,details){

        const createTodo = new ToDoModel({image,club,contact,eventdate,level,brand,price_badminton,priceplay,details});
        return await createTodo.save();

        
        // try{
        //     const createTodo = new ToDoModel({club,contact,price_badminton,priceplay});
        //     return await createTodo.save();
        // }
        // catch(err){
        //     throw err;
        // }
    }

    static async getTododata(){
        try{
            return await ToDoModel.find();
        }catch(error){
            throw error;
        }
        

    }

    static async deleteTodo(id){
        const deleted = await ToDoModel.findOneAndDelete({_id:id});
        console.log(id);
        return deleted;
    }
}

module.exports = ToDoServices;
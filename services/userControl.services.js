const { json } = require('body-parser');
const UserControlModel = require('../model/userControl.model');

class UserControlServices{
    static async createUserControl(userName,ownerPermission,adminOf,ownerOf,follow,pending,join){

        const createUserControl = new UserControlModel({userName,ownerPermission,adminOf,ownerOf,follow,pending,join});
        return await createUserControl.save();

        
        // try{
        //     const createTodo = new ToDoModel({club,contact,price_badminton,priceplay});
        //     return await createTodo.save();
        // }
        // catch(err){
        //     throw err;
        // }
    }
}

module.exports = UserControlServices;
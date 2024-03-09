const app = require('./app');
const db = require('./config/db')
const UserModel = require('./model/user.model')
const UserControlModel = require('./model/userControl.model')
const EventModel = require('./model/event.model')
const ClubModel = require('./model/club.model')
const ReviewModel = require('./model/club.model')

const port = 3000;

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`)
})
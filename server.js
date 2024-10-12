//This will be our starting file page

const express= require('express')
const mongoose= require("mongoose")
const app = express()
const server_config= require("./configs/server.config")
const db_config= require("./configs/db.config")
const user_model= require("./Models/user.model")
const bcrypt= require("bcryptjs")

app.use(express.json())  /******/

// Creating admin user if not present
//Connect with mongoDB
mongoose.connect(db_config.DB_url)

const db= mongoose.connection

db.on("error",()=>{
    console.log('Error connecting mongoDB')
})
db.once("open",()=>{
    console.log("connected to mongoDB")
    init()

})

async function init(){
    try{
        let user= await user_model.findOne({userID: "admin"})

        if(user){
            console.log("Admin is already present ")
            return
        }

    }catch(err){
        console.log("Error while reading data",err)
    }
    

    try{
        user=await user_model.create({
            name: "Keshav",
            userID: "admin",
            email:"keshav123@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("123456789",8)

        })
        console.log("Admin created", user)

    }catch(err){
        console.log("Error while creating admin",err)
    }
}


//Combine routes to server

require("./Routers/auth.route")(app)


//Starting the server
app.listen(server_config.PORT, ()=>{
    console.log("Server started at port no.", server_config.PORT)
})
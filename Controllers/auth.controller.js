// Logic to register user
const bcrypt= require('bcryptjs')
const user_model= require("../Models/user.model")



exports.signup=async(req,res)=>{
    //creating the user

    //1.Read user
    const request_body= req.body

    //2.Insert data in mongoDB
    const userObj={
        name: request_body.name,
        userID: request_body.userID,
        email: request_body.email,
        usertype: request_body.usertype,
        password: bcrypt.hashSync(request_body.password,8)
    }

    try{
        const user_created= await user_model.create(userObj)

        //return user
        const re_obj={
            name: user_created.name,
            userID: user_created.userID,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updateAt,
        }
        res.status(201).send(re_obj)

    }catch(err){
        console.log("Error while registering user",err)
        res.status(500).send({
            message:"Some error occured"
            })
    }

    //3.Return response done
}
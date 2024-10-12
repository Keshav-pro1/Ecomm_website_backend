//POST call to localhost:8081/ecomm/api/v1/auth/signup

const authController=require("../Controllers/auth.controller")


module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup", authController.signup)
}
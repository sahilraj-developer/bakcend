const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')


const userRegistration = async(req,res)=>{
    const {name,email,password,password_confirmation,tc} =req.body;
    const user = await UserModel.findOne({email:email})
    if(user){
        res.send({"status":"failed", "message":"email already exists"})
    }else{
        if(name &&email && password && password_confirmation && tc){

            if(password === password_confirmation){
            try{
                // generate salt to hash passowrd
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password,salt)
                // it will hash passowrd with 2paramter one with passowrd and second is salt to hash the password
                const doc =  new UserModel({
                    name:name,email:email,password:hashPassword,tc:tc
                })
                await doc.save()
                res.status(201).send({"status":"success","message":"Register success"})
            }catch(error){
                res.send({"status":"failed","message":"Unable to register"})

            }

               
                
            }else{
                res.send({"status":"failed", "message":"Password && Confirm password Not matched"})
            }

        }else{
            res.send({"status":"failed", "message":"All Fields are required"})
        }
    }
}

module.exports = userRegistration;
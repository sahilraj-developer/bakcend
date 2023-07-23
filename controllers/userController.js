const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken');
const userModel = require('../models/User');
const { transporter } = require('../config/emailConfig');


exports.userRegistration = async(req,res)=>{
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
                const saved_user = await userModel.findOne({email:email})
                // generate the jwt joken
                const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})

                res.status(201).send({"status":"success","message":"Register success","token":token})
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

exports.userLogin =async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(email && password){
            const user = await UserModel.findOne({email:email})
            if(user !==null){
                const isMatch = await bcrypt.compare(password, user.password)
                if(isMatch){
                    if((user.email == email) && isMatch){

                         // generate the jwt joken
                const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                        res.status(201).send({"status":"success","message":"Login Success","token":token});
                    }else{
                        res.status(201).send({"status":"failed","message":"Password or Email Does't Match"}) 
                    }
                }

            }else{
                res.status(201).send({"status":"failed","message":"Not A registred User"});
            }

        }else{
            res.status(201).send({"status":"failed","message":"All fields are required"});
        }

    }catch(error){
      res.send({"status":"failed","message":"unable to login"})
    }

}


exports.changeUserPassword = async (req,res)=>{
    const {password,password_confirmation}=req.body;
    if(password && password_confirmation){
        if(password !== password_confirmation){
            res.send({"status":"failed","message":"new password and confirm password doesn't match"})
        }else{ 
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password,salt)
            await UserModel.findByIdAndUpdate(req.user._id,{set:{password:newHashPassword}});
            res.send({"status":"success", "message":"Password changed successfully"})

        }
    }else{
        res.send({"status":"failed","message":"All fields Are Required"})
    }

}

exports.loggedUser =async (req,res)=>{
    res.send({"user":req.user})

}

exports.sendUserPasswordResetMail = async(req,res)=>{
    const {email} = req.body
    if(email){
        const user = await UserModel.findOne({email:email});
        if(user){
            const secret = user._id + process.env.JWT_SECRET_KEY;
          const token  = jwt.sign({userID:user._id}, secret,{expiresIn:'15m'})
          const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
        //   /api/user/reset/:id/:token


        let info = await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:user.email,
            subject:"Reset Email - Password Reset Link",
            html:`<a href=${link}>Click here  </a> to Reset Your Password`
        })
        req.send({"status":"success", "message":"Reset Password Email Has Been Send","info":info})
        }else{
            req.send({"status":"failed", "message":"User doesn't Exits"})
        }
    }else{let transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
    })
    req.send({"status":"failed", "message":"Email Field is Required"})
    }}

    exports.userPasswordReset =async(req,res)=>{
        const {password,password_confirmation} = req.body
        const {id,token} =req.params;
        const user = await UserModel.findById(id);
        const new_secret = user._id + process.env.JWT_SECRET_KEY;

        try{
            jwt.verify(token,new_secret)
            if(password && password_confirmation){
                if(password !== password_confirmation){
                    req.send({"status":"failed", "message":"New Password And Conform Password Doesn't Match"})
                }else{
                    const salt = bcrypt.genSalt(10);
                    const newHashPassword = await bcrypt.hash(password,salt)
                    await UserModel.findByIdAndUpdate(req.user,{$set:{password:newHashPassword}})
                    res.send({"status":"failed","message":"Password reset Succesfully"})

                }
            }else{
                req.send({"status":"failed", "message":"All Fields Are Required"})
            }
        }catch(error){
            req.send({"status":"failed", "message":"Invalid token"})
        }
    } 






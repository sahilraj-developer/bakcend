const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.js');

exports.checkUserAuth = async(req,res,next)=>{
    let token 
    const {authorization}= req.headers;
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(' ')[1]

            // verify token

            const {userID} =jwt.verify(token,process.env.JWT_SECRET_KEY)

            // get user from token 
            req.user = await UserModel.findById(userID).select('-password')

            next()

        }catch(error){
            res.status(401).send({"status":"failed","message":"Unauthorized user"})

        }
    }if(!token){
        res.status(401).send({"status":"failed","message":"Unauthorized user no token"})
    }
}

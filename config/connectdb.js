const mongoose = require('mongoose');

const connectDb =  async (DATABASE_URL)=>{
    try{
        console.log("running db ")
    const DB_OPTION ={
        dbName:'sahildb'
    }  
    console.log("line numebr 9",DATABASE_URL)
    await mongoose.connect(DATABASE_URL,DB_OPTION)
    console.log("conenct dataBase successfully")
    }catch(error){
console.log("error in db",error)
    }

}

module.exports = connectDb;
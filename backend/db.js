// to connect mongoDB database with backend:
const mongoose =require('mongoose');

const mongoURI="mongodb://localhost:27017";

const connectToMongo= async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to database");
    }
    catch(error){
        console.error("Error occuring while connecting to database",error);
    }
}

module.exports=connectToMongo;
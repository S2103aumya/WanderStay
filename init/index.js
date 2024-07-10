const mongoose = require("mongoose");
const dotenv= require('dotenv');
dotenv.config({path:'../.env' });

const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl=process.env.ATLAS_URL;

main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(dbUrl);
}
const initDB = async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner:'66612ab6877c44fda586fe8f'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDB();
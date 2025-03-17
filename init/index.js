const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing = require("../models/listing");

const MANGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{console.log("connected to db");}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect(MANGO_URL);
}

const initdb=async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj,owner:"67beb784d3380ff108194c26"}));
    await Listing.insertMany(initdata.data);
    console.log("data is initialized");
};

initdb();
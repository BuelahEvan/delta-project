const mongoose=require("mongoose");
const initData= require("./data.js");
const Listing=require("../models/listing.js");


const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})


async function main(){
    await mongoose.connect(mongo_url);
}
    
const initDB=async()=>{
   await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({...obj,owner:"6946cf394efe803276625b52"})); //to give owner details we did this
   await Listing.insertMany(initData.data);
   console.log("data was initialised");

}

initDB();
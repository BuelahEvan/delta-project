
//with a cottage listing all its reviews also can be deleted
listingSchema.post("findOneandDelete",async(listing)=>{
    if(listing){
           await Review.deleteMany({_id:{$in: listing.reviews}});
    }
 
});


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
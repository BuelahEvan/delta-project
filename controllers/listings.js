const Listing = require("../models/listing");
                                                        //tiles one replacd with geocoding
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); //copied from github
const mapToken =process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index route
module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

//new route
module.exports.renderNewForm=(req,res)=>{
    console.log(req.user);
    res.render("listings/new.ejs");
}

//create route
module.exports.createListing =async(req,res,next)=>{
  let response= await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 2
})
  .send()

 

    let url = req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);

   const newListing= new Listing (req.body.listing); 
   newListing.owner=req.user._id;
   newListing.image = {url,filename}; 

   newListing.geometry=response.body.features[0].geometry;

   let savedListing =await newListing.save();    //creating a instance of a model
   console.log(savedListing);
   req.flash("success","New listing created !");
   res.redirect("/listings");
   }

//edit route
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing =await  Listing.findById(id);
    if(!listing){
        req.flash("error","Listing u requested doesn't exist");
        return res.redirect("/listings");
    }
   let originalImageUrl= listing.image.url;
   originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

//show route
module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    // const listing =await  Listing.findById(id).populate("reviews").populate("owner");
   //will use nested populate
     const listing =await  Listing.findById(id)
          .populate({path :"reviews",
            populate:{
                path:"author",
            },
          }).populate("owner");
    if(!listing){
        req.flash("error"," Listing u requested doesn't exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
 }


 //update route
module.exports.updateListing =async(req,res)=>{
     let {id}=req.params;
    let listing=await  Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
    let url =req.file.path;
     let filename=req.file.filename;
     listing.image={url,filename};
     await listing.save();
    }
   
    req.flash("success","listing Updated !");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing =async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
      req.flash("success"," listing Deleted !");
    res.redirect("/listings");
}
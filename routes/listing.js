// const express=require("express");
// const router =express.Router();
// const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../utils/ExpressError.js");
// const {listingSchema}=require("../schema.js");
// const Listing=require("../models/listing.js");
// const {isLoggedIn,isOwner,validateListing,validateReview}=require("../middleware.js");

// const listingController =require("../controllers/listings.js")


// const validateListing =(req,res,next)=>{
//     let {error}= listingSchema.validate(req.body);
//    if(error){                                                     //this in middleware
//     let errMsg = error.details.map(el=>el.message).join(",");
//     throw new ExpressError(400,errMsg);
//    }else{
//     next();
//    }

// }
//index route

// router.get("/",wrapAsync(async(req,res)=>{
//     const allListings=await Listing.find({});
//     res.render("listings/index.ejs",{allListings});         //this stored in controllers
// }));

// //index route
// router.get("/",wrapAsync(listingController.index));

//new route
// router.get("/new",isLoggedIn,(req,res)=>{
//     console.log(req.user);
//     //will store it in a middleware
//     // if(!req.isAuthenticated()){
//     //     req.flash("error","you must be logged in to create listing");
//     //     return res.redirect("/login");
//     // }
//     res.render("listings/new.ejs");
// });
// //new route
// router.get("/new",isLoggedIn,listingController.renderNewForm);

//show route
// router.get("/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     // const listing =await  Listing.findById(id).populate("reviews").populate("owner");
//    //will use nested populate
//      const listing =await  Listing.findById(id)
//           .populate({path :"reviews",
//             populate:{
//                 path:"author",
//             },
//           }).populate("owner");
//     if(!listing){
//         req.flash("error"," Listing u requested doesn't exist");
//         return res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs",{listing});
//  })
// );

// //show route
// router.get("/:id",wrapAsync(listingController.showListing));

//create route using wrapasync

// router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
    
   
//    const newListing= new Listing (req.body.listing); 
// //    console.log(req.user); 
//    newListing.owner=req.user._id;
//    await newListing.save();    //creating a instance of a model
//    req.flash("success","New listing created !");
//    res.redirect("/listings");
//    })
// );

// //create route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

//edit route

// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const listing =await  Listing.findById(id);
//     if(!listing){
//         req.flash("error","Listing u requested doesn't exist");
//         return res.redirect("/listings");
//     }
//     res.render("listings/edit.ejs",{listing});
// }));
// //edit route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//update route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
//      let {id}=req.params;
//     //   await  Listing.findByIdAndUpdate(id,{...req.body.listing}); //will do this in two ways
//     // let listing = await listing.findById(id);
//     // if(!currUser &&listing.owner._id.equals(res.locals.currUser._id)){            //in middlewares
//     //     req.flash("error","you are not the owner of this listing");
//     //     return res.redirect(`/listings/${id}`);
//     // }
//     await  Listing.findByIdAndUpdate(id,{...req.body.listing});
//     req.flash("success","listing Updated !");
//     res.redirect(`/listings/${id}`);
// }));

// //update route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     let deletedListing= await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//       req.flash("success"," listing Deleted !");
//     res.redirect("/listings");
// }));

// //delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing ));


// module.exports=router;




//using controllers

// const express=require("express");
// const router =express.Router();
// const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../utils/ExpressError.js");
// const {listingSchema}=require("../schema.js");
// const Listing=require("../models/listing.js");
// const {isLoggedIn,isOwner,validateListing,validateReview}=require("../middleware.js");

// const listingController =require("../controllers/listings.js")

// //index route
// router.get("/",wrapAsync(listingController.index));

// //new route
// router.get("/new",isLoggedIn,listingController.renderNewForm);

// //show route
// router.get("/:id",wrapAsync(listingController.showListing));

// //create route
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

// //edit route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// //update route
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// //delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing ));

// module.exports=router;




// //router.route
// const express=require("express");
// const router =express.Router();
// const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../utils/ExpressError.js");
// const {listingSchema}=require("../schema.js");
// const Listing=require("../models/listing.js");
// const {isLoggedIn,isOwner,validateListing,validateReview}=require("../middleware.js");

// const listingController =require("../controllers/listings.js")


// router
//   .route("/")
//   .get(wrapAsync(listingController.index))  //index route
//   .post(isLoggedIn,validateListing,wrapAsync(listingController.createListing));//create route


// //index route
// // router.get("/",wrapAsync(listingController.index));

// //create route
// //router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));

// //new route
// router.get("/new",isLoggedIn,listingController.renderNewForm);


// router
//    .route("/:id")
//    .get(wrapAsync(listingController.showListing))//show route
//    .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))//update route
//    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing ));//delete route


// //show route
// //router.get("/:id",wrapAsync(listingController.showListing));



// //edit route
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// //update route
// // router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// //delete route
// // router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing ));

// module.exports=router;



//router.route
const express=require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing,validateReview}=require("../middleware.js");

const listingController =require("../controllers/listings.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
// const upload = multer({ dest: 'uploads/' });  //before we used this for local 
//storing in cloudinary storage
const upload = multer({ storage });


router
  .route("/")
  .get(wrapAsync(listingController.index))  //index route
 .post(
    isLoggedIn,
    upload.single("listing[image]"),
     validateListing,
    wrapAsync(listingController.createListing)
  );//create route
  // .post(upload.single("listing[image]"),(req,res )=>{ //this middleware is kept up
  //   // res.send(req.body);   //this give empty because backend doesnt understand what is data in req
  //   res.send(req.file); //in this url which came from cloud will be stored
  // });

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

router
   .route("/:id")
   .get(wrapAsync(listingController.showListing))//show route
   .put(
    isLoggedIn,
    isOwner,
     upload.single("listing[image]"),
     validateListing,
     wrapAsync(listingController.updateListing))//update route
   .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing ));//delete route


module.exports=router;
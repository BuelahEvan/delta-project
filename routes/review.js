const express=require("express");
const router =express.Router({mergeParams:true});
//mergeParams: true allows a child router to access URL parameters from the parent route.  now parent route is in app.js
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
// const {reviewSchema}=require("../schema.js");
const Review =require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController = require("../controllers/reviews.js")
// const validateReview =(req,res,next)=>{
//     let {error}= reviewSchema.validate(req.body);
//    if(error){
//     let errMsg = error.details.map(el=>el.message).join(",");
//     throw new ExpressError(400,errMsg);
//    }else{
//     next();
//    }

// }


//reviews route
//post route                     //passed validatereview as middleware
              //childroute below                                 //error handling is imp so we wrapsync around async
// router.post("/",isLoggedIn,validateReview,wrapAsync( async(req,res)=>{
//     let listing =await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     newReview.author = req.user._id;
//     console.log(newReview);
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();
//     console.log("new review saved");
//     // res.send("new review saved");
//       req.flash("success","New Review created !");
//     res.redirect(`/listings/${listing._id}`);
// }));

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));








//Delete review route
              //childroute below 
// router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(async(req,res)=>{
//   let {id,reviewId}= req.params;
//  //await Listing.findByIdAndUpdate(id, {$pull: { reviews: mongoose.Types.ObjectId(reviewId) }
//    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
//   await Review.findByIdAndDelete(reviewId);
//     req.flash("success","Review deleted !");
//   res.redirect(`/listings/${id}`)
//  }));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));


 module.exports=router;
const Listing = require("../models/listing.js");
const Review = require("../models/review.js")

module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; 
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    
    if(listing.reviews.length == 1){
        listing.avgRating = newReview.rating;
    }else{
        let total=listing.reviews.length;
        listing.avgRating = (listing.avgRating*(total - 1)+newReview.rating)/total;
    }
    await listing.save();
    console.log("new Review saved");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let{id,reviewId}=req.params;

    let listing = await Listing.findById(id);
    let newReview = await Review.findById(reviewId);

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    if(listing.reviews.length == 1){
        listing.avgRating = 0;
    }else{
        let total=listing.reviews.length;
        console.log(`total${total}`);
        listing.avgRating = (listing.avgRating*(total) - newReview.rating)/(total-1);
    }
    await listing.save();
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};
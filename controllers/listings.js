const Listing = require("../models/listing.js");
const User = require("../models/user.js")

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find().populate("owner");

    res.render("./listings/index.ejs", { allListings });
    };
    

module.exports.renderNewForm = (req,res)=>{
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
      .populate({
        path:"reviews",
        populate:{
            path:"author"
        }
      })
      .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    res.render("./listings/show.ejs",{listing});
};

module.exports.createListing = async(req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing=new Listing(req.body.listing);
         newListing.owner = req.user._id;
         newListing.image = {url, filename};
         await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings")
};

module.exports.renderEditForm = async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
    res.render("./listings/edit.ejs",{listing, originalImageUrl});
};

module.exports.updateListing =  async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file !== "undefined"){//as if we not update image then it not work ,
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success","Your Destination Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    await User.updateMany(
        { favourites: id }, 
        { $pull: { favourites: id } } 
    );
    console.log("deleted");
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};

module.exports.rendersearch = async (req, res) => {
    try {
        let query = req.query.q; 

        if (!query) {
            return res.render("partials/searchResults", { listings: [] });
        }

       
        let listings = await Listing.find({
            $or: [
                { title: new RegExp(query, "i") },
                { location: new RegExp(query, "i") },
                { country: new RegExp(query, "i") }
            ]
        }).populate("owner"); 

        if (listings.length === 0) {
            req.flash("error","No results are available!");
            return res.redirect("/listings");
        }
       
        res.render("./listings/search_results.ejs", { listings }); 
    } catch (err) {
        req.flash("error","No results are available!");
        res.redirect("/listings");
    }
};

module.exports.findtag = async(req,res) =>{
    const{ tag } = req.query;
    let listings;
     
    const validTags = ["Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic"];

    if(tag === "Trending"){
        console.log(listings);
        listings = await Listing.find().sort({avgRating: -1 }).limit(5);
    }else if(validTags.includes(tag)){
        console.log(listings);
        listings = await Listing.find({tag});
    }else{
       res. redirect("/listings");
    }
    if(listings.length == 0){
        req.flash("error","No results are available!");
        res.redirect("/listings");
    }
    res.render("./listings/findtag.ejs",{listings, tag})
};


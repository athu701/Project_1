const User = require("../models/user.js")
const Listing = require("../models/listing.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("./users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
    let{username,email,password} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        req.flash("error", "Email is already registered!");
        return res.redirect("/signup");
    }
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err) => {
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    });
  
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err) => {
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};

module.exports.getprofile = async (req, res, next) => {
    try {
        const userId = res.locals.currUser._id;

        const user = await User.findById(userId).populate({
            path: "favourites",
            populate: { path: "owner", select: "username" } 
        });


        const userListings = await Listing.find({ owner: userId });

        res.render("./listings/Profile.ejs", { 
            currUser: user, 
            userListings, 
            favourites: user.favourites 
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        req.flash("error", "Unable to fetch Your Profile!");
        res.redirect("/listings");
    }
};


module.exports.favourites = async (req, res) => {
    try {
        const listingId = req.params.id;


        if (!res.locals.currUser) {
            return res.status(401).json({ success: false, message: "Please log in first" });
        }

        let currUser = res.locals.currUser; 
        let isFavorited;
        
        
        const index = currUser.favourites.map(fav => fav.toString()).indexOf(listingId);

        if (index === -1) {
          
            currUser.favourites.push(listingId);
            isFavorited = true;
            console.log("Added to Favourites");
        } else {
           
            currUser.favourites.splice(index, 1);
            isFavorited = false;
            console.log("Removed from Favourites");
        }

        await currUser.save(); 

        return res.json({
            success: true,
            favorited: isFavorited,
            message: isFavorited ? "Added to Favourites ❤️" : "Removed from Favourites ❌"
        });
    } catch (error) {
        console.error("Error updating favourites:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

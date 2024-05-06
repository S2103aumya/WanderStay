const Listing = require("../models/listing.js");

module.exports.index = async(req,res)=>{
    const allListings= await Listing.find({}).maxTimeMS(1000);
        res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = ((req,res)=>{
    res.render("listings/new.ejs");
});

module.exports.showListing = ( async(req,res)=>{
    let{ id }= req.params;
    const listing = await Listing.findById(id).
    populate({
        path:"reviews",
        populate:{
            path : "author",
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});

});

module.exports.createListing = async(req,res,next) =>{
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    await newlisting.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditform= async(req,res)=>{
    let{ id } =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing})
}; 

module.exports.updateListings=async(req,res) => { 
    let{ id } =req.params; 
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListings=async(req,res)=>{
    let{ id }= req.params;
    let deletedlisting= await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};
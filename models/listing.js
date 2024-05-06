const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema= new Schema({
    title: {
        type: String ,
        required:true,
    },
    description: String ,
    image:{
        type: String,
        default:"https://www.istockphoto.com/photo/sunset-landscape-gm870477626-145206999?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fnature&utm_medium=affiliate&utm_source=unsplash&utm_term=nature%3A%3A%3A",
        set:(v)=> v==="" ? "https://www.istockphoto.com/photo/sunset-landscape-gm870477626-145206999?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fnature&utm_medium=affiliate&utm_source=unsplash&utm_term=nature%3A%3A%3A":
        v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

const Listing= mongoose.model("Listing",ListingSchema);
module.exports= Listing;
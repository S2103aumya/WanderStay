if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const multer  = require('multer');
const { storage } =require("../cloudConfig.js");
const upload = multer({ storage });

const ListingController = require("../controllers/listing.js");
router
    .route("/")
    .get(wrapAsync(ListingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(ListingController.createListing)
    );
  
  // new route
  router.get("/new", isLoggedIn, ListingController.renderNewForm);
  
  router
    .route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put(
      isLoggedIn,
      isOwner,
      upload.single('listing[image]'),
      validateListing,
      wrapAsync(ListingController.updateListings)
    )
  
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));
  
  // edit route
  
  router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(ListingController.renderEditform)
  );
  
  module.exports = router;
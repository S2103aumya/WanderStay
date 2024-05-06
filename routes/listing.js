const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const ListingController = require("../controllers/listing.js");
router
    .route("/")
    .get(wrapAsync(ListingController.index))
     .post(
         isLoggedIn,
         validateListing,
         wrapAsync(ListingController.createListing)
      );
    // .post(upload.single('listing[image') , (req,res)=>{
    //   res.send(req.file);
    // });
  
  // new route
  router.get("/new", isLoggedIn, ListingController.renderNewForm);
  
  router
    .route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put(
      isLoggedIn,
      isOwner,
      validateListing,
      wrapAsync(ListingController.updateListing)
    )
  
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));
  
  // edit route
  
  router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(ListingController.renderEditForm)
  );
  
  module.exports = router;
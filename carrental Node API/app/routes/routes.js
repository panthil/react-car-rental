const express = require("express");
const router = express.Router();

const auth = require("../config/auth");
const UserController = require("../controller/userController");
const ProductController = require("../controller/carServiceController");
const ContactController = require("../controller/contactusController");

//login
router.post("/user_login", UserController.userLogin);
router.post("/signup", UserController.Registration);

//product
router.post("/add/car", ProductController.AddProduct);
router.post("/detail/car", ProductController.ProductDetail);
router.post("/update/serviceStatus", ProductController.updateDetail);
router.post("/add/booking", ProductController.AddBooking);
router.post("/detail/booking", ProductController.RecentBookingDetail);
router.post("/update/bookingStatus", ProductController.updateBooking);
router.post("/update/status", ProductController.UpdateStatus);


router.post("/add/contactus", ContactController.ContactUs);

module.exports = router;

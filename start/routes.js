"use strict";

const UserController = require("../app/Controllers/Http/UserController");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// none-uploade image user
Route.get("/upload-image", "PageController.uploadImage");

//Daftar Akun
Route.get("/register", "UserController.registerView");
Route.post("/register", "UserController.doRegister");
Route.get("/success-register", "UserController.registerSuccess");

//Login

Route.get("/login", "UserController.loginView");
Route.post("/login", "UserController.doLogin");
Route.get("/register-success", "UserController.registerSuccess");

//dashoar
Route.get("/", "UserController.dashboard");

//my-history
Route.get("/my-history", "UserController.myHistoryView");

//my profile
Route.get("/my-profile", "UserController.profileView");
Route.post("/update/user/:id", "UserController.updateProfile");

//logout
Route.get("/user/logout", "UserController.destroy");

// CAMPAIGN
Route.get("/create-donasi", "CampaignController.createDonasiView");
Route.post("/edit-donasi", "CampaignController.doCreateDonasi");
Route.get("/edit-donasi/:id_campaign", "CampaignController.editDonasi").as(
  "edit-donasi"
);

Route.get("/update-donasi/:id_campaign", "CampaignController.updateDonasiView");
Route.post("/update-donasi/:id_campaign", "CampaignController.udpateDonasi");

Route.get(
  "/upload-campaign-image/:id_campaign",
  "CampaignController.uploadCampaignImageView"
);

Route.post(
  "/upload-campaign-image/:id_campaign",
  "CampaignController.uploadCampaignImage"
);

Route.get("/show-donasi", "CampaignController.showDonasi");

Route.get("/donasi-info/:id_campaign", "CampaignController.donasiInfo");

//payment
Route.post("/payment-donation/:id_campaign", "PaymentController.userPayment");

Route.get("/success-donation", "PaymentController.succesPaymentView");

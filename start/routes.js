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

Route.get("/", "PageController.dashboard");

Route.get("/login", "PageController.login");

//Route.get("/register", "PageController.register");

//debug
// berhasil daftar
Route.get("/register-success", "PageController.registerSuccess");

Route.get("/show-donasi", "PageController.showDonasi");

Route.get("/my-profile", "PageController.myProfile");

Route.get("/my-history", "PageController.myHistory");

Route.get("/upload-image", "PageController.uploadImage");

Route.get("/success-register", "PageController.successRegister");

Route.get("/create-donasi", "PageController.createDonasi");

//Route.post("/users", "UserController.store");

// login Akun
//Route.post("/login", "AuthController.login");

//Daftar Akun
Route.get("/register", "UserController.registerView");
Route.post("/register", "UserController.store");

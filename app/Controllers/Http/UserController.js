"use strict";

class UserController {
  index({ view }) {
    return view.render("layouts.register");
  }
}

module.exports = UserController;

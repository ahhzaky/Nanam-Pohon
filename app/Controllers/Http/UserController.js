"use strict";

class UserController {
  index({ view }) {
    return view.render("error-page");
  }
}

module.exports = UserController;

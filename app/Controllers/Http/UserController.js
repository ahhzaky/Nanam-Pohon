"use strict";

class UserController {
  index({ view }) {
    return view.render("master");
  }
}

module.exports = UserController;

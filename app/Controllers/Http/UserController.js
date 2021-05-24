"use strict";

class UserController {
  index({ view }) {
    return view.render("layouts.dashboard");
  }
}

module.exports = UserController;

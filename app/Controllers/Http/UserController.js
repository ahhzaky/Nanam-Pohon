"use strict";

class UserController {
  index({ view }) {
    return view.render("layouts.donasi-success");
  }
}

module.exports = UserController;

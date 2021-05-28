"use strict";

class PageController {
  //home -> dashboard
  dashboard({ view }) {
    return view.render("app.dashboard");
  }
  // login
  login({ view }) {
    return view.render("app.login");
  }

  //daftar
  register({ view }) {
    return view.render("app.register");
  }

  //Berhasil daftar
  registerSuccess({ view }) {
    return view.render("app.register-success");
  }

  showDonasi({ view }) {
    return view.render("app.show-donasi");
  }

  myProfile({ view }) {
    return view.render("app.my-profile");
  }

  myHistory({ view }) {
    return view.render("app.my-history");
  }
}

module.exports = PageController;

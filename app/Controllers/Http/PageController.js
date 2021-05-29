"use strict";

class PageController {
  //home -> dashboard
  dashboard({ view }) {
    return view.render("app.dashboard");
  }
  // login akun
  login({ view }) {
    return view.render("app.login");
  }

  //daftar akun
  // register({ view }) {
  //   return view.render("app.register");
  // }

  //Berhasil daftar
  registerSuccess({ view }) {
    return view.render("app.register-success");
  }
  // lihat semua donasi
  showDonasi({ view }) {
    return view.render("app.show-donasi");
  }
  // profil saya
  myProfile({ view }) {
    return view.render("app.my-profile");
  }
  // history pembayaran
  myHistory({ view }) {
    return view.render("app.my-history");
  }

  uploadImage({ view }) {
    return view.render("app.upload-register");
  }

  successRegister({ view }) {
    return view.render("app.success-register");
  }

  createDonasi({ view }) {
    return view.render("app.create-donasi");
  }
}

module.exports = PageController;

"use strict";

class PageController {
  uploadImage({ view }) {
    return view.render("app.upload-register");
  }
}

module.exports = PageController;

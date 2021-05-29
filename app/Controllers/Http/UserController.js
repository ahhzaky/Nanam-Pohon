"use strict";
const { validateAll } = use("Validator");
const User = use("App/Models/User");

class UserController {
  // index({ view }) {
  //   return view.render("layouts.dashboard");
  // }
  // async store({ params, response, view }) {
  //   const userData = request.only(["email", "password"]);
  //   const user = await User.create(userData);

  //   return response.created({
  //     status: true,
  //     data: user,
  //   });
  // }
  registerView({ view }) {
    return view.render("app.register");
  }
  async store({ request, response, session }) {
    const rules = {
      name: "required|string",
      role: "required|string",
      email: "required",
      password: "required",
    };
    const data = request.post();
    const validation = await validateAll(data, rules);
    if (validation.fails()) {
      // true susces jika error maka ia akan mereturn error
      session // bawaan adonis memakai session untuk cek validasi data input
        .withErrors(validation.messages())
        .flashAll();
      return response.redirect("back"); // untuk ke halamannya
    }

    const user = new User();

    user.name = data.name;
    user.role = data.role;
    user.email = data.email;
    user.password = data.password;
    await user.save();

    return response.redirect("/", true);
  }

  // login view
  loginView({ view }) {
    return view.render("app.login");
  }

  //succes register
  registerSuccess({ view }) {
    return view.render("app.register-success");
  }

  // login akun
  async login({ request, response, auth, session }) {
    const data = request.post();
    const rules = {
      email: "required",
      password: "required",
    };
    const validation = await validateAll(data, rules);
    if (validation.fails()) {
      // true susces jika error maka ia akan mereturn error
      session // bawaan adonis memakai session untuk cek validasi data input
        .withErrors(validation.messages())
        .flashAll();
      return response.redirect("back"); // untuk ke halamannya
    }

    const { email, password } = request.only(["email", "password"]);
    const token = await auth.attempt(email, password);

    return response.redirect("/register-success", true);
  }
}

module.exports = UserController;

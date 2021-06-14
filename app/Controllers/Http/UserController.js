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

  // register user
  registerView({ view }) {
    return view.render("app.register");
  }
  async doRegister({ request, response, session, auth }) {
    const rules = {
      name: "required|string",
      role: "required|string",
      email: "required|email|unique:users,email",
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
    await auth.attempt(data.email, data.password);

    return response.redirect("/success-register", true);
  }

  //succes register
  registerSuccess({ view }) {
    return view.render("app.register-success");
  }

  // login view
  loginView({ view }) {
    return view.render("app.login");
  }

  // login akun
  async doLogin({ request, response, auth, session }) {
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

    return response.redirect("/", true);
  }

  // profile view
  async profileView({ auth, view }) {
    const user = await auth.getUser();
    return view.render("app.my-profile", { user });
  }
  async updateProfile({ request, response, session, params, auth }) {
    const id = params.id;
    const data = request.post();
    const user = await User.find(id);

    const rules = {
      name: "required|string",
      email: "required|email",
    };

    const validation = await validateAll(data, rules);
    if (validation.fails()) {
      // true susces jika error maka ia akan mereturn error
      session // bawaan adonis memakai session untuk cek validasi data input
        .withErrors(validation.messages())
        .flashAll()
        .flash({ notification: "Data gagal diupdate" });
      return response.redirect("back"); // untuk ke halamannya
    }

    user.name = data.name;
    user.role = data.role;
    user.email = data.email;

    //user.merge(request.only(["name", "role", "email"]));
    await user.save();
    session.flash({ notification: "Data berhasil diupdate" });
    return response.redirect("back");
  }

  //dashboar
  async dashboard({ auth, view }) {
    // const user = await auth.getUser();
    // console.log(user._id);
    return view.render("app.dashboard");
  }

  // logout
  async destroy({ auth, response }) {
    await auth.logout();
    return response.redirect("back");
  }
}

module.exports = UserController;

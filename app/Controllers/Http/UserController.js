"use strict";
const { validateAll } = use("Validator");
const User = use("App/Models/User");
const Payment = use("App/Models/Payment");

class UserController {
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
    user.createDonastion = [];
    user.payDonastion = [];
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

  async myHistoryView({ view, auth }) {
    const user = await auth.getUser();
    const id_user = user._id;
    console.log(id_user);
    // const dataPayment = await Payment.findBy("id_user", id_user);

    const dataPayment = await Payment.all();

    console.log(dataPayment);
    return view.render("app.my-history", {
      dataPayment: dataPayment.rows,
      id_user,
    });
  }

  // logout
  async destroy({ auth, response }) {
    await auth.logout();
    return response.redirect("back");
  }
}

module.exports = UserController;

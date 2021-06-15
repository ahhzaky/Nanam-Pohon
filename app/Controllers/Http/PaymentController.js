"use strict";

const { validateAll } = use("Validator");
const Campaign = use("App/Models/Campaign");
const User = use("App/Models/User");
const Payment = use("App/Models/Payment");
const date = require("date-and-time");
const { v4: uuidv4 } = require("uuid");

class PaymentController {
  async userPayment({ request, response, session, params, auth }) {
    const data = request.post();
    const rules = {
      price_donate: "required|integer",
    };
    const validation = await validateAll(data, rules);
    if (validation.fails()) {
      //session.withErrors(validation.messages()).flashAll();
      session.flash({ notification: "Gagal melakukan donasi" });
      return response.redirect("back");
    }
    const id = uuidv4().substr(0, 7);
    const user = await auth.getUser();
    const id_user = user._id;
    const id_campaign = params.id_campaign;

    //date-now
    const now = new Date();
    const dateNow = date.format(now, "DD MMM YYYY");
    console.log(dateNow);

    // add money to campaign
    const dataCampaign = await Campaign.findBy("id_campaign", id_campaign);
    dataCampaign.price_now =
      parseInt(dataCampaign.price_now) + parseInt(data.price_donate);
    await dataCampaign.save();
    console.log("Succcess ADD money to campaign" + dataCampaign.name_tree);

    //user add payDonation
    const dataUser = await User.findBy("_id", id_user);
    dataUser.payDonastion.push(id);
    await dataUser.save();

    //CREATE PAYMENT
    const payment = new Payment();
    payment.id_payment = id;
    payment.id_user = id_user;
    payment.id_campaign = id_campaign;
    payment.name_user = dataUser.name;
    payment.name_tree = dataCampaign.name_tree;
    payment.short_desc = dataCampaign.short_desc;
    payment.date = dateNow;
    payment.image_history = dataCampaign.campaignImageOne;
    payment.price_donate = data.price_donate;
    await payment.save();
    console.log("SUCCES PAYMENT");

    return response.redirect("/success-donation");
  }

  //view succes payment
  succesPaymentView({ view }) {
    return view.render("app.donation-success");
  }
}

module.exports = PaymentController;

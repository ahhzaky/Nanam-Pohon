"use strict";
const { validateAll } = use("Validator");
const Campaign = use("App/Models/Campaign");
const { v4: uuidv4 } = require("uuid");

class CampaignController {
  // view create-donasi
  createDonasiView({ view }) {
    return view.render("app.create-donasi");
  }
  //create-donasi
  async doCreateDonasi({ request, response, session, auth, view }) {
    const user = await auth.getUser();
    const rules = {
      name_tree: "required|string",
      short_desc: "required|string",
      goal_desc: "required|string",
      long_desc: "string",
      price_goal: "required|integer",
    };
    const data = request.post();
    const validation = await validateAll(data, rules);
    if (validation.fails()) {
      // true susces jika error maka ia akan mereturn error
      session
        .withErrors(validation.messages())
        .flashAll()
        .flash({ notification: "Data gagal dibuat" });
      return response.redirect("back"); // untuk ke halamannya
    }
    // buat id untuk user campaign
    const id = uuidv4().substr(0, 7);
    const campaign = new Campaign();
    campaign.id_user = id;
    campaign.name_tree = data.name_tree;
    campaign.short_desc = data.short_desc;
    campaign.long_desc = data.long_desc;
    campaign.goal_desc = data.goal_desc;
    campaign.price_goal = data.price_goal;
    campaign.price_persen = 0;
    campaign.price_now = 0;
    await campaign.save();

    //const id_user = user._id.toString();
    return response.route("CampaignController.editDonasi", {
      id_user: id,
    });
  }

  async editDonasi({ view, params }) {
    const id_user = params.id_user;
    console.log("id: " + id_user);
    const dataInfoCampaign = await Campaign.find(id_user);
    console.log("dataCampaig: " + dataInfoCampaign);
    return view.render("app.edit-donasi", { dataInfoCampaign });
  }
}

module.exports = CampaignController;

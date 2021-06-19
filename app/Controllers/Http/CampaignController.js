"use strict";
const { validateAll } = use("Validator");
const Campaign = use("App/Models/Campaign");
const Payment = use("App/Models/Payment");
const User = use("App/Models/User");
const { v4: uuidv4 } = require("uuid");

const Helpers = use("Helpers");

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
    campaign.id_user = user._id;
    campaign.id_campaign = id;
    campaign.name_tree = data.name_tree;
    campaign.short_desc = data.short_desc;
    campaign.long_desc = data.long_desc;
    campaign.goal_desc = data.goal_desc.split(",");
    campaign.price_goal = data.price_goal;
    campaign.price_now = 0;
    campaign.campaignImageOne = "campaign-none-image.png";
    campaign.campaignImageTwo = "campaign-none-image.png";
    campaign.campaignImageThree = "campaign-none-image.png";
    campaign.campaignImageFour = "campaign-none-image.png";
    campaign.historyPayment = [];
    await campaign.save();

    const id_user = user._id;
    const dataUser = await User.findBy("_id", id_user);
    dataUser.createDonastion.push(id);
    await dataUser.save();

    //const id_user = user._id.toString();
    return response.route("CampaignController.editDonasi", {
      id_campaign: id,
    });
  }
  // edit-donasi view data
  async editDonasi({ view, params }) {
    const id_campaign = params.id_campaign;

    const dataHistory = await Payment.all();
    console.log("datahis: " + dataHistory);
    const dataInfoCampaign = await Campaign.findBy("id_campaign", id_campaign);
    //console.log("dataCampaig: " + dataInfoCampaign.name_tree);
    return view.render("app.edit-donasi", {
      dataInfoCampaign,
      dataHistory: dataHistory.rows,
      id_campaign,
    });
  }

  // update-donasi view
  async updateDonasiView({ view, params }) {
    const id_campaign = params.id_campaign;
    //  console.log("id_view: " + id_campaign);
    const dataInfoCampaign = await Campaign.findBy("id_campaign", id_campaign);
    return view.render("app.update-donasi", { dataInfoCampaign });
  }

  async udpateDonasi({ request, response, session, params, auth }) {
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
        .flash({ notification: "Data gagal dibuat udpate" });
      return response.redirect("back"); // untuk ke halamannya
    }
    // buat id untuk user campaign
    const campaign = await Campaign.findBy("id_campaign", params.id_campaign);
    campaign.id_user = user._id;
    campaign.id_campaign = params.id_campaign;
    campaign.name_tree = data.name_tree;
    campaign.short_desc = data.short_desc;
    campaign.long_desc = data.long_desc;
    campaign.goal_desc = data.goal_desc.split(",");
    campaign.price_goal = data.price_goal;
    campaign.price_now = 0;
    await campaign.save();

    session.flash({ notification: "Data berhasil diupdate" });
    return response.redirect("back");
  }

  //view update-image
  async uploadCampaignImageView({ view, params }) {
    const id_campaign = params.id_campaign;

    const dataInfoCampaign = await Campaign.findBy("id_campaign", id_campaign);
    return view.render("app.upload-campaign-image", {
      dataInfoCampaign,
    });
  }

  // send image to path
  async uploadCampaignImage({ request, response, params, session }) {
    // image 1
    const campaignOne = request.file("image_campaign_one", {
      types: ["image"],
      size: "2mb",
    });

    if (campaignOne === null) {
      session.flash({ notification: "Gambar 1 kosong harap diisi" });
      return response.redirect("back");
    }

    await campaignOne.move(Helpers.publicPath("campaign"), {
      name: params.id_campaign + "-campaign-one.jpg",
      overwrite: true,
    });

    // image 2
    const campaignTwo = request.file("image_campaign_two", {
      types: ["image"],
      size: "2mb",
    });

    if (campaignTwo === null) {
      session.flash({ notification: "Gambar 2 kosong harap diisi" });
      return response.redirect("back");
    }

    await campaignTwo.move(Helpers.publicPath("campaign"), {
      name: params.id_campaign + "-campaign-two.jpg",
      overwrite: true,
    });

    // image 3
    const campaignThree = request.file("image_campaign_three", {
      types: ["image"],
      size: "2mb",
    });

    if (campaignThree === null) {
      session.flash({ notification: "Gambar 3 kosong harap diisi" });
      return response.redirect("back");
    }

    await campaignThree.move(Helpers.publicPath("campaign"), {
      name: params.id_campaign + "-campaign-three.jpg",
      overwrite: true,
    });

    // image 4
    const campaignFour = request.file("image_campaign_four", {
      types: ["image"],
      size: "2mb",
    });

    if (campaignFour === null) {
      session.flash({ notification: "Gambar 4 kosong harap diisi" });
      return response.redirect("back");
    }

    await campaignFour.move(Helpers.publicPath("campaign"), {
      name: params.id_campaign + "-campaign-four.jpg",
      overwrite: true,
    });

    const id_campaign = params.id_campaign;
    const campaign = await Campaign.findBy("id_campaign", id_campaign);
    campaign.id_campaign = id_campaign;
    campaign.campaignImageOne = campaignOne.fileName;
    campaign.campaignImageTwo = campaignTwo.fileName;
    campaign.campaignImageThree = campaignThree.fileName;
    campaign.campaignImageFour = campaignFour.fileName;
    await campaign.save();

    session.flash({ notification: "Gambar berhasil di Upload" });
    return response.redirect("back");
  }

  async showDonasi({ view }) {
    const campaign = await Campaign.all();
    return view.render("app.show-donasi", { campaign: campaign.rows });
  }

  async donasiInfo({ view, params }) {
    const campaign = await Campaign.findBy("id_campaign", params.id_campaign);

    //temukan siap yang buat
    const userLeader = await User.find(campaign.id_user);

    return view.render("app.donasi-info", { campaign, userLeader });
  }
}

module.exports = CampaignController;

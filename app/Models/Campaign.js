"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Campaign extends Model {
  static get table() {
    return "campaign";
  }
}

module.exports = Campaign;

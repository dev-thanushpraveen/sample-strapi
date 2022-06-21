"use strict";

/**
 *  account controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::account.account", ({ strapi }) => ({
  async checkAccount(ctx) {
    console.log(ctx.params.userId);

    if (ctx.params.userId) {
      let account = await strapi.entityService.findOne(
        "api::account.account",
        ctx.params.userId,
        {
          populate: { user: true },
        }
      );
      if (account) {
        ctx.send({
          status: "success",
          message: "User exists",
          account: account,
        });
      } else {
        ctx.send({
          status: "success",
          message: "User does not exist",
        });
      }
    } else {
      ctx.send({
        message: "No userId provided",
        status: "error",
      });
    }
  },
}));

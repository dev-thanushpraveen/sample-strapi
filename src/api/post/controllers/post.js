"use strict";

/**
 *  post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async likePost(ctx) {
    let body = ctx.request.body;
    let post = await strapi.entityService.findOne(
      "api::post.post",
      ctx.params.id,
      {
        select: ["id", "owner", "likeCount", "likedUsers"],
        populate: { owner: true, likedUsers: false },
      }
    );
    if (post) {
      let likedUsers = post.likedUsers.map((user) => user.id + "");
      let isExist = likedUsers.includes(body.accountId);
      if (isExist) {
        let removedUser = post.likedUsers.filter(
          (user) => user.id + "" !== body.accountId
        );
        let removedLikeUsers = removedUser?.map((user) => user.id + "");
        let data = await strapi.entityService.update(
          "api::post.post",
          ctx.params.id,
          {
            data: {
              likedUsers: removedLikeUsers,
              likeCount: post.likeCount - 1,
            },
            populate: { owner: true, likedUsers: false },
          }
        );
        ctx.send({
          status: "success",
          data: data,
        });
      } else {
        let newLikedUsers = [...likedUsers, body.accountId];
        let data = await strapi.entityService.update(
          "api::post.post",
          ctx.params.id,
          {
            data: {
              likeCount: post.likeCount + 1,
              likedUsers: newLikedUsers,
            },
            populate: { owner: true, likedUsers: false },
          }
        );
        ctx.send({
          status: "success",
          data,
        });
      }
    } else {
      ctx.badRequest("Post not found");
    }
  },
}));

module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "POST",
      path: "/likePost/:id",
      handler: "post.likePost",
    },
    // {
    //   // Path defined with a regular expression
    //   method: "GET",
    //   path: "/checkAccount/:userId", // Only match when the URL parameter is composed of lowercase letters
    //   handler: "account.checkAccount",
    //   config: {
    //     auth: false,
    //   },
    // },
  ],
};

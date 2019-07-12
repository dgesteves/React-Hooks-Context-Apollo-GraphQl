const postsResolver = require("./posts");
const usersResolver = require("./users");
const commentsResolver = require("./comments");
const likesResolver = require("./likes");

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length
  },
  Query: {
    ...postsResolver.Query
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
    ...likesResolver.Mutation
  },
  Subscription: {
    ...postsResolver.Subscription
  }
};

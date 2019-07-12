const { UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const Post = require("../../models/Post");

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          // Post already liked, unlike it
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // Post not liked, like it
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not fount");
      }
    }
  }
};

const { AuthenticationError } = require( 'apollo-server' )

const Post = require( '../../models/Post' )
const checkAuth = require( '../../util/check-auth' )

module.exports = {
    Query: {
        async getPosts() {
            try {
                return await Post.find().sort( { createdAt: - 1 } )
            } catch ( e ) {
                throw new Error( e )
            }
        },
        async getPost( _, { postId } ) {
            try {
                const post = await Post.findById( postId )
                if ( post ) {
                    return post
                } else {
                    throw new Error( 'Post not found' )
                }
            } catch ( e ) {
                throw new Error( e )
            }
        }
    },
    Mutation: {
        async createPost( _, { body }, context ) {
            const user = checkAuth( context )

            if ( body.trim() === '' ) {
                throw new Error( 'Post body must not be empty' )
            }

            const newPost = new Post( {
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            } )
            const post = await newPost.save()

            context.pubSub.publish( 'NEW_POST', {
                newPost: post
            } )

            return post
        },
        async deletePost( _, { postId }, context ) {
            const user = checkAuth( context )
            try {
                const post = await Post.findById( postId )
                if ( user.username === post.username ) {
                    await post.delete()
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError( 'Action not allowed' )
                }
            } catch ( e ) {
                throw new Error( e )
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: ( _, __, { pubSub } ) => pubSub.asyncIterator( 'NEW_POST' )
        }
    }
}

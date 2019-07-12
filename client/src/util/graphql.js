import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id
            body
            createdAt
            username
            likeCount
            commentCount
            likes{
                username
            }
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`

export const FETCH_POST_QUERY = gql`
    query ($postId:ID!){
        getPost(postId:$postId ){

            body
            commentCount
            comments{
                body
                createdAt
                id
                username
            }
            createdAt
            id
            likeCount
            likes{
                username
            }
            username
        }
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation createPost($body:String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            comments{
                id
                createdAt
                username
                body
            }
            likes{
                id
                createdAt
                username
            }
            likeCount
            commentCount
        }
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!){
        deletePost(postId: $postId)
    }
`

export const LOGIN_USER_MUTATION = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        ){
            id
            email
            token
            username
            createdAt
        }
    }

`

export const REGISTER_USER_MUTATION = gql`
    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ){
        register(registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
        ){
            id
            email
            token
            username
            createdAt
        }
    }

`

export const LIKE_POST_MUTATION = gql`
    mutation likePost($postId:ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`

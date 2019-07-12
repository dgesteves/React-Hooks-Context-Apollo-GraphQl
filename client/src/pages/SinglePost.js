import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import React, { useContext } from 'react'
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react'
import DeleteButton from '../components/DeleteButton'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import { FETCH_POST_QUERY } from '../util/graphql'

const SinglePost = props => {

    const { user } = useContext( AuthContext )

    const postId = props.match.params.postId

    const { data: { getPost } } = useQuery( FETCH_POST_QUERY, {
        variables: {
            postId
        }
    } )

    const onDeletePost = () => {
        props.history.push( '/' )
    }

    let postMarkup

    if ( !getPost ) {
        postMarkup = <p>Loading Post...</p>
    } else {
        const {
            body, commentCount, createdAt, id, likeCount, likes, username
        } = getPost

        postMarkup = <Grid>
            <Grid.Row>
                <Grid.Column width={ 2 }>
                    <Image floated='right' size='small'
                           src='https://react.semantic-ui.com/images/avatar/large/molly.png'/>
                </Grid.Column>
                <Grid.Column width={ 10 }>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{ username }</Card.Header>
                            <Card.Meta>{ moment( createdAt ).fromNow() }</Card.Meta>
                            <Card.Description>{ body }</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={ user }
                                        post={ { id, likes, likeCount } }/>
                            <Button as='div' labelPosition='right'
                                    onClick={ () => console.log( 'comment' ) }>
                                <Button basic color='blue'>
                                    <Icon name='comments'/>
                                </Button>
                                <Label basic color='blue'
                                       pointing='left'>{ commentCount }</Label>
                            </Button>
                            { user && user.username === username &&
                              <DeleteButton postId={ id }
                                            onDeletePost={ onDeletePost }/> }
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    }

    return postMarkup
}

export default SinglePost

import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/graphql'

const DeleteButton = ( { postId, onDeletePost } ) => {

    const [ confirmOpen, setConfirmOpen ] = useState( false )

    const [ deletePost ] = useMutation( DELETE_POST_MUTATION, {
        update( proxy ) {
            setConfirmOpen( false )

            const data = proxy.readQuery( {
                query: FETCH_POSTS_QUERY
            } )

            data.getPosts = data.getPosts.filter( post => post.id !== postId )

            proxy.writeQuery( {
                query: FETCH_POSTS_QUERY, data
            } )

            if ( onDeletePost ) {
                onDeletePost()
            }
        },
        variables: {
            postId
        }
    } )

    return (
        <>
            <Button as='div' color='red' basic floated='right'
                    onClick={ () => setConfirmOpen( true ) }>
                <Icon name='trash' style={ { margin: 0 } }/>
            </Button>
            <Confirm open={ confirmOpen }
                     onCancel={ () => setConfirmOpen( false ) }
                     onConfirm={ () => setConfirmOpen( deletePost ) }/>
        </>
    )
}

export default DeleteButton

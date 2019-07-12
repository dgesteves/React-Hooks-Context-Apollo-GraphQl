import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/graphql'

const PostForm = () => {

    const [ values, setValues ] = useState( { body: '' } )

    const [ createPost, { error } ] = useMutation( CREATE_POST_MUTATION, {
        variables: values,
        update( proxy, result ) {

            const data = proxy.readQuery( {
                query: FETCH_POSTS_QUERY
            } )
            data.getPosts = [ result.data.createPost, ...data.getPosts ]

            proxy.writeQuery( {
                query: FETCH_POSTS_QUERY, data
            } )

            values.body = ''
        }
    } )

    const onSubmit = e => {
        e.preventDefault()
        createPost()
    }

    const onChange = e => {
        setValues( { ...values, [ e.target.name ]: e.target.value } )
    }

    return (
        <>
            <Form onSubmit={ onSubmit }>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input placeholder={ 'X-Chat' } name={ 'body' }
                                error={ !!error }
                                onChange={ onChange } value={ values.body }/>
                    <Button type={ 'submit' } color={ 'teal' }>
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            { error &&
              <div className='ui error message' style={ { marginBottom: 20 } }>
                  <ul className='list'>
                      <li>{ error.graphQLErrors[ 0 ].message }</li>
                  </ul>
              </div> }
        </>
    )
}

export default PostForm

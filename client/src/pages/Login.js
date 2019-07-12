import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { LOGIN_USER_MUTATION } from '../util/graphql'

const Login = props => {

    const context = useContext( AuthContext )

    const [ errors, setErrors ] = useState( {} )
    const [ values, setValues ] = useState( {
        username: '',
        password: ''
    } )

    const onChange = e => setValues( {
        ...values,
        [ e.target.name ]: e.target.value
    } )

    const [ loginUser, { loading } ] = useMutation( LOGIN_USER_MUTATION, {
        update( _, { data: { login: userData } } ) {
            context.login( userData )
            props.history.push( '/' )
        },
        onError( err ) {
            setErrors( err.graphQLErrors[ 0 ].extensions.exception.errors )
        },
        variables: values
    } )

    const onSubmit = e => {
        e.preventDefault()
        loginUser()
    }

    return (
        <div className={ 'form-container' }>
            <Form className={ loading ? 'loading' : '' } onSubmit={ onSubmit }
                  noValidate>
                <h1>Login</h1>
                <Form.Input label={ 'Username' } placeholder={ 'Username...' }
                            name={ 'username' } value={ values.username }
                            error={ !!errors.username }
                            type={ 'text' } onChange={ onChange }/>
                <Form.Input label={ 'Password' } placeholder={ 'Password...' }
                            name={ 'password' } value={ values.password }
                            error={ !!errors.password }
                            type={ 'password' } onChange={ onChange }/>
                <Button type={ 'submit' } primary>
                    Login
                </Button>
            </Form>
            { Object.keys( errors ).length > 0 &&
              <div className='ui error message'>
                  <ul className='list'>
                      { Object.values( errors ).map( err => <li
                          key={ err }>{ err }</li> ) }
                  </ul>
              </div> }
        </div>
    )
}

export default Login

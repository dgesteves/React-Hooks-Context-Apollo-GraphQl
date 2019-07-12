import { useMutation } from '@apollo/react-hooks'
import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { AuthContext } from '../context/auth'
import { REGISTER_USER_MUTATION } from '../util/graphql'

const Register = props => {

    const context = useContext( AuthContext )

    const [ errors, setErrors ] = useState( {} )
    const [ values, setValues ] = useState( {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    } )

    const onChange = e => setValues( {
        ...values,
        [ e.target.name ]: e.target.value
    } )

    const [ addUser, { loading } ] = useMutation( REGISTER_USER_MUTATION, {
        update( _, { data: { register: userData } } ) {
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
        addUser()
    }

    return (
        <div className={ 'form-container' }>
            <Form className={ loading ? 'loading' : '' } onSubmit={ onSubmit }
                  noValidate>
                <h1>Register</h1>
                <Form.Input label={ 'Username' } placeholder={ 'Username...' }
                            name={ 'username' } value={ values.username }
                            error={ !!errors.username }
                            type={ 'text' } onChange={ onChange }/>
                <Form.Input label={ 'Email' } placeholder={ 'Email...' }
                            name={ 'email' } value={ values.email }
                            error={ !!errors.email }
                            type={ 'email' } onChange={ onChange }/>
                <Form.Input label={ 'Password' } placeholder={ 'Password...' }
                            name={ 'password' } value={ values.password }
                            error={ !!errors.password }
                            type={ 'password' } onChange={ onChange }/>
                <Form.Input label={ 'Confirm Password' }
                            placeholder={ 'Confirm Password...' }
                            name={ 'confirmPassword' }
                            error={ !!errors.confirmPassword }
                            value={ values.confirmPassword }
                            type={ 'password' } onChange={ onChange }/>
                <Button type={ 'submit' } primary>
                    Register
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

export default Register

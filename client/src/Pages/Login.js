import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag';

import { AuthContext } from '../context/Auth';
import { useForm } from '../util/hooks';

function Login(props) {
    const context = useContext( AuthContext )
    const [errors, setErrors] = useState({})
     
    const { onChange, onSubmit, values } = useForm(logingUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER,{
        update(_, {data: {login: userData}}){
            context.login(userData);
            props.history.push('/')
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
        })
    function logingUserCallback() {
        loginUser();
    }
    
    return (
        
        <div>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''} >
                <h1>Login</h1>
                
                 <Form.Input
                label="username"
                placeholder="Username.."
                name="username"
                type="uername"
                value={values.username} 
                error={errors.username ? true : false}
                onChange={onChange}
                 />
                 <Form.Input
                label="password"
                placeholder="password.."
                name="password"
                type="password"
                value={values.password} 
                error={errors.password ? true : false}
                onChange={onChange}
                />
                <Button type="submit" primary>
                   Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                        ))}

                    </ul>
                </div>
            )}
        </div>
    )
}
const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            
                username: $username
                password: $password

        ){
            id email username createdAt token
        }
    }
`;

export default Login

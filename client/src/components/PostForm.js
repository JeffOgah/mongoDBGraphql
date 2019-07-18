import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm} from '../util/hooks';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';


import { FETCH_POST_QUERY } from '../util/graphql';



function PostForm() {

    const { values, onSubmit, onChange } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
           const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            });
            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POST_QUERY, data})
            values.body = ''
        }
    })

    function createPostCallback(){
        createPost();
    }
    return (
        <>
           <Form onSubmit= {onSubmit}>
            <h1>Create a Post</h1>
            <Form.Field>
                <Form.Input
                placeholder= "Hi Pam"
                name= "body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
                />
                <Button type="submit" color="teal">
                   Submit 
                </Button>
            </Form.Field>
        </Form>
        {error && (
            <di className="ui error message" stylw={{marginButtom: 20}}>
                <ul className="list" >
                    <li>
                        {error.graphQLErrors[0].message}
                    </li>
                </ul>
            </di>
        )}

       
       </>
    )
}


const CREATE_POST_MUTATION = gql `
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdAt username
        likes{
            id createdAt username
        }
        likeCount
        comments{
            id body createdAt username

        }
        commentCount
    }
}
`;

export default PostForm

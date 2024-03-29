import React, { useContext } from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/Auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

 

function SinglePost(props){
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext)
    console.log(postId)

    const {data: { getPost }} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    function deletePostCallback(){
        console.log("callback")
        props.history.push('/')
    }

    let postMarkup;
    if (!getPost){
        postMarkup = <p>losding post... </p>;
    }else{
        const {
            id, 
            body,
            comments,
            createdAt, 
            username,
            likes,
            likeCount,
            commentCount,
        }= getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    size="small"
                    float="right"
                    />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content>
                                <LikeButton user={user} post={{id, likeCount, likes }} />
                                <Button
                                as="div"
                                labelPosition="right"
                                onClick={() => console.log("comment on post ")}>
                                    <Button color="blue" basic>
                                        <Icon name ="comments" />

                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        { commentCount }
                                    </Label> 
                                </Button>
                                { user && user.username === username && (
                                    <DeleteButton
                                     postId={id}
                                     callback={deletePostCallback}
                                    />
                                ) }
                            </Card.Content>
                        </Card>
                           
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
    

}


const FETCH_POST_QUERY = gql`
     query($postId:ID!){
         getPost(postId: $postId){
             id
             body
             createdAt
              username
             likeCount
             likes{
                 username
             }
             commentCount
             comments{
                 id 
                 username 
                 createdAt 
                 body 
             }
         }
     }
`;
export default SinglePost

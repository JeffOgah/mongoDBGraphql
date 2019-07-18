import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import { AuthContext } from '../context/Auth';
import PostForm from '../components/PostForm';
import { FETCH_POST_QUERY } from '../util/graphql';
 


function Home() {
    const { user } = useContext(AuthContext);


    const { loading, data: {getPosts: posts }} = useQuery(FETCH_POST_QUERY);
    if(posts) {
        console.log(posts)
    }
    return (
        <Grid columns={3}>
        <Grid.Row className="page-title">
             <h1>Recent Posts</h1>
        </Grid.Row>
         <Grid.Row>
             {user && (
                 <Grid>
                    <PostForm />
                 </Grid>
             )}
            {loading ? (
                <h1>Loading....</h1>
            ) : ( 
                <Transition.Group>
                    {
                 posts && posts.map((post) => (
                    <Grid.Column key={post.id} style={{marginButtom:20}}>
                     <PostCard post={post} />
                    </Grid.Column>
                   
                ))
                    }
                </Transition.Group>
            )}
        </Grid.Row>
        </Grid>
    )
}
export default Home

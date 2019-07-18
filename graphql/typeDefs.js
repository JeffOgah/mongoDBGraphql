const { gql } = require("apollo-server");

module.exports = gql`

  type Post {

    id: ID!

    body: String!

    createdAt: String!

    username: String!

    comments: [Comment]!

    likes: [Like]!

    likeCount: Int!

    commentCount: Int!

  }

  type Comment {

    id: ID!

    createdAt: String!

    username: String!

    body: String!

  }

  type Like {

    id: ID!

    createdAt: String!

    username: String!

  }

  type User {

    id: ID!

    email: String!

    token: String!

    username: String!

    createdAt: String!

  }

  input RegisterInput {

    username: String!

    password: String!

    confirmPassword: String!

    email: String!

  }

  type Event {
    eventname: String!
    id: ID
    eventCreator:[EvntCreator]!

    createdAt: String!

    free: Boolean!

    body: String!

    startDateandTime: Date!

    endDateandTime: Date!

    url: String

    ticketurl: String

    public: Boolean!

    eventLocation: [Eventlocation]!

    userInterest{
      intesested: [Interested]!

      going:[Going]!
    }

    request: [Request]!

    comments: [Comment]!

    files: [Files]!

    likes: [Like]

    likeCount: Int!

    commentCount: Int!

  }

  type Files {
    img: String
    video: String
     id:ID
   }


   type Eventlocation  {  
    location: String!
     lat: Number!
     long: Number!
     id: ID!
 }

   type Request {
     username:String!
     createdAt: String!
     approved: Boolean!
     declined: Boolean!
     id: ID!
 }

  type EventCreator {
   username: String!
   id: ID!
   }

 type Members {
       username: String!
       createdAt: String!
       admin: Boolean!
   }

  type Interested {
   username: String!
   createdAt String!
   id: ID!
 }

 type Going: {
    username: String!
    createdAt: String!
    id: ID!
   }



  type Query {

    getPosts: [Post]

    getPost(postId: ID!): Post

     getEvents: [Event]
     getEvent(eventId: ID!): Event


  }

  input EventInput {
    body: String!
    eventname: String!
    free: Boolean!
    startDateandTime: Date!
    endDateandTime: Date!
    url: String
    ticketurl: String
    public: Boolean!
    


  }


  type Mutation {

    register(registerInput: RegisterInput): User!

    login(username: String!, password: String!): User!

    createPost(body: String!): Post!

    deletePost(postId: ID!): String!


    createComment(postId: String!, body: String!): Post!

    deleteComment(postId: ID!, commentId: ID!): Post!

    likePost(postId: ID!): Post!


    createComment(eventId: String!, body: String!): Event!

    deleteEvent(eventId: ID!): String!

    likeEvent(eventId: ID!): Event!

    deleteComment(eventId: ID!, commentId: ID!): Event!

    createEvent(eventInput: EventInput): Event!

  }

  type Subscription {

    newEvent: Event!
    newPost: Post!

  }

`;

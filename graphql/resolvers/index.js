const postResolvers  = require('./post');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const eventResolvers = required('./events')



module.exports = {

  Post: {
    likeCount: (parent) => parent.likes.length,

    commentCount: (parent) => parent.comments.length
  },

   Event: {
     likeCount: (parent) => parent.likes.length,

     commentCount: (parent) => parent.comments.length
   },

  Query: {
    ...postResolvers.Query,
    ...eventResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...eventResolvers.Mutation,

    ...postResolvers.Mutation,

    ...commentsResolvers.Mutation
  },
  Subscription: {

    ...postResolvers.Subscription,
    ...eventResolvers.Subscription

  }

};
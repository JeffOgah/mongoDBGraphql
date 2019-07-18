const { AuthenticationError, UserInputError } = require("apollo-server");
const checkAuth = require('../../util/check-auth');

const Event = require('../../Modules/Event');

module.exports = {
  Query: {
    async getEvents() {
      try {
        const Events = await Event.find().sort({ createdAt: -1 });

        return Events;
      } catch (err) {
        throw new Error(err);
      }
    },
    // TODO (check what is postid and also check what is [getPost])
    async getEvent(_, { eventId }) {
      try {
        const eventDetail = await Event.findById(eventId);

        if (eventDetail) {
          return eventDetail;
        } else {
          throw new Error("No event Avaliable yet");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async createEvent(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Event description must not be empty");
      } else if (condition) {
      } else {
      }

      const newEvent = new Event({registerEvent:{
        body,
        eventname: String,
        user: user.id,
        createdAt: new Date().toISOString(),
        startDateandTime: Date,
        endDateandTime: Date,
        ticketurl: String,
        url: String,
        public: Boolean,
        free: Boolean,
        eventLocation: [
          {
            location: String,
            lat: Number,
            long: Number
          }
        ],
        files: [
          {
            img: String,
            video: String
          }
        ],
        eventCreator: [
          {
            username: user.username
          }
        ]
      }
      });

      const singleEvent = await newEvent.save();
      context.pubsub.publish("NEW_EVENT", {
        newEvent: singleEvent
      });
      return singleEvent;
    },
    async deleteEvent(_, { eventId }, context) {
      const user = checkAuth(context);
      try {
        const singleEvent = await Event.findById(eventId);
        if (user.username === singleEvent.EventCreator.username) {
          await singleEvent.delete();
          return "Event deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
 
    async likeEvent(_, { eventId }, context) {
      const { username } = checkAuth(context);

      const singleEvent = await Event.findById(eventId);

      if (singleEvent) {
        if (singleEvent.likes.find(like => like.username === username)) {
          // Post already likes, unlike it

          singleEvent.likes = singleEvent.likes.filter(
            like => like.username !== username
          );
        } else {
          // Not liked, like post

          singleEvent.likes.push({
            username,

            createdAt: new Date().toISOString()
          });
        }

        await singleEvent.save();

        return singleEvent;
      } else throw new UserInputError("Event not found");
    }
  },

  Subscription: {
    newEvent: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_EVENT")
    }
  }
};

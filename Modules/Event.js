const {model, Schema } = require('mongoose');

const EventSchema = new Schema({
    eventname: String,
    createdAt: String,
    eventCreator:[
        {
        username: String,
        }
    ],
    members: [
        {
            username: String,
            createdAt: String,
            admin: Boolean,
        }
    ],
    startDateandTime: Date,

    endDateandTime: Date,
    ticketurl: String,
    url: String,
    eventLocation :[
        {
        location: String,
        lat: Number,
        long: Number,
    }
   ],
   public: Boolean,
   free: Boolean,

   userInterest: [
       {   
           interested:[
               {
                username: String,
                createdAt: String,
       }],
       going: [
           {
            username: String,
            createdAt: String,
           }
       ]  
       }
   ],

   request:[
       {
           username:String,
           createdAt: String,
           approved: Boolean,
           declined: Boolean,
       }
   ],
    createdAt: String,
    body: String,
    comments:[
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    files: [
        {
            img: String,
            video: String,
        }
    ],   
    

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Event', EventSchema);
if (Meteor.isServer) {
    Meteor.publish('users', function () {
        return Meteor.users.find({}, {fields: {profile: 1, status: 1, services: 1}});
    });

    Meteor.publish('Chat', function () {
        return Chat.find({});
    });

    Meteor.methods({
        newChatMessage: function (message, sentTo) {
            var chatObj = {
                'userId': Meteor.user()._id,
                'user': Meteor.user().profile.name,
                'message': message,
                'sentOn': new Date(),
                'sentTo': sentTo
            };

            Chat.insert(chatObj);
        },
    });
}
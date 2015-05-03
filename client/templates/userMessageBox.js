Template.userMessageBox.helpers({
    messages: function () {
    	send = Meteor.user().profile.name;
    	receive = Session.get('curuser');
        return Chat.find({$or : [{$and : [{user: send},{sentTo: receive}]}, {$and : [{user: receive},{sentTo: send}]}]}, {sort: {sentOn: 1}});
    },
    curuser: function(){
    	return Session.get('curuser');
    }
});
Template.userMessageBox.events({
    'submit #chatMsgForm': function (event, template) {
        event.preventDefault();
        var message = template.$('[id=textMessage]').val();
        Meteor.call("newChatMessage", message, Session.get('curuser'));
        template.$('[id=textMessage]').val("");
    }
});
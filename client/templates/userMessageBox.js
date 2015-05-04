incrementLimit = function() {
  newLimit = Session.get('limit') + 10;
  Session.set('limit', newLimit);
}
Template.userMessageBox.created = function(){
    Session.setDefault('limit', 10);
}
Template.userMessageBox.helpers({
    messages: function () {
    	send = Meteor.user().profile.name;
    	receive = Session.get('curuser');
        chats =  Chat.find({
                            $or : [
                                    {$and : [{user: send},{sentTo: receive}]}, 
                                    {$and : [{user: receive},{sentTo: send}]}
                                ]
                        }, 
                        {
                            sort: {
                                sentOn: -1
                            },
                            limit: Session.get('limit')
                        }).fetch();
        chats.sort(function(a,b) { return a.sentOn - b.sentOn } );
        return chats;
    },
    curuser: function(){
    	return Session.get('curuser');
    }
});
Template.userMessageBox.events({
    'submit #chatMsgForm': function (event, template) {
        event.preventDefault();
        Session.set('limit', Session.get('limit') + 1);
        var message = template.$('[id=textMessage]').val();
        Meteor.call("newChatMessage", message, Session.get('curuser'));
        template.$('[id=textMessage]').val("");
        var elem = template.$('[id=messages]');
        elem.animate({ scrollTop: elem[0].scrollHeight}, 200);
    },
    'click #incr': function(e) {
        incrementLimit();
    }
});
Template.userMessageBox.rendered = function(){
    var elem = $(this.find('[id=messages]'))
    elem.animate({ scrollTop: elem[0].scrollHeight}, 200);
}
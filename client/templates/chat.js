Template.chat.created = function(){
    Session.set('showModal', false);
};
Template.registerHelper('formatDate', function (date) {
    return moment(date).from(new Date());
});

Template.chat.helpers({
    allUsers: function () {
        return Meteor.users.find({ 'profile.name': {$ne: Meteor.user().profile.name }}, {sort: {"profile.firstName": 1}});
    },
    currUserName: function () {
        return Meteor.user().profile.name;
    },
    'showModal': function(){
        console.log(Session.get('showModal'));
        return Session.get('showModal');
    }
});
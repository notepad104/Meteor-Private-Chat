Router.route("/", function () {
    this.redirect('chat');
});

Router.route("home", function () {
    if(Meteor.user())
        this.redirect('chat');
    else
        this.redirect('sign-in');
});

Router.route("chat", {
    name: 'chat',
    path: "chat",
    template: 'chat',
    onBeforeAction: function () {
        AccountsEntry.signInRequired(this);
    },
    action: function () {
        this.render('chat');
    }
});
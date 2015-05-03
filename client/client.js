Meteor.startup(function () {
    AccountsEntry.config({
        dashboardRoute: 'chat',
        homeRoute: '/',
        showOtherLoginServices: true,
        extraSignUpFields: [{
            field: "name",
            name: "",
            label: "Full Name",
            placeholder: "Full Name",
            type: "text",
            required: true
            }
        ]
    })
});

if (Meteor.isClient) {
    Meteor.subscribe('users');
    Meteor.subscribe('Chat');
};
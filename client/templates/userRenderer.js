Template.userRenderer.helpers({
    userStatus: function () {
        if (this.status) {
            if (this.status.online)
                return "Online";
        }

        return "Offline";
    },
    profilePicture: function () {
        return "images/user.png";
    },
    userStatusBool: function () {
        if (this.status) {
            if (this.status.online)
                return true;
        }

        return false;
    },
    username: function(){
        return this.profile.name;
    }
});
Template.userRenderer.events({
    'click #showModalButton': function(){
        Session.set('curuser',this.profile.name);
        Session.set('showModal', true);
    },
});
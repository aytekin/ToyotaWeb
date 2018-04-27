define(['text!components/accountConfirmation/AccountConfirmationTemplate.html'], function (template) {
    var userTemplate = Handlebars.compile(template);
    days(template);
    var UserModel = Backbone.Model.extend({
        idAttribute: 'id'

    });
    var UserCollection = Backbone.Collection.extend({
        url: "/api/user",
        model: UserModel
    });

    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.users = new UserCollection();
            this.listenTo(this.users, "reset add change remove", this.render);
            this.users.fetch({reset: true});

        },
        events: {

            'click .confirm': 'confirm'
        },
        confirm: function(){
            var value = 1;
            var authority = $("#authority").val();
            var id = $(e.currentTarget).data("id");
            var user = this.users.findWhere({id: id});
            user.set("", value);
            user.save();


        },
        render: function () {
            this.$el.html(userTemplate({users: this.users.toJSON()}));
        }
    });

});

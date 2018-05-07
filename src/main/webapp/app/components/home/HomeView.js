define(['text!components/home/HomeTemplate.html'], function (template) {
    var homeTemplate = Handlebars.compile(template);
    var LoginModel = Backbone.Model.extend({});

    var LoginCollection = Backbone.Collection.extend({
        url: "/api/login",
        model: LoginModel
    });
    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.loginModel = new LoginCollection();
            this.listenTo(this.loginModel, "reset add change remove", this.render);
            this.loginModel.fetch({reset: true});

            this.render();
        },
        render: function () {
            if(this.loginModel.models[0]!=undefined)
            {
                var firstName = this.loginModel.models[0].get("firstName");
                if(firstName!=null)
                {
                    this.$el.html(homeTemplate());
                    $('#loginIn').hide();
                    $('#RegisterUser').hide();
                    $('#logout').show();
                }
                else
                {
                    this.$el.html(homeTemplate());
                }
            }

        }
    });
});


define(['text!components/userLogin/LoginTemplate.html'], function (template) {
    var LoginTemplate = Handlebars.compile(template);
    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(LoginTemplate());
        }
    });
});

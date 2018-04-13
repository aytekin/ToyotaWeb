
define(['text!components/home/HomeTemplate.html'], function (template) {
    var homeTemplate = Handlebars.compile(template);
    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(homeTemplate());
        }
    });
});

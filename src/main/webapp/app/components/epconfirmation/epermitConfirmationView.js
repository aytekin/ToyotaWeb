
define(['text!components/epconfirmation/epermitConfirmationTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({});

    var CityCollection = Backbone.Collection.extend({
        url: "/api/epermit",
        model: CityModel
    });
    return Backbone.View.extend({

        el: "#content",
        initialize: function () {
            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});
        },
        events: {
            'click .confirmEntryPermit':'confirmEntryPermit'
        },
        confirmEntryPermit: function (e) {
            var value= 1;
            var id = $(e.currentTarget).data("id");
            var city = this.cities.findWhere({epermitId: id});

            city.set({epermitStatus: value});
            city.save();


        },
        render: function () {
            this.$el.html(cityTemplate({cities: this.cities.toJSON()}));
        }
    });
});

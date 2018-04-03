define(['text!components/place/PlaceTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);
    var CityModel = Backbone.Model.extend({});
    var CityCollection = Backbone.Collection.extend({
        url: "/api/place",
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
            'submit #cityForm': 'saveCity',
            'click .deleteCity': 'deleteCity',
            'click .editCity': 'openEditMode',
            'click .cancel': 'cancelUpdate',
            'click .updateCity': 'updateCity'
        },

        saveCity: function (e) {
            if ($("#placeName").val().toString()!=""){
                e.preventDefault();
                var city = new CityModel({placeName: $("#placeName").val()});
                this.cities.create(city, {wait: true});
            }
            else
                alert("Place name cannot be empty");
        },
        deleteCity: function (e) {
            var id = $(e.currentTarget).data("id");
            this.cities.findWhere({id:id}).destroy();
            },
        updateCity: function (e) {
            var row = $(e.currentTarget).closest("tr");
            var newCityName = row.find("input").val();
            var id = $(e.currentTarget).data("id");
            var city = this.cities.findWhere({id: id});
            city.set({placeName: newCityName});
            city.save();

        },
        openEditMode: function (e) {
            var row = $(e.currentTarget).closest("tr");
            row.find(".editModeElement").show();
            row.find(".normalModeElement").hide();
        },
        cancelUpdate: function () {
            this.render();
        },
        render: function () {
            this.$el.html(cityTemplate({cities: this.cities.toJSON()}));
        }
    });
});

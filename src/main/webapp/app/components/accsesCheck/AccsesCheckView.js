
define(['text!components/accsesCheck/AccsesCheckTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({});
    var CompanyModel =Backbone.Model.extend({});;
    var CityCollection = Backbone.Collection.extend({
        url: "/api/epermit",
        model: CityModel
    });
    var CompanyCollection = Backbone.Collection.extend({
        url: "/api/company",
        model: CompanyModel
    });

    return Backbone.View.extend({
        el: "#content",
        initialize: function () {

            this.companies = new CompanyCollection();
            this.listenTo(this.companies, "reset add change remove", this.render);
            this.companies.fetch({reset: true});

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
            e.preventDefault();

            var city = new CityModel({
                epermit_names:$("#epermit_names").val(),
                entryDate:$("#entryDate").val(),
                exitDate:$("#exitDate").val(),
                enterTime:$("#enterTime").val(),
                exitTime:$("#exitTime").val(),
                entryCompany:$("#entryCompany").val(),
                reasonfentry:$("#reasonfentry").val(),
                accompanyPersonal:$("#accompanyPersonal").val(),
                entryPlaceId : $("#entryPlaceId").val(),
                wsEducation:$("#wsEducation").val()
            });

            this.cities.create(city, {wait: true});
        },
        deleteCity: function (e) {
            var id = $(e.currentTarget).data("id");
            this.cities.findWhere({id: id}).destroy();
        },
        updateCity: function (e) {
            var row = $(e.currentTarget).closest("tr");
            var newCityName = row.find("input").val();
            var id = $(e.currentTarget).data("id");
            var city = this.cities.findWhere({id: id});
            city.set({userName: newCityName});
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
            this.$el.html(cityTemplate({cities: this.cities.toJSON(),companies : this.companies.toJSON()}));
        }
    });
});

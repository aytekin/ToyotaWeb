
define(['text!components/epermit/EpermitTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({});

    var CityCollection = Backbone.Collection.extend({
        url: "/api/epermit",
        model: CityModel
    });

    var PlaceModel= Backbone.Model.extend({});
    var PlaceCollection = Backbone.Collection.extend({
        url: "/api/place",
        model: PlaceModel
    });

    var RfEntryModel= Backbone.Model.extend({});
    var RfEntryCollection = Backbone.Collection.extend({
        url: "/api/rfentry",
        model: RfEntryModel
    });

    var CompanyModel= Backbone.Model.extend({});
    var CompanyCollection = Backbone.Collection.extend({
        url: "/api/company",
        model: CompanyModel
    });

    var UserModel= Backbone.Model.extend({});
    var UserCollection = Backbone.Collection.extend({
        url: "/api/user",
        model: UserModel
    });

    return Backbone.View.extend({
        el: "#content",
        initialize: function () {

            this.rfentry = new RfEntryCollection();
            this.listenTo(this.rfentry, "reset add change remove", this.render);
            this.rfentry.fetch({reset: true});

            this.company = new CompanyCollection();
            this.listenTo(this.company, "reset add change remove", this.render);
            this.company.fetch({reset: true});

            this.users = new UserCollection();
            this.listenTo(this.users, "reset add change remove", this.render);
            this.users.fetch({reset: true});

            this.places = new PlaceCollection();
            this.listenTo(this.places, "reset add change remove", this.render);
            this.places.fetch({reset: true});

            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true})
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
            var placeId= 0;
            var companyId = 0;
            var rfEntryId = 0;
            var personalId = 0;

            var PlaceName = $("#entryPlaceId").val();
            var CompanyName =$("#entryCompany").val();
            var RfentryName =$("#rfentryName").val();
            var PersonalName = $("#accompanyPersonal").val();
            for(var i = 0 ; i<(this.places.length);i++)
            {
                if(this.places.models[i].get("placeName")==PlaceName)
                {
                    placeId=this.places.models[i].get("id");
                }
            }
            for(var i = 0 ; i<(this.company.length);i++)
            {
                if(this.company.models[i].get("companyName")==CompanyName)
                {
                    companyId=this.company.models[i].get("id");
                }
            }
            for(var i = 0 ; i<(this.rfentry.length);i++)
            {
                if(this.rfentry.models[i].get("rfentryName")==RfentryName)
                {
                    rfEntryId=this.rfentry.models[i].get("id");
                }
            }

            for(var i = 0 ; i<(this.users.length);i++)
            {
                if(this.users.models[i].get("userName")==PersonalName)
                {
                    personalId=this.users.models[i].get("id");
                }
            }
            console.log($("#entryDate").val() + " " +$("#enterTime").val());
            var city = new CityModel({
                epermit_names:$("#epermit_names").val(),
                entryDate:$("#entryDate").val(),
                exitDate:$("#exitDate").val(),
                enterTime:$("#enterTime").val(),
                exitTime:$("#exitTime").val(),
                entryCompany:companyId,
                reasonfentry:rfEntryId,
                accompanyPersonal:personalId,
                entryPlaceId :placeId,
                wsEducation:$("#wsEducation").val()
            });
            this.cities.create(city, {wait: true});
            alert("Kayıt Basarılı");
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
            this.$el.html(cityTemplate({places  : this.places.toJSON(),
                                        cities  : this.cities.toJSON(),
                                        company : this.company.toJSON(),
                                        rfentry : this.rfentry.toJSON(),
                                        users   : this.users.toJSON()
                                       }));
        }
    });
});

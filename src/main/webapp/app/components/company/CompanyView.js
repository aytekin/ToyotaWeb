define(['text!components/company/CompanyTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);
    var CityModel = Backbone.Model.extend({});
    var CityCollection = Backbone.Collection.extend({
        url: "/api/company",
        model: CityModel
    });
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

            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});

            this.control=0;
        },
        events: {
            'submit #cityForm': 'saveCity',
            'click .deleteCity': 'deleteCity',
            'click .editCity': 'openEditMode',
            'click .cancel': 'cancelUpdate',
            'click .updateCity': 'updateCity'
        },

        saveCity: function (e) {
            var counter = 0;
            var x = $("#companyName").val();
            for(var i = 0; i < this.cities.length;i++){
                if(this.cities.models[i].get("companyName") == x)
                    counter++;
            }
            if(counter != 0){
                alert("aynı isme sahip")

            }
            else if ($('#companyName').val().length < 1 ){
                alert("this place is cannot be empty!")
            }else{
                e.preventDefault();
                var city = new CityModel({companyName: $("#companyName").val()});
                this.cities.create(city, {wait: true});
            }

            this.render();

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
            city.set({companyName: newCityName});
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
            var model = this.loginModel.models[0].get("userRole");
            if(model!=null)
            {
                var roles = model[0].authority;
            }
            if(roles=="ROLE_ADMIN"||roles=="ROLE_DIREKTOR"||roles=="ROLE_PERSONAL")
            {
                this.$el.html(cityTemplate({cities: this.cities.toJSON()}));
            }
            else
            {
                if(this.control==0)
                alert("Bu sayfaya girme yetkiniz bulunmamaktadır");
                this.control++;
                var HomeView = require('components/home/HomeView');
                showView(new HomeView());
            }
        }
    });
});

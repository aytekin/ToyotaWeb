
define(['text!components/epconfirmation/epermitConfirmationTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({
        idAttribute: 'epermitId'
    });

    var CityCollection = Backbone.Collection.extend({
        url: "/api/epermit",
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

            this.newModel = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);

            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});

            this.control=0;
        },
        events: {
            'click .confirmEntryPermit':'confirmEntryPermit'
        },
        confirmEntryPermit: function (e) {

            var value= 1;
            var id = $(e.currentTarget).data("id");
            var city = this.cities.findWhere({epermitId: id});
            city.set("epermitStatus", value);
            city.save();
            this.render();
        },
        render: function () {

            var model = this.loginModel.models[0].get("userRole");
            if(model!=null)
            {
                var roles = model[0].authority;
            }
            if(roles=="ROLE_ADMIN"||roles=="ROLE_DIREKTOR")
            {
                editModel(this.cities,this.newModel);
                editDate(this.newModel);
                this.$el.html(cityTemplate({cities: this.newModel.toJSON()}));
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
    function editModel(editModel,newModel) {
        for(var i=0;i<editModel.length;i++)
        {
            if(editModel.models[i].get("epermitStatus")!=1)
            {
                newModel.push(editModel.models[i]);
            }
        }
        for(var i=0;i<newModel.length;i++)
        {
            if(newModel.models[i].get("epermitStatus")==1)
            {
                newModel.remove(newModel.models[i]);
            }
        }
    }
    function editDate(model) {
        for(var i = 0;i<model.length;i++){
            var exdate = new Date(model.models[i].get("exitDate")).toISOString();
            var exitDate = exdate.substr(0,10);
            var dayLogin = parseInt(exitDate.substring(8,10));
            if(dayLogin<31)
                dayLogin++;
            exitDate = exdate.substring(0,8);
            exitDate += dayLogin;
            var endate = new Date(model.models[i].get("entryDate")).toISOString();
            var entryDate = endate.substring(0,10);
            var dayLogout = parseInt(entryDate.substring(8,10));
            if(dayLogout<31)
                dayLogout++;
            entryDate = entryDate.substring(0,8);
            entryDate += dayLogout;
            model.models[i].set({exitDate:exitDate});
            model.models[i].set({entryDate:entryDate});
        }
    }
});

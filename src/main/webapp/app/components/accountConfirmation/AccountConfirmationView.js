define(['text!components/accountConfirmation/AccountConfirmationTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);
    days(template);
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
            this.finds = new CityCollection();
            this.listenTo(this.finds, "reset add change remove", this.render);

            this.companies = new CompanyCollection();
            this.listenTo(this.companies, "reset add change remove", this.render);
            this.companies.fetch({reset: true});

            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});

        },
        events: {
            'submit #cityForm': 'find',
            'click .deleteCity': 'deleteCity',
            'click .editCity': 'openEditMode',
            'click .cancel': 'cancelUpdate',
            'click .updateCity': 'updateCity'
        },
        find:function (e) {
            e.preventDefault();



            var kontrol = 0 ;
            var companyName = $("#entryPlaceId").val();
            var entryDate = $("#entryDate").val();
            var exitDate = $("#exitDate").val();
            for(var i = 0 ; i<this.cities.length-1;i++)
            {
                console.log(this.cities.models[i].get("entryCompany").companyName);
                if(this.cities.models[i].get("entryCompany").companyName.toString() == companyName
                    && this.cities.models[i].get("entryDate").toString()==entryDate
                    && this.cities.models[i].get("exitDate").toString()==exitDate )
                {
                    var data = [{
                        accompanyPersonal:this.cities.models[i].get("accompanyPersonal"),
                        epermit_names:this.cities.models[i].get("epermit_names"),
                        entryDate:this.cities.models[i].get("entryDate"),
                        enterTime:this.cities.models[i].get("enterTime"),
                        exitTime:this.cities.models[i].get("exitTime")
                    }]
                    this.finds.push(data);

                }

            }

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

            for(var i = 0;i<this.cities.length-1;i++){

                var exdate =   new Date(this.cities.models[i].get("exitDate")).toISOString();
                exdate = exdate.substr(0,10);
                var endate = new Date(this.cities.models[i].get("entryDate")).toISOString();
                endate = endate.substr(0,10);

                if(this.cities.models[i].get("wsEducation") == 1){
                    this.cities.remove(this.cities.models[i]);
                }else{
                    this.cities.models[i].set({exitDate:exdate});
                    this.cities.models[i].set({entryDate:endate});
                }

            }
            this.$el.html(cityTemplate({cities: this.cities.toJSON(),
                companies : this.companies.toJSON(),
                finds : this.finds.toJSON()
            }));
        }
    });

});

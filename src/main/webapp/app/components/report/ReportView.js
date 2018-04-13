define(['text!components/report/ReportTemplate.html'], function (template) {
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
    var Export = Backbone.Collection.extend({
        url: "/api/exportToExcel"
    });
    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.export = new Export();
            this.listenTo(this.finds, "reset add change remove", this.render);

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
            'click  .excelImport':'excelImport'
        },

        excelImport:function ()
        {

        },
        find:function (e) {
            e.preventDefault();
            var kontrol = 0 ;
            var companyName = $("#companyName").val();
            var entryDate = $("#entryDate").val();
            var exitDate = $("#exitDate").val();
            this.finds.reset();
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
                        exitTime:this.cities.models[i].get("exitTime"),
                    }]
                    id = this.cities.models[i].get("id");
                    this.finds.push(data);
                }
            }
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

Handlebars.registerHelper("z", function (x) {
    console.log(x);
    var epermitName="gelmedi";
    for(var i=0;i<this.epermit.length;i++)
    {
        if(x==this.epermit.models[i].get("epermitId"))
        {
            epermitName = this.epermit.models[i].get("epermit_names");
            console.log("epermitName");
        }
    }
    var template = "<td>"+epermitName+"</td>";
    var temp ="<td>"+epermitName+"</td>";
    return new Handlebars.SafeString(
        template
    );
});

define(['text!components/report/ReportTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({});
    var CompanyModel =Backbone.Model.extend({});
    var EpermitModel = Backbone.Model.extend({});
    var CityCollection = Backbone.Collection.extend({
        url: "/api/saveAllow",
        model: CityModel
    });
    var EpermitCollection = Backbone.Collection.extend({
        url: "/api/epermit",
        model: EpermitModel
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

            this.epermit = new EpermitCollection();
            this.listenTo(this.finds, "reset add change remove", this.render);
            this.epermit.fetch({reset:true});

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

            var companyName = $("#companyName").val();
            var entryDate = $("#entryDate").val();
            var exitDate = $("#exitDate").val();
            this.finds.reset();

            //for(var i = 0;i<this.cities.length;i++){
//
            //    var exdate =   new Date(this.cities.models[i].get("saveExitDate")).toISOString();
            //    exdate = exdate.substr(0,10);
            //    var endate = new Date(this.cities.models[i].get("saveDate")).toISOString();
            //    var regularenDate = parseInt(endate.substring(9,10))+1;
            //    endate = endate.substr(0,9)+regularenDate;
            //    var regularexDate =parseInt(exdate.substring(9,10))+1;
            //    exdate = exdate.substr(0,9)+regularexDate;
            //    this.cities.models[i].set({saveExitDate:exdate});
            //    this.cities.models[i].set({saveDate:endate});
            //}

            for(var i = 0 ; i<this.cities.length;i++)
            {
                console.log(this.cities.models[i].get("saveCompany").companyName);
                if(this.cities.models[i].get("saveCompany").companyName.toString() == companyName
                    && this.cities.models[i].get("saveDate").toString()>=entryDate
                    && this.cities.models[i].get("saveExitDate").toString()<=exitDate )
                {
                    var data = [{
                        epermitId:this.cities.models[i].get("epermitId"),
                        saveDate:this.cities.models[i].get("saveDate"),
                        saveExitDate:this.cities.models[i].get("saveExitDate"),
                        saveEnterTime:this.cities.models[i].get("saveEntryTime"),
                        saveExitTime:this.cities.models[i].get("saveExitTime")
                    }];
                    id = this.cities.models[i].get("id");
                    this.finds.push(data);
                }
            }
        },

        cancelUpdate: function () {
            this.render();
        },
        render: function () {

            this.$el.html(cityTemplate({cities: this.cities.toJSON(),
                companies : this.companies.toJSON(),
                finds : this.finds.toJSON()
            }));
        }
    });
});

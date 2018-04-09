
define(['text!components/wseducationconfirm/wseducationConfirmTemplate.html'], function (template) {
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
            city.set({wsEducation: value});
            city.save();
            this.render();

        },
        render: function () {
            for(var i = 0;i<this.cities.length;i++){

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

            this.$el.html(cityTemplate({cities: this.cities.toJSON()}));
        }
    });
});

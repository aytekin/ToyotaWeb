define(['text!components/wseducationconfirm/wseducationConfirmTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({
        idAttribute: 'epermitId'
    });

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

            this.newModel = new CityCollection();
            this.listenTo(this.cities,"reset add change remove",this.render);

        },
        events: {
            'click .confirmEntryPermit':'confirmEntryPermit'
        },
        confirmEntryPermit: function (e) {
            var value = 0;
            var id = $(e.currentTarget).data("id");
            var city = this.cities.findWhere({epermitId: id});
            city.set({wsEducation:value});
            city.save();
        },
        render: function () {
            editModel(this.cities,this.newModel);
            editDate(this.newModel);
            this.$el.html(cityTemplate({cities: this.newModel.toJSON()}));
        }
    });
    function editModel(editModel,newModel) {
        for(var i=0;i<editModel.length;i++)
        {
            if(editModel.models[i].get("wsEducation")==1)
            {
                newModel.push(editModel.models[i]);
            }
        }
        for(var i=0;i<newModel.length;i++)
        {
            if(newModel.models[i].get("wsEducation")!=1)
            {
                newModel.remove(newModel.models[i]);
            }
        }
    }
    function editDate(model) {
        for(var i = 0;i<model.length;i++){
            var exdate = new Date(model.models[i].get("exitDate")).toISOString();
            exdate = exdate.substr(0,10);
            var endate = new Date(model.models[i].get("entryDate")).toISOString();
            endate = endate.substr(0,10);
            model.models[i].set({exitDate:exdate});
            model.models[i].set({entryDate:endate});
        }
    }


});

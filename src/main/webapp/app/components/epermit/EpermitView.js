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
            'submit #cityForm': 'saveCity'
        },
        saveCity: function (e) {
            e.preventDefault();
            var companyId = 0;
            var wsConfirm = $("input:radio[name=wsConfirm]:checked").val();
            var wsConfirms=0;
            if(wsConfirm=="Evet")
                wsConfirms=1;

            var PlaceName = $("#entryPlaces").val();
            var places = "";
            var CompanyName =$("#entryCompany").val();
            var RfentryName =$("#rfentryName").val();
            var rfEntrys = "";
            var PersonalName = $("#accompanyPersonal").val();

            for(var i = 0 ; i<(this.places.length);i++)
            {

                for(var j = 0;j < PlaceName.length;j++)
                {
                    if(this.places.models[i].get("placeName") == PlaceName[j]){
                        places  += PlaceName[j]+" , ";
                    }
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
                for(var j = 0;j < RfentryName.length;j++)
                {
                    if(this.rfentry.models[i].get("rfentryName")==RfentryName)
                    {
                        rfEntrys+=RfentryName[j]+" , ";
                    }
                }

            }
            rfEntrys=rfEntrys.substring(0,rfEntrys.length-3);
            places=places.substring(0,places.length-3);

            var names = $("#epermit_names").val()+"\n";
            var epermit = [];
            var kontrol = 0;
            var index=0;
            for(var i = 0; i < names.length;i++){

                if(names[i] == "\n")
                {
                    epermit [index]= names.substring(kontrol,i);
                    index++;
                    kontrol=i+1;
                }
            }
            for(var i=0;i<epermit.length;i++)
            {
                var city = new CityModel({
                    epermit_names:epermit[i],
                    entryDate:$("#entryDate").val(),
                    exitDate:$("#exitDate").val(),
                    entryCompany:companyId,
                    reasonfentry:rfEntrys,
                    accompanyPersonal:PersonalName,
                    entryPlaces :places,
                    exitTime:$("#exitTime").val()+":00",
                    enterTime:$("#enterTime").val()+":00",
                    wsEducation:wsConfirms
                });
                this.cities.create(city, {wait: true});
            }

            alert("Kayıt Basarılı");
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

define(['text!components/accsesCheck/AccsesCheckTemplate.html'], function (template) {
    days(template);
    var cityTemplate = Handlebars.compile(template);
    var CityModel = Backbone.Model.extend({});
    var SaveAllowModel = Backbone.Model.extend({});
    var CompanyModel =Backbone.Model.extend({});;
    var CityCollection = Backbone.Collection.extend({
        url: "/api/epermit",
        model: CityModel
    });
    var SaveAllowCollection = Backbone.Collection.extend({
        url:"/api/saveAllow",
        model : SaveAllowModel
    })
    var CompanyCollection = Backbone.Collection.extend({
        url: "/api/company",
        model: CompanyModel
    });
    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.saveAllowes = new SaveAllowCollection();
            this.listenTo(this.saveAllowes,"reset and change remove",this.render);

            this.companies = new CompanyCollection();
            this.listenTo(this.companies, "reset add change remove", this.render);
            this.companies.fetch({reset: true});

            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});

            this.searchData = new CityCollection();
            this.listenTo(this.searchData,"reset and remove",this.render);
            this.searchData.fetch({reset: true});

            //degisiklik yapilan satirlarin idlerini burada tuttuk
            this.changeRowId = [];
            //degisiklik yapilan satirlarin saat dilimlerini burada tuttuk
            this.changeRowEnterTime = [];
            this.changeRowExitTime = [];
            this.changeValue =0;
            /*
              Bu sekilde yapmamızın amacı o satırlardaki verilerin kaydet butonuna bastıgımız zaman hangilerinin olup
              olmadıgını ogrenibilmek icindi
            */
        },
        events: {
            'submit #cityForm': 'saveAllow',
            'click .editCity': 'openEditMode',
            'click .cancel': 'cancelUpdate',
            "change #entryPlaceId": "searchRecord",
            'change .editId':"idFind"
        },
        idFind:function (e) {
            var row = $(e.currentTarget).closest("tr");
            var id = $(e.currentTarget).data("id");
            if(id=='a')
            {
                this.changeRowExitTime[this.changeValue] = row.find("input").val();
                this.changeValue++;
            }
            else
            {
                this.changeRowId[this.changeValue]= id;
                this.changeRowEnterTime[this.changeValue]= row.find("input").val();
            }
        },
        saveAllow:function (e) {
            var date = formatDate(Date.now());
            console.log(date);
            for(var i=0;i<this.changeValue;i++)
            {
                console.log(this.changeRowEnterTime[i]);
                var save = new SaveAllowModel({
                    epermitId:this.changeRowId[i],
                    saveEntryTime:this.changeRowEnterTime[i]+":00",
                    saveExitTime:this.changeRowExitTime[i]+":00",
                    saveDate:date
                });
                this.saveAllowes.create(save, {wait: true});
            }
            alert("tamam");
        },
        searchRecord: function (e) {
            //select listte bir değişme olduysa
            var value = e.currentTarget.value;
            //modelimizin arama verilerinden once icini temizliyoruz
            this.searchData.reset();
            //select listte bir değişme olduysa
            if(value!= ""){
                //Gelen firmanın idsini bulduk ve epermit modelimiz uzerinde eslesen ifadeleri bu sayede bulacagız
                //firma ismi seçilmiş ise işlemler gerçekleştirilecek
                //gelen value ile firma ismi karşılaştırılıp ona göre bilgiler çekilecek
                for(var i = 0 ; i<this.cities.length;i++)
                {
                    if(this.cities.models[i].get("wsEducation")==0)
                    {

                    }
                    if(value==this.cities.models[i].get("entryCompany").companyName.toString())
                    {11
                        //firma ismi ile ilgili kosul saglanırsa verilerimizi hazırlıyoruz
                        var data = [{
                            entryCompany:this.cities.models[i].get("entryCompany"),
                            epermit_names:this.cities.models[i].get("epermit_names"),
                            exitTime:this.cities.models[i].get("exitTime"),
                            enterTime:this.cities.models[i].get("enterTime"),
                            wsEducation:this.cities.models[i].get("wsEducation")
                        }];
                        //modelimize ekliyoruz
                        this.searchData.push(data);
                    }
                }
                //yeni bir model ile olabilir...
            }
            //document.getElementById("searchTable").className="wsEducation";
            //modelimiz uzerindeki degisikligin ekranda gorulmesini icin render yapıyoruz
            this.render();
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
            this.$el.html(cityTemplate({searchData:this.searchData.toJSON(),
                                        companies : this.companies.toJSON()}));
        }
    });
    function days(template) {
        var date = Date.now();
        formatDate(date);
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
});

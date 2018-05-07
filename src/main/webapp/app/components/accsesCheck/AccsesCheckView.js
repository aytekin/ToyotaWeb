var temp="";
Handlebars.registerHelper("if", function (date) {
    var template =
        "<table class=\"table table-hover table-light mt-2 text-center\">\n" +
        "\n" +
        "<thead class=\"thead-light\">"+
        "<tr>\n" +
        "<th scope=\"col\">Giriş Yapacak Kişiler</th>\n" +
        "<th scope=\"col\" id =\"day0\">"+formatDateTree(date,0)+"</th>\n" +
        "<th scope=\"col\" id=\"day1\">"+formatDateTree(date,1)+"</th>\n" +
        "<th scope=\"col\" id=\"day2\">"+formatDateTree(date,2)+"</th>\n" +
        "<th scope=\"col\" id=\"day3\">"+formatDateTree(date,3)+"</th>\n" +
        "<th scope=\"col\" id=\"day4\">"+formatDateTree(date,4)+"</th>\n" +
        "<th scope=\"col\" id=\"day5\">"+formatDateTree(date,5)+"</th>\n" +
        "<th scope=\"col\" id=\"day6\">"+formatDateTree(date,6)+"</th>\n" +
        "</tr>";

    var control=date ;
    if(control==temp)
    {
        return null;
    }
    temp=date;

    return new Handlebars.SafeString(
        template
    );
});
Handlebars.registerHelper("control", function (ws) {

    if(ws==1)
    {
        return new Handlebars.SafeString(
            "<tr class=\"ws\">"
        );
    }
    else
    {
        return new Handlebars.SafeString(
            "<tr>"
        );
    }
});

define(['text!components/accsesCheck/AccsesCheckTemplate.html'], function (template) {
    days(template);
    var cityTemplate = Handlebars.compile(template);
    var CityModel = Backbone.Model.extend({
    });
    var SaveAllowModel = Backbone.Model.extend({
        idAttribute:'saveAllowId'
    });
    var CompanyModel =Backbone.Model.extend({
    });
    var CityCollection = Backbone.Collection.extend({
        url: "/api/epermit",
        model: CityModel
    });
    var SaveAllowCollection = Backbone.Collection.extend({
        url:"/api/saveAllow",
        model : SaveAllowModel
    });
    var CompanyCollection = Backbone.Collection.extend({
        url: "/api/company",
        model: CompanyModel
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

            this.saveAllowes = new SaveAllowCollection();
            this.listenTo(this.saveAllowes,"reset and change remove",this.render);
            this.saveAllowes.fetch({reset:true});

            this.companies = new CompanyCollection();
            this.listenTo(this.companies, "reset add change remove", this.render);
            this.companies.fetch({reset: true});

            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});

            this.searchData = new CityCollection();
            this.listenTo(this.searchData,"reset and remove",this.render);

            this.control = 0;

        },
        events: {
            'submit #cityForm': 'saveAllow',
            'click .editCity': 'openEditMode',
            'click .cancel': 'cancelUpdate',
            "change #entryPlaceId": "searchRecord",
            'change .enterId':"enterId",
            'change .exitId':"exitId"
        },

        exitId:function (e) {
            var idName = $(e.currentTarget).attr("id");
            var findDate = idName.substring(idName.length-1,idName.length);
            findDate = parseInt(findDate);
            var id = $(e.currentTarget).data("id");//epermitId
            var search = this.searchData.findWhere({epermitId:id});
            findDate = formatDate2(search.get("entryDate"),findDate);
            var exitTime =$("#"+idName).val()+":00";
            var control = 0;
            var diffDays =  differance(findDate,editDate(search.get("exitDate")));
            if(diffDays>=0)
            {
                for(var i=0;i<this.saveAllowes.length;i++)
                {
                    var epermit = this.saveAllowes.models[i].get("epermitId").epermitId;
                    var saveDates = this.saveAllowes.models[i].get("saveDate");
                    console.log(epermit+"   "+id);
                    console.log(saveDates+"   "+findDate);
                    if(epermit==id&&saveDates==findDate)
                    {
                        control++;
                        var saveId = this.saveAllowes.models[i].get("saveAllowId");
                        var saveAllow = this.saveAllowes.findWhere({saveAllowId : saveId});
                        saveAllow.set({saveExitTime: exitTime});
                        saveAllow.save();
                        console.log(this.saveAllowes.models[i].get("saveAllowId"));
                        alert("guncellendi");
                    }
                }
                if(control==0)
                    alert("Giris Saati Girilmeden Cikis Saati Güncellenemez");

            }
            else
                alert("Bu Tarihe Giriş Formu Kaydı Olusturulmamıstır");

        },
        enterId:function (e) {
            var id = $(e.currentTarget).data("id");//epermitId
            var idName = $(e.currentTarget).attr("id");
            var enterTime = $("#"+idName).val()+":00";
            var findDate = idName.substring(idName.length-1,idName.length);
            findDate = parseInt(findDate);
            var search = this.cities.findWhere({epermitId:id});
            findDate = formatDate2(search.get("entryDate"),findDate);
            var ay = this.searchData.findWhere({epermitId:id});
            var company = ay.get("entryCompany").companyId;
            var exitDate = ay.get("exitDate");
            var diffDays =  differance(findDate,editDate(search.get("exitDate")));
            if(diffDays>=0)
            {
                if(ay.get("enterTime")+":00" != enterTime)
                {
                    alert("Girdiginiz Bilgiler Kayıtla Uyusmuyor");
                }
                var control = 0;
                for(var i=0;i<this.saveAllowes.length;i++)
                {
                    var epermit = this.saveAllowes.models[i].get("epermitId").epermitId;
                    var saveDates = this.saveAllowes.models[i].get("saveDate");
                    if(epermit==id&&saveDates==findDate)
                    {
                        control++;
                        var saveId = this.saveAllowes.models[i].get("saveAllowId");
                        var saveAllow = this.saveAllowes.findWhere({saveAllowId : saveId});
                        saveAllow.set({saveEntryTime: enterTime});
                        saveAllow.save();
                        console.log(this.saveAllowes.models[i].get("saveAllowId"));
                        alert("guncellendi");
                    }
                }
                if(control==0)
                {
                    var save = new SaveAllowModel({
                        epermitId:id,
                        saveEntryTime:enterTime,
                        saveExitTime:null,
                        saveDate:findDate,
                        saveCompany:company,
                        saveExitDate:exitDate
                    });
                    this.saveAllowes.create(save, {wait: true});
                    alert("kaydedildi");
                }
            }
            else
                alert("Bu Tarihe Giriş Formu Kaydı Olusturulmamıstır");



        },
        saveAllow:function (e) {

        },
        searchRecord: function (e) {
            temp="";
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
                    if(value==this.cities.models[i].get("entryCompany").companyName.toString())
                    {
                        //firma ismi ile ilgili kosul saglanırsa verilerimizi hazırlıyoruz
                        var data = [{
                            epermitId:this.cities.models[i].get("epermitId"),
                            entryCompany:this.cities.models[i].get("entryCompany"),
                            epermit_names:this.cities.models[i].get("epermit_names"),
                            exitTime:this.cities.models[i].get("exitTime").substring(0,5),
                            enterTime:this.cities.models[i].get("enterTime").substring(0,5),
                            wsEducation:this.cities.models[i].get("wsEducation"),
                            entryDate:editDate(this.cities.models[i].get("entryDate")),
                            exitDate:editDate(this.cities.models[i].get("exitDate"))
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
            var model = this.loginModel.models[0].get("userRole");
            if(model!=null)
            {
                var roles = model[0].authority;
            }
            if(roles=="ROLE_ADMIN"||roles=="ROLE_SECURITY_OFFICER")
            {
                this.$el.html(cityTemplate({searchData: this.searchData.toJSON(),
                            companies : this.companies.toJSON()}));
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
    function days(template) {
        var date = Date.now();
        formatDate(date);
    }
    function editDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
});
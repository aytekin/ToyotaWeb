
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

define(['text!components/accsesCheck/AccsesCheckTemplate.html'], function (template) {
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

            this.companies = new CompanyCollection();
            this.listenTo(this.companies, "reset add change remove", this.render);
            this.companies.fetch({reset: true});

            this.cities = new CityCollection();
            this.listenTo(this.cities, "reset add change remove", this.render);
            this.cities.fetch({reset: true});

        },
        events: {

            'click .editCity': 'openEditMode',
            'click .cancel': 'cancelUpdate',
            "change #entryPlaceId": "searchRecord"

        },
        searchRecord: function (e) {
            //select listte bir değişme olduysa
            if(e.currentTarget.value != ""){
                //firma ismi seçilmiş ise işlemler gerçekleştirilecek
                //gelen value ile firma ismi karşılaştırılıp ona göre bilgiler çekilecek
                //yeni bir model ile olabilir...
                alert(e.currentTarget.value);
            }

            //bu fonksiyon elementleri saklıyor .show() ise gösteriyor
            this.$el.find(".normalModeElement").hide();



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
            this.$el.html(cityTemplate({cities: this.cities.toJSON(),companies : this.companies.toJSON()}));
        }
    });
});

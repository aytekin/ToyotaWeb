
define(['text!components/userRegister/UserRegisterTemplate.html'], function (template) {
    var cityTemplate = Handlebars.compile(template);

    var CityModel = Backbone.Model.extend({});

    var CityCollection = Backbone.Collection.extend({
        url: "/api/user",
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
            'submit #registForm': 'registForm',
            'on #userNickname':'control'

        },
        control:function (e) {
            $("#userName").on("all", function() {
                alert("asda");
            });
        },
        registForm: function (e) {



                var counter = 0;
                var x = $("#userNickname").val();
                for(var i = 0; i < this.cities.length;i++){
                    if(this.cities.models[i].get("userNickname") == x)
                        counter++;
                }
                if(counter != 0){
                    alert("Girdiğiniz Kullanıcı Adı Zaten Kullanılmaktadır")
                }
                else{
                    e.preventDefault();
                var city = new CityModel({
                    userName: $("#userName").val(),
                    userPassword: $("#password").val(),
                    userNickname: $("#userNickname").val(),
                    userEmail: $('#userEmail').val()

                });
                    this.cities.create(city, {wait: true});
                    alert("Kayıt Başarılı.");
                 }



                this.render();

        },
        render: function() {
            this.$el.html(cityTemplate({cities: this.cities.toJSON()}));
        }
    });
});

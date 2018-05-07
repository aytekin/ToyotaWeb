define(['text!components/accountConfirmation/AccountConfirmationTemplate.html'], function (template) {
    var userTemplate = Handlebars.compile(template);
    var UserModel = Backbone.Model.extend({
        idAttribute: 'id'

    });
    var UserCollection = Backbone.Collection.extend({
        url: "/api/user",
        model: UserModel
    });

    return Backbone.View.extend({
        el: "#content",
        initialize: function () {
            this.users = new UserCollection();
            this.listenTo(this.users, "reset add change remove", this.render);
            this.users.fetch({reset: true});

            this.userStatus = new UserCollection();
            this.listenTo(this.userStatus, "reset add change remove", this.render);

        },
        events: {

            'click .confirm': 'confirm'
        },
        confirm: function(e){
            var row = $(e.currentTarget).closest("tr");
            var status = row.find("#status").is(':checked');//user status durumunu aldık
            var userRole = row.find("#authority").val();//user status durumunu aldık

            var id = $(e.currentTarget).data("id");//Tabloda secili kullanıcının idsi
            var user = this.users.findWhere({id: id});//fetch edilen modelimizden ıd si eslesen kullanıcı bulduk
            if(status==true)
            {
                user.set({userStatus:1});//user status durumunu 1 olarak set ettik
                user.save();//guncelledik
            }
            if(userRole!=null)
            {
                user.set({roleNames:[userRole]});//user rolunu set ettik **!modelimizde liste şeklinde tanımlı oldugundan bu şekilde verdik!**
                user.save();
            }
        },
        render: function () {
            editModel(this.users,this.userStatus);//modelimizi duzenlemek icin fonksiyona modelleri verdik
            this.$el.html(userTemplate({users: this.userStatus.toJSON()}));
        }
    });
    function editModel(model,userStatus) {
        for(var i = 0 ; i<model.length;i++)
        {
            if(model.models[i].get("userStatus")==0)//model icerisinde userStatus durumu 0 olan kullanıcıları yeni modelemize ekledik
            {
                userStatus.push(model.models[i]);
            }
            if(model.models[i].get("userStatus")==1)//model icerisinde userStatus durumu 1 olan kullanıcıları yeni modelemizde guncellendikten sonra sildik
            {
                userStatus.remove(model.models[i]);
            }
        }
    }
});

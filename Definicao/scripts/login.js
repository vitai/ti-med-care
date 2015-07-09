(function (global) {
var LoginModel,
  app = global.app = global.app || {};
    
   var retornoSantaCasa = [{STATUS:"OK",UNIDADES:[
                { UNIDADEID:1, URL:"http://santacasadecampos.dyndns.org:8080/sits/", DESCRICAO:"UPA - SANTA CASA", CODIGO:1 }]}];  
    var retornoErro = [{STATUS:"ERRO"}];
    
LoginModel = kendo.data.ObservableObject.extend({
    username:"",
    password:"",
    dataSource: new kendo.data.DataSource({
        transport: {
            read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
        },
        schema: {
                parse: function (response) {  
                    
                    if (response[0].STATUS == "OK"){
                        app.Login(response[0]);
                        return response;
                       }                
                        else
                       {
                            navigator.notification.alert("Este usuário não existe.");
                            return response;   

                        }               
                  }
               }
            }),
       submitt: function() { 
           
          if (!this.username) {
              navigator.notification.alert("Usuário é necessário.");
              return;
          }    
          if (!this.password) {
              navigator.notification.alert("Senha é necessário.");
              return;
          }
           
           var dataTemp = retornoErro;
           if (this.username == "teste" && this.password == "teste123")
           {
               dataTemp =  retornoSantaCasa;
               app.application.navigate('views/Menu.html');   
              
           }
          
          this.dataSource.read({ data: dataTemp });
           
      },onBeforeShowView:function(e){
          
           this.set("username", "");
           this.set("password", "");  
      }

});
     app.LoginService = {
        viewModel: new LoginModel()
    };

    
})(window);


(function (global) {
var LoginModel,
  app = global.app = global.app || {};
    
   var Unidades = [{STATUS:"OK",LOGO:"santacasa",UNIDADES:[
                 { UNIDADEID:1, URL:"http://santacasadecampos.dyndns.org:8080/sits/", DESCRICAO:"SANTA CASA CAMPOS", CODIGO:1,
                 MENU:[{LINKTO:"views/Agendamento/agendamentos.html", TITULO:"Agendamento", OBSERVACAO:"Oferta e utilização de recursos da unidade"},
                   {LINKTO:"views/Internacao/internacao.html", TITULO:"Internação", OBSERVACAO:"Ocupação e estatística de internação"},
                   {LINKTO:"views/Faturamento/FaturamentoParticularView.html", TITULO:"Faturamento", OBSERVACAO:"Produção e Valores de Faturamento"}] },
/*               { UNIDADEID:2, URL:"http://177.153.18.165:8081/heetshl/", DESCRICAO:"HOSPITAL DE TRAUMA", CODIGO:2, 
                   MENU:[{LINKTO:"views/Agendamento/agendamentos.html", TITULO:"Agendamento", OBSERVACAO:"Oferta e utilização de recursos da unidade"},
                   {LINKTO:"views/Internacao/internacao.html", TITULO:"Internação", OBSERVACAO:"Ocupação e estatística de internação"},
                   {LINKTO:"views/emergencia.html", TITULO:"Emergência", OBSERVACAO:"Filas de esperas de emergência"}] }*/]
}];  

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
           if (this.username == ("Teste") || ("teste") && this.password == ("teste123") || ("Teste123"))
           {
               dataTemp =  Unidades;
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


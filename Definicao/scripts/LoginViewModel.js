(function (global) {
var LoginModel,
  app = global.app = global.app || {};
    
var santacasa = [{STATUS:"OK",UNIDADES:[
      { UNIDADEID:1,LOGO:"santacasa",URL:"http://santacasadecampos.dyndns.org:8080/sits/", DESCRICAO:"SANTA CASA CAMPOS", CODIGO:1,
          MENU:[
  {LINKTO:"views/Internacao/InternacaoView.html", TITULO:"Internação", OBSERVACAO:"Ocupação e estatística de internação"},
  {LINKTO:"views/Faturamento/FaturamentoParticularView.html", TITULO:"Faturamento", OBSERVACAO:"Produção e Valores de Faturamento"},
  {LINKTO:"views/CentroCirurgico/SalaCirurgicasView.html", TITULO:"Centro Cirurgico", OBSERVACAO:"Centro Cirurgico"}
          ]}]
}];  
    
 var RioSaude = [{STATUS:"OK", UNIDADES:[
                { UNIDADEID:1, LOGO: "logo-riosaudedefasacivil", URL:"http://177.124.207.146:8080/sits", DESCRICAO:"CER-BARRA", CODIGO:1,MENU:[
                   {LINKTO:"views/Emergencia/EmergenciaView.html", TITULO:"Emergência", OBSERVACAO:"Emergência Hospitalar"
                   }]},
                { UNIDADEID:2, LOGO: "logo-riosaudedefasacivil", URL:"http://177.153.18.165:8095/sits", DESCRICAO:"UPA-SENADOR CAMARA", CODIGO:1,MENU:[
                   {LINKTO:"views/Emergencia/EmergenciaView.html", TITULO:"Emergência", OBSERVACAO:"Emergência Hospitalar"
                   }]},
                { UNIDADEID:3,LOGO: "logo-riosaudedefasacivil", URL:"http://177.153.18.165:8096/sits", DESCRICAO:"UPA-ROCHA MIRANDA", CODIGO:1,MENU:[
                   {LINKTO:"views/Emergencia/EmergenciaView.html", TITULO:"Emergência", OBSERVACAO:"Emergência Hospitalar"
                   }]}]
              }];

    
   var ABBC = [{STATUS:"OK", UNIDADES:[
                { UNIDADEID:1,LOGO: "logo-abbc", URL:"http://upasantarita.dyndns.info:8080/santarita", DESCRICAO:"UPA-SANTA RITA", CODIGO:1,MENU:[
                   {LINKTO:"views/Emergencia/EmergenciaView.html", TITULO:"Emergência", OBSERVACAO:"Emergência Hospitalar"
                   }]},
                { UNIDADEID:2,LOGO: "logo-abbc", URL:"http://upaguarabira.no-ip.org:8080/sits", DESCRICAO:"UPA-GUARABIRA", CODIGO:1,MENU:[
                   {LINKTO:"views/Emergencia/EmergenciaView.html", TITULO:"Emergência", OBSERVACAO:"Emergência Hospitalar"
                   }]},
                { UNIDADEID:3,LOGO: "logo-abbc", URL:"http://179.188.2.93:8080/sits", DESCRICAO:"UPA-BRANGANÇA", CODIGO:1,MENU:[
                   {LINKTO:"views/Emergencia/EmergenciaView.html", TITULO:"Emergência", OBSERVACAO:"Emergência Hospitalar"
                   }]}]          
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
           
       if (this.username == "santacasa"  && this.password == "sc123")
           {
               dataTemp =  santacasa;
               app.application.navigate('views/MenuView.html');   
           }
           
      if(this.username == "riosaude" && this.password == "rs123"){
                           
               dataTemp =  RioSaude;
               app.application.navigate('views/MenuView.html');     
            }
           
       if(this.username == ("ABBC")  && this.password == "abbc123")
           {
                           
               dataTemp =  ABBC;
               app.application.navigate('views/MenuView.html');     
               
           }
          
          this.dataSource.read({ data: dataTemp });
           
      },onBeforeShowView:function(e){
          
           this.set("username", "");
           this.set("password", ""); 
            app.Logoff();  
      }

});
     app.LoginService = {
        viewModel: new LoginModel()
    };

    
})(window);


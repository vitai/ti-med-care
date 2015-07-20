(function (global) {
  var sumarioViewModel,  
   app =  global.app || {};

    app.unidadeUrl = "http://177.153.18.165:8081/heetshl";
    
    sumarioViewModel = kendo.data.ObservableObject.extend({
        paciente:null ,
        boletim:null ,
        noDiagnosticoRecord: true,
        noAlergiaRecord:true,
        dataSource: new kendo.data.DataSource({
            transport:
               { 
                   read: 
                   { 
                       dataType: "json",
                       url: app.unidadeUrl + "/ws/relatorio",
                       data: function() {
                           var param = {
                               "q":27,
                               "id": 849838

                           };
                         return param;
                       } 
                   }
               },
               schema: {
            	   parse: function (response) {
            		   
                       if (response && response.length > 0)
                       {
                    	   var item = response[0];
                    	   app.sumarioService.viewModel.set("paciente", 
                    			   new Paciente(1, item.NMCIDADAO , item.SEXO, item.IDADE));
                    	   app.sumarioService.viewModel.set("boletim", 
                    			   new BoletimAtendimento(item.BOE_ID, item.BOE_DATAENTRADA, item.BOE_DATA_PRIMEIRA_INTERNACAO, item.LEI_DESCRICAO, item.NMSECAO));
                    	   
                       }
            		   return response;
                   }
               }               
             	
          }),
          dataSourceDiagnostico: new kendo.data.DataSource({
              transport:
                 { 
                     read: 
                     { 
                         dataType: "json",
                         url: app.unidadeUrl + "/ws/relatorio",
                         data: function() {
                             var param = {
                                 "q":28,
                                 "id": 849838

                             };
                           return param;
                         } 
                     }
                 },
                 schema: {
              	   parse: function (response) {
              		   
                       if (response && response.length > 0)
                       {
                    	   app.sumarioService.viewModel.set("noAlergiaRecord", false);
                       }
                       else
                    	   {
                    	   	app.sumarioService.viewModel.set("noAlergiaRecord", true);
                    	   }
              		   return eval(response);
                     }
                 }               
               	
            }),
            dataSourceAlergia: new kendo.data.DataSource({
                transport:
                   { 
                       read: 
                       { 
                           dataType: "json",
                           url: app.unidadeUrl + "/ws/relatorio",
                           data: function() {
                               var param = {
                                   "q":29,
                                   "idCidadao": 915172

                               };
                             return param;
                           } 
                       }
                   },
                   schema: {
                	   parse: function (response) {
                		   
                         if (response && response.length > 0)
                         {
                      	   app.sumarioService.viewModel.set("noDiagnosticoRecord", false);
                         }
                         else
                      	   {
                      	   	app.sumarioService.viewModel.set("noDiagnosticoRecord", true);
                      	   }
                		   return eval(response);
                       }
                   }               
                 	
              }),
              dataSourceMedicamento: new kendo.data.DataSource({
                  transport:
                     { 
                         read: 
                         { 
                             dataType: "json",
                             url: app.unidadeUrl + "/ws/relatorio",
                             data: function() {
                                 var param = {
                                     "q":30,
                                     "boeId": 849838

                                 };
                               return param;
                             } 
                         }
                     },
                     schema: {
                  	   parse: function (response) {
                           /*if (response && response.length > 0)
                           {
                        	   app.sumarioService.viewModel.set("noDiagnosticoRecord", false);
                           }
                           else
                        	   {
                        	   	app.sumarioService.viewModel.set("noDiagnosticoRecord", true);
                        	   }*/
                  		   return response;
                         }
                     }               
                   	
                }),
                dataSourceEventos: new kendo.data.DataSource({
                    transport:
                       { 
                           read: 
                           { 
                               dataType: "json",
                               url: app.unidadeUrl + "/ws/relatorio",
                               data: function() {
                                   var param = {
                                       "q":31,
                                       "boeId": 849838

                                   };
                                 return param;
                               } 
                           }
                       },
                       schema: {
                    	   parse: function (response) {
                    		   console.log(response);
                             /*if (response && response.length > 0)
                             {
                          	   app.sumarioService.viewModel.set("noDiagnosticoRecord", false);
                             }
                             else
                          	   {
                          	   	app.sumarioService.viewModel.set("noDiagnosticoRecord", true);
                          	   }*/
                    		   return response;
                           }
                       }
                       
                     	
                  }),
                  onListDataboud: function (e)
                  {
                	  var dataView = e.sender.dataSource.view();
                	  var groups = $(".nurse48"); 
                	  for (var i = 0; i < groups.length; i++) {
                		  var cssClass = dataView[i].CLASS
                		  console.log(cssClass);
                		  $(groups[i]).removeClass("nurse48");
                		  $(groups[i]).addClass(cssClass);
                	  }
                	  
                  }
    });
    
    app.sumarioService = 
    {
        viewModel : new sumarioViewModel()
    };
     

     
        
})(window);
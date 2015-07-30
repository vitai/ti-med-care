(function (global) {
  var sumarioViewModel,  
   app =  global.app = global.app || {};

  //  app.unidadeUrl = "http://177.153.18.165:8081/heetshl/";
    
    sumarioViewModel = kendo.data.ObservableObject.extend({
        paciente:null ,
        boletim:null ,
        boeId:0,
        idCidadao:0,
        noDiagnosticoRecord: true,
        noAlergiaRecord:true,
        noMedicamentoRecord:true,
        onViewShow: function(e)
        {      
            var that = this;
            that.set("boeId", e.view.params.boeId);
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.dataSourceDiagnostico.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.dataSourceAlergia.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.dataSourceMedicamento.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.dataSourceEventos.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.refresh();   
            
        },   
        refresh: function()
        {
            this.dataSource.read();
            this.dataSourceDiagnostico.read();
            this.dataSourceMedicamento.read();
            this.dataSourceEventos.read();
        },
        dataSource: new kendo.data.DataSource({
            transport:
               { 
                   read: 
                   { 
                       dataType: "json",
                       url: app.unidadeUrl + "ws/relatorio",
                       data: function() {
                           var param = {
                               "q":27,
                               "id": app.sumarioService.viewModel.boeId

                           };
                           console.log(param);
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
                    			   new Paciente(item.IDCIDADAO, item.NMCIDADAO , item.SEXO, item.IDADE));
                    	   app.sumarioService.viewModel.set("boletim", 
                    			   new BoletimAtendimento(item.BOE_ID, item.BOE_DATAENTRADA, item.BOE_DATA_PRIMEIRA_INTERNACAO, item.LEI_DESCRICAO, item.NMSECAO));
                           app.sumarioService.viewModel.dataSourceAlergia.read();
                    	   
                       }
            		   return response;
                       console.log(response);     
                   }
               }               
             	
          }),
          dataSourceDiagnostico: new kendo.data.DataSource({
              transport:
                 { 
                     read: 
                     { 
                         dataType: "json",
                         url: app.unidadeUrl + "ws/relatorio",
                         data: function() {
                             var param = {
                                 "q":28,
                                 "id": app.sumarioService.viewModel.boeId

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
                         console.log(response);    
                     }
                 }               
               	
            }),
            dataSourceAlergia: new kendo.data.DataSource({
                transport:
                   { 
                       read: 
                       { 
                           dataType: "json",
                           url: app.unidadeUrl + "ws/relatorio",
                           data: function() {
                               var param = {
                                   "q":29,
                                   "idCidadao": app.sumarioService.viewModel.paciente.id

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
                           console.log(response);   
                       }
                   }               
                 	
              }),
              dataSourceMedicamento: new kendo.data.DataSource({
                  transport:
                     { 
                         read: 
                         { 
                             dataType: "json",
                             url: app.unidadeUrl + "ws/relatorio",
                             data: function() {
                                 var param = {
                                     "q":30,
                                     "boeId": app.sumarioService.viewModel.boeId

                                 };
                               return param;
                             } 
                         }
                     },
                     schema: {
                  	   parse: function (response) {
                           if (response && response.length > 0)
                           {
                        	   app.sumarioService.viewModel.set("noMedicamentoRecord", false);
                           }
                           else
                        	   {
                        	   	app.sumarioService.viewModel.set("noMedicamentoRecord", true);
                                   
                        	   }
                  		   return response;
                             console.log(response);  
                         }
                     }               
                   	
                }),
                dataSourceEventos: new kendo.data.DataSource({
                    transport:
                       { 
                           read: 
                           { 
                               dataType: "json",
                               url: app.unidadeUrl + "ws/relatorio",
                               data: function() {
                                   var param = {
                                       "q":31,
                                       "boeId": app.sumarioService.viewModel.boeId

                                   };
                                   console.log(param);
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
                               console.log(response);
                           }
                       }
                       
                     	
                  }),
                  onListDataboud: function (e)
                  {
                	  var dataView = e.sender.dataSource.view();
                	  var groups = $(".imgDetalhe"); 
                      console.log(groups);
                      if (groups)
                	  for (var i = 0; i < groups.length; i++) {
                		  var cssClass = dataView[i].CLASS

                          var element = groups[i].parentElement;
                          if (dataView[i].LINKTO.trim() != '')
                              element = groups[i].parentElement.parentElement;
                          $(element).addClass("vt-lista-evento");
                		  $(element).addClass(cssClass);
                	  }
                	  
                  },
                onListViewEventoChanged: function(e)
                {
                    console.log(e.dataItem);
                    if (e.dataItem.LINKTO.trim() != '')
                    {
                        app.application.navigate('views/' + e.dataItem.LINKTO.trim() + '?idExame=' + e.dataItem.CHAVE);
                    }
                },
        showHelp: function(e)
        {
            
        }
        
    });
    
    app.sumarioService = 
    {
        viewModel : new sumarioViewModel()
    };
        
})(window);
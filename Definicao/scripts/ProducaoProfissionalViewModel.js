(function (global) {
    var ProducaoProfissionalViewModel,
        app = global.app = global.app || {};
   
    var controleTurno = null;
    
    ProducaoProfissionalViewModel = kendo.data.ObservableObject.extend({
        descricaoUnidade: "",
        logo:"",
        detalheTurno1:"",
        detalheTurno2:"",
        onInit:function()
        {
            
         var horaAgora = new Date().getHours();
            if (horaAgora >= 7 && horaAgora <= 19)
                {
                    controleTurno = 0;
                    this.set("detalheTurno1", "(atual)");  
                    this.set("detalheTurno2", "(anterior)");
                    
                }
            else
                {
                    controleTurno = 1;
                    this.set("detalheTurno1", "(anterior)");  
                    this.set("detalheTurno2", "(atual)");
                    
                }
            
            app.currentViewModel = this;
           var listviews = $("ul.km-listview");
			
       $("#select-period").kendoMobileButtonGroup({
           select: function(e) {
                   app.producaoProfissionalViewService.viewModel.dataSource.filter({ field: "TURNO", operator: "equals", value: e.index + 1 })
                },
                index: controleTurno
            });
        },
         
        onViewShow: function(e)
        {  
            var that = this;    
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            that.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            this.set("logo",app.usuarioSettings.LOGO);
            console.log(controleTurno, 'show');
            app.producaoProfissionalViewService.viewModel.dataSource.filter({ field: "TURNO", operator: "equals", value: controleTurno + 1 })
            that.dataSource.read(); 
        },
        dataSource: new kendo.data.DataSource({
            	//data: dadosFake,
                          transport: {
                                read:  {
                                  url: app.unidadeUrl + "ws/relatorio",
                                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                  data: function() {
                                      var dataInicial = null;
                                      console.log(controleTurno);
                                      if (controleTurno == 0)
                                          {
                                            dataInicial = app.addDays(new Date(), -1);
                                            dataInicial = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate(), 19, 0, 0);
                                               
                                          }
                                      else
                                          {
                                            if (new Date().getHours() >= 0 && new Date().getHours() < 7)
                                            {
                                                
                                            dataInicial = app.addDays(new Date(), -1);
                                            dataInicial = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate(), 7, 0, 0);

                                            }
                                            else
                                            {
                                                
                                            dataInicial = new Date();
                                            dataInicial = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate(), 7, 0, 0);
                                                
                                            }
                                          }
                                        var param = {
											"q":21,
                                            "setorId":1,
                                            "dataInicial": kendo.toString(dataInicial, "G"),
                                            "dataFinal":   kendo.toString(new Date(), "G")
                                        };
                                      console.log(param);
                                      return param;
                                    }
                                }
                           },           
                            schema: {
                                parse: function (response) {
                                    
                                    if (response)
                                    {
                                       return response;
                                    }
                                    else
                                        return [];
                                
                            }
                          }, 
             			 group: "GRUPO",
                          sortable:true,
                          sort: { field: "QUANTIDADE", dir: "desc" }
                    })
            
    });

    app.producaoProfissionalViewService = {
        viewModel: new ProducaoProfissionalViewModel()
    };
    
})(window);
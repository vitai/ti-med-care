(function (global) {
    var ProducaoProfissionalViewModel,
        app = global.app = global.app || {};
   
    //var dadosFake = [{NOME: "FULANO", QUANTIDADE: "10", TEMPOMEDIO:"15", PRESCRICOES:"8"}];
    
    //var url = "http://177.153.18.165:8081/cerbt/ws/relatorio?q=5&setorId=1&risco=AMARELO&pediatrico=N";
    ProducaoProfissionalViewModel = kendo.data.ObservableObject.extend({
        descricaoUnidade: "",
        onInit:function()
        {
            app.currentViewModel = this;
        },
         
        onViewShow: function(e)
        {
           
            var that = this;
            
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            that.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            that.dataSource.read();
            
        },
        dataSource: new kendo.data.DataSource({
            	//data: dadosFake,
                          transport: {
                                read:  {
                                  url: app.unidadeUrl + "ws/relatorio",
                                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                  data: function() {
                                        var param = {
											"q":21,
                                            "setorId":1,
                                            "dataInicial": kendo.toString(app.addDays(new Date(), -1), "G"),
                                            "dataFinal":   kendo.toString(new Date(), "G")
                                        };
                                      return param;
                                    }
                                }
                           },           
                            schema: {
                                parse: function (response) {
                                    console.log(response);
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
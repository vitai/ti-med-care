(function (global) {
    var ObservacaoViewModel,
        app = global.app = global.app || {};
   
    
    var url = "http://177.153.18.165:8081/cerbt/ws/relatorio?q=5&setorId=1&risco=AMARELO&pediatrico=N";
    ObservacaoViewModel = kendo.data.ObservableObject.extend({
        secao: "", // grupo do risco
        titulo: "",
        descricaoUnidade: "",
        logo:"",
        media:"",
        onInit:function()
        {
            app.currentViewModel = this;
        },
         
        onViewShow: function(e)
        {
           
            var that = this;
            
            that.set("secao", e.view.params.secao);
            that.set("titulo", e.view.params.nmsecao);
            this.dataSource.transport.options.read.url = app.unidadeUrl + "/ws/relatorio";
            that.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            this.set("logo",app.unidadeCorrente.LOGO);
            that.dataSource.read();
            
        },
        dataSource: new kendo.data.DataSource({
                          transport: {
                                read:  {
                                  url: app.unidadeUrl + "/ws/relatorio",
                                  dataType: "json", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                  data: function() {
                                        var param = {

                                            "q":7,
                                            "setorId":1,
                                            "idSecao": app.observacaoViewService.viewModel.secao
                                        };
                                      return param;
                                    }
                                }
                           },            
                            schema: {
                                parse: function (response) {
                                    if (response)
                                    {
                                        if (response.length > 0)
                                        	
                                        return response;
                                    }
                                    else
                                        return [];
                                
                            }
                          },
                           
                           sortable:true,
                          sort: { field: "DATEDIFF", dir: "desc" }
                    })
            
    });

    app.observacaoViewService = {
        viewModel: new ObservacaoViewModel()
    };
    
    
    
})(window);
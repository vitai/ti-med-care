(function(global){
   var detalheModel,
    app = global.app = global.app || {};

    
    detalheModel = kendo.data.ObservableObject.extend({
        paciente:"",
        entrada:"",
        onViewShow: function(e)
        {
          var that = this;
          that.set("paciente", e.view.params.paciente);
          that.set("entrada", e.view.params.entrada);
         this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
          this.refresh();
        },
        refresh: function()
        {
            this.dataSource.read();           
        },
        dataSource: new kendo.data.DataSource({
                       transport: {
                                read:  {
                                  dataType: "json",
                                  data: function() {
                                        var param = {

                                            "q":7,
                                            "idSecao": app.enfermariaservice.viewModel.secao,
                                            "setorId": 2
    
                                        };
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
                           sortable:true,
                          sort: { field: "TEMPO_ESPERA", dir: "desc" }
                    }),  
        onUpdate: function() 
        {
            this.refresh();
        }
    });

    app.detalheservice  = {
       viewModel : new detalheModel()
    }; 
  
})(window);
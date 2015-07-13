(function(global){
   var EnfermariaModel,
    app = global.app || {};
    
    EnfermariaModel = kendo.data.ObservableObject.extend({
        value:"",
        secao:"",
         onViewShow: function(e)
        {
           
            var that = this;
            
            that.set("secao", e.view.params.secao);
            that.set("value", e.view.params.value);
             console.log(e.view.params.value);    
             console.log(e.view.params.secao);    
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
           this.refresh();   
            
        },
        onInit:function()
        {
            app.currentViewModel = this;
           
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

    app.enfermariaservice  = {
       viewModel : new EnfermariaModel()
    }; 
  
})(window);
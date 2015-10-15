(function(global){
   var EnfermariaModel,
    app = global.app || {};
    
    EnfermariaModel = kendo.data.ObservableObject.extend({
        value:"",
        secao:"", 
        descricaoSecao:"",
        media:"",
         onViewShow: function(e)
        {
           
            var that = this;
            that.set("secao", e.view.params.secao);
            that.set("value", e.view.params.value);
            that.set("descricaoSecao", e.view.params.descricaoSecao);
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            console.log(app.unidadeUrl + "ws/relatorio");
            
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
                                  dataType: "json", timeout: 2000
                                      }
                                 },
                                  data: function() {
                                        var param = {
                                            "q":7,
                                            "idSecao": app.enfermariaservice.viewModel.secao,
                                            "setorId": app.unidadeCorrente.CODIGO
    
                                        };
                                      console.log(param);
                                      return param;
                                    },        
                          schema: {
                                parse: function (response) {
                                    if (response)
                                    {
                                        if (response.length > 0)
                                       	app.enfermariaservice.viewModel.set("media", response[0].MEDIA);
                                        return response;
                                    }
                                    else
                                        return [];
                                
                            }
                          },
                                  
                           sortable:true,
                          sort: { field: "DATEDIFF", dir: "desc" }
                   
                    }),
        onUpdate: function() 
        {
         
           this.refresh();
        },
        showHelp: function(e)
        {
            
        }
        
    });

    app.enfermariaservice  = {
       viewModel : new EnfermariaModel()
    }; 
  
})(window);
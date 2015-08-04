(function(global){
   var IndicadoresEmergenciaModel,
   app = global.app || {};

    IndicadoresEmergenciaModel = kendo.data.ObservableObject.extend({
         onInit:function()
        {
             app.currentViewModel = this; 
        },    
        refresh: function()
        {
            this.dataSource.read();
        },
        dataTextField: "text",
        dataContentField: "content",
        dataUrlField: "url",   
        dataImageUrlField: "imageUrl",
        dataSpriteCssClass: "spriteCssClass",
        dataContentUrlField: "contentUrl",  
        dataSource: new kendo.data.DataSource({
            transport: {
                read:  { 
                    dataType: "json",
                    data: function() {
                                        var param = {
                                            text: "Item 1",
                                            url: "http://www.telerik.com",
                                            content: "hello"  
                                        };
                                      console.log(param);
                                      return param;
                                    }
                                }           
            },
            sortable:true,      
        }),
        onListDataboud: function(e) {
        },
        onUpdate: function() 
        {
            this.refresh();
        },
        showHelp: function(e)
        {
            
        },
        onBeforeShowView: function(e)
         {    
            //this.dataSourceClass.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=18&setorId=" + app.unidadeCorrente.CODIGO;            
            this.refresh();
         }      
    });
    
    app.indicadoresEmergenciaService  = {
       viewModel : new IndicadoresEmergenciaModel()
    }; 
    
})(window);
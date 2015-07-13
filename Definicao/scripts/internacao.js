(function(global){
   var InternaModel,
    app = global.app || {};

    InternaModel = kendo.data.ObservableObject.extend({
        onBeforeShowView: function(e)
        {
            this.dataSourceLeito.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=19&setorId=2";   
            console.log(app.unidadeUrl);   
            this.refresh();
        },
         onInit:function()
        {
            app.currentViewModel = this;
           
        },
        refresh: function()
        {
             this.dataSourceLeito.read();
        },
        dataSourceLeito: new kendo.data.DataSource({
            transport:
            { 
                read: 
                { 
                    dataType: "json" 
                }
            },
          
            sortable:true,
            sort: { field: "DESCRICAO", dir: "asc" }
             }), 
        onUpdate: function() 
        {
            this.refresh();
        }
        
    });

    app.internaservice  = {
       viewModel : new InternaModel()
    }; 
  
})(window);
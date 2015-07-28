(function(global){
   var AgendaModel,
    app = global.app = global.app || {};
    

       AgendaModel = kendo.data.ObservableObject.extend({
         painel:[],
          onBeforeShowView: function(e)
        {
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=22";   
            this.dataSourceFaltas.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=22";   
            console.log(app.unidadeUrl);   
            this.refresh();
        },
        onInit:function()
        {
          
         app.currentViewModel = this;
            
        },dataSource: new kendo.data.DataSource({
         transport:
            { 
                read: 
                { 
                    dataType: "json" 
                }
            },
            filter: {
             logic: "or",
             filters : [
                { field: "DESCRICAO", operator: "eq", value: "AGENDADOS"},
                { field: "DESCRICAO", operator: "eq", value: "DISPONÍVEIS"},
                { field: "DESCRICAO", operator: "eq", value: "TOTAL OFERTADO"}
            
            ]},
          sortable:true,
            }),       
                 schema: {
                  parse: function (response) {
                                    console.log(response)
                           if (response)
                                    {
                                        return response;
                                    }
                          }
        },dataSourceFaltas: new kendo.data.DataSource({
         transport:
            { 
                read: 
                { 
                    dataType: "json" 
                }
            },
             filter: {
             logic: "or",
             filters: [
                { field: "DESCRICAO", operator: "equals", value: "FALTAS"},
                { field: "DESCRICAO", operator: "equals", value: "REALIZADOS"}
            ]},
          sortable:true,
            }),       
                 schema: {
                  parse: function (response) {
                                    console.log(response)
                           if (response)
                                    {
                                        return response;
                                    }
                          }
        },
        onUpdate: function() 
        {   
            var that = this;
            this.refresh();
        },
          refresh: function()
        {
             this.dataSource.read();
             this.dataSourceFaltas.read();
        },
        showHelp: function(e)
        {
            
        }
   });
    
  app.agendaservice  = {
       viewModel : new AgendaModel()
    }; 
  
})(window);
(function(global){
   var InternaModel,
    app = global.app = global.app || {};
    
     var dadoIndicadores = [{DESCRICAO:"Taxas de ocupação",QTA:100},
                    {DESCRICAO:"Taxas de óbito",QTA:100},
                     {DESCRICAO:"Índice de renovação",QTA:100},
                      {DESCRICAO:"Leito Dia",QTA:100},
                      {DESCRICAO:"Paciente Dia",QTA:100}];   
    
      var Leitos = [{LEITO:"Enfermaria I",OCUPAÇÃO:3}]; 
    
    
    InternaModel = kendo.data.ObservableObject.extend({
         onViewShow: function(e)
        {  
            this.dataSource.read({ data: dadoIndicadores});
            this.dataSourceLeito.read({ data: Leitos});
        },
         onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
            this.dataSource.read({ data: dadoIndicadores});   
            this.dataSourceLeito.read({ data: Leitos});
        },
         dataSource: new kendo.data.DataSource({
                transport: {
               read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                   
                }
            }
             }), 
        dataSourceLeito: new kendo.data.DataSource({
                transport: {
               read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
            }
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
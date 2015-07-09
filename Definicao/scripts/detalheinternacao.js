(function(global){
   var detalheModel,
    app = global.app = global.app || {};
    
        var detalheinternado = [{DETALHE:"Tempo Permanência",VALOR:30},{DETALHE:"Data Entrada",VALOR:31022015},
            {DETALHE:"Previsão de Alta",VALOR:04022015}];   
    
    detalheModel = kendo.data.ObservableObject.extend({
        paciente:"",
        onViewShow: function(e)
        {
          var that = this;
          that.set("paciente", e.view.params.paciente);
          console.log(e.view.params.paciente);             
          this.dataSource.read({ data: detalheinternado});  
        },
        refresh: function()
        {
            this.dataSource.read({data : detalheinternado});           
        },
        dataSource: new kendo.data.DataSource({
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

    app.detalheservice  = {
       viewModel : new detalheModel()
    }; 
  
})(window);
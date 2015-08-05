(function(global){
   var SalaCirurgicaModel,
      app = global.app = global.app || {};
    
        var consulta = [{DESCRICAO:"SALA 1"},
                          {DESCRICAO:"SALA 2"},
                          {DESCRICAO:"SALA 3"}]; 
    
    SalaCirurgicaModel = kendo.data.ObservableObject.extend({
         onViewShow: function(e)
        {
            var that = this;
            this.dataSource.read({ data: consulta });   
            this.refresh();   
        },
        onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
              this.dataSource.read({ data: consulta });   
        },   
           dataSource: new kendo.data.DataSource({
              transport: {            
                read: function(operation){   
                var data = operation.data.data || [];
                operation.success(data);
                console.log(data);
                }
            }
        }),        
        onUpdate: function() 
        {
         
           this.refresh();
        },
        showHelp: function(e)
        {
            
        }
        
    });

    app.salacirurgicaservice  = {
       viewModel : new SalaCirurgicaModel()
    }; 
  
})(window);
(function(global){
   var AgendaCirurgiaModel,
      app = global.app = global.app || {};

    AgendaCirurgiaModel = kendo.data.ObservableObject.extend({
         sala:"",
         onViewShow: function(e)
        {
            var that = this;
            that.set("sala", e.view.params.sala);
            this.refresh();   
        },
        onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
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

    app.AgendaService  = {
       viewModel : new AgendaCirurgiaModel()
    }; 
  
})(window);
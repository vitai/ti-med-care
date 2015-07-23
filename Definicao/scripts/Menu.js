(function(global){
   var Menus,
    app = global.app = global.app || {};
    
    Menus = kendo.data.ObservableObject.extend({
        onViewShow: function(e)
        {
            this.dataSource.read({ data: app.unidadeCorrente.MENU});     
        },
        dataSource: new kendo.data.DataSource({
            transport: { 
                read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
            }            
        })   
      });
    
    app.MenuService  = {
       viewModel : new Menus()
    }; 
  
})(window);


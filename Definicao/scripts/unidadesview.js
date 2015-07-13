(function (global) {
  var unidadeModel,  
   app =  global.app = global.app || {};

      unidadeModel = kendo.data.ObservableObject.extend({
        onViewShow: function(e)
        {
            this.dataSource.read({ data: app.usuarioSettings.UNIDADES});
        },
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function(operation) {
                    var data = operation.data.data || [];
                    operation.success(data);
                }
            }            
        }),
        onListViewChanged: function(e)
        {
            app.unidadeCorrente = e.dataItem;
            app.unidadeUrl = e.dataItem.URL;
            console.log(e.dataItem.URL);
            app.application.navigate('views/Menu.html');
        }
    
      });
    
    app.unidadeservice = 
    {
        viewModel : new unidadeModel()
    };
     
        
})(window);
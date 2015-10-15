(function (global) {
  var unidadeModel,  
   app =  global.app = global.app || {};

      unidadeModel = kendo.data.ObservableObject.extend({
        onViewShow: function(e)
        {
            
            this.set("logo",app.usuarioSettings.LOGO);
            this.dataSource.read({ data: app.usuarioSettings.UNIDADES});
            var that = this;
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
            ready = null;
            //window.setTimeout(isOnline(e.dataItem.URL), 3000);
            //isOnline(e.dataItem.URL);
            this.urlExists(e.dataItem.URL, this.handleUnidade, e);
   
        },
        urlExists: function(url, callback, item) {

            if ( ! $.isFunction(callback)) {
               throw Error('Not a valid callback');
            }   
            console.log(url + 'ws/relatorio?q=1');
			try
                {
                    $.ajax({
                        dataType: "json",
                        url: url + 'ws/relatorio?q=1',
                        success: $.proxy(callback, this, true, item),
                        error: $.proxy(callback, this, false)      
                    });
                }
            catch (err)
                {
                console.log(err.message);
                }

        },
        handleUnidade: function (sucess, item)
    	{
                if (sucess == true)
                {
        		    app.unidadeCorrente = item.dataItem;
            		app.unidadeUrl = item.dataItem.URL;
                    console.log(item.dataItem.NAV_SETTINGS);
                    app.appService.viewModel.navDataSource.read({ data: item.dataItem.NAV_SETTINGS });
            		app.application.navigate('views/Emergencia/EmergenciaView.html');
                    
                }
            	else
              	 navigator.notification.alert("A unidade está offline");
    	}
           
    });   
    app.unidadeservice = 
    {
        viewModel : new unidadeModel()
    };
     
        
})(window);
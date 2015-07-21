(function (global) {
  var resultadoExameViewModel,  
   app =  global.app = global.app || {};

    app.unidadeUrl = "http://177.153.18.165:8081/heetshl/";
    
    resultadoExameViewModel = kendo.data.ObservableObject.extend({
        idExame:0,
        exame:'',
        dataResultado:'',
        onViewShow: function(e)
        {
           
            console.log(e.view.params);
            this.set("idExame", e.view.params.idExame);
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.refresh();   
            
        },   
        refresh: function()
        {
            this.dataSource.read();
            
        },
        dataSource: new kendo.data.DataSource({
            transport:
               { 
                   read: 
                   { 
                       dataType: "json",
                       data: function() {
                           var param = {
                               "q":32,
                               "idExame": app.resultadoExameService.viewModel.idExame
                           };
                           
                         return param;
                       } 
                   }
               },
               schema: {
            	   parse: function (response) {
            		   console.log(response);
                       if (response && response.length > 0)
                       {
                           console.log(response[0].EXAMETIPONOME);
                    	   app.resultadoExameService.viewModel.set("exame", response[0].EXAMETIPONOME);
                           app.resultadoExameService.viewModel.set("dataResultado", response[0].DATAHORARESULTADO);
                    			   
                       }
            		   return response;
                   }
               }               
             	
          }),
          
    });
    
    app.resultadoExameService = 
    {
        viewModel : new resultadoExameViewModel()
    };
        
})(window);
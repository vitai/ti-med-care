(function(global){
   var consultaAgendaModel,
    app = global.app = global.app || {};
   
    var consultaAgendas = [{CONSULTA:"Cardiologia",QTA:20},
                          {CONSULTA:"Pediatria",QTA:13},
                          {CONSULTA:"Ginecologia",QTA:30}]; 

       consultaAgendaModel = kendo.data.ObservableObject.extend({
           consulta:"",
           recurso:"",
           nome:"",
        onViewShow: function(e)
        {
         var that = this;
         that.set("consulta", e.view.params.consulta); 
         that.set("recurso", e.view.params.recurso); 
         that.set("nome", e.view.params.nome); 
         console.log(e.view.params.recurso);
         this.dataSource.read({ data: consultaAgendas });
        },
        onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
          this.dataSource.read({ data: consultaAgendas });
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
        }
        
        });
    
    app.consultaagendaservice  = {
       viewModel : new consultaAgendaModel()
       }; 
  
})(window);
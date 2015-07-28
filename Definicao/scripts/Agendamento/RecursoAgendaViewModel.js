(function(global){
   var recursoAgendaModel,
    app = global.app = global.app || {};
   
    var recursoAgendas = [{INFOAGENDA:"Consultas Medicas",QTA:20,PERCENT2:30},
                         {INFOAGENDA:"Exame Laboratorio",QTA:13,PERCENT2:30},
                         {INFOAGENDA:"Exame Imagem",QTA:30,PERCENT2:30}]; 

       recursoAgendaModel = kendo.data.ObservableObject.extend({
        recurso:null,
        onViewShow: function(e)
        {
         var that = this;
         that.set("recurso", e.view.params.recurso); 
         console.log(e.view.params.recurso);
         this.dataSource.read({ data: recursoAgendas });
        },
        onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
          this.dataSource.read({ data: recursoAgendas });
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
    app.recursoagendaservice  = {
       viewModel : new recursoAgendaModel()
    }; 
  
})(window);
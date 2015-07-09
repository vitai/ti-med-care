(function(global){
   var AgendaModel,
    app = global.app = global.app || {};
    
   /*
    var Agendado = [{DESCRICAO:"Vagas Disponiveis",QTA:20,PERCENT:20},
                    {DESCRICAO:"Agendados",QTA:13,PERCENT:30},
                     {DESCRICAO:"Realizados",QTA:3,PERCENT:50},
                      {DESCRICAO:"Faltas",QTA:2,PERCENT:5}]; 
    */
    
       AgendaModel = kendo.data.ObservableObject.extend({
         painel:[],
        onInit:function()
        {
          
         app.currentViewModel = this;
            
        },dataSource: new kendo.data.DataSource({
         transport:
            { 
                read: 
                { 
                    dataType: "json" 
                } 
            },
         sortable:true
            }),       
        onUpdate: function() 
        {   
            var that = this;
            this.refresh();
        },
       onBeforeShowView: function(e)
        {
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=22";
            console.log(app.unidadeUrl + "ws/relatorio?q=22");
        }
   });
    
  app.agendaservice  = {
       viewModel : new AgendaModel()
    }; 
  
})(window);
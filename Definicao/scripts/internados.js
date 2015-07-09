(function(global){
   var EnfermariaModel,
    app = global.app = global.app || {};
    
    var PacienteInternados = [{NOME:"Daniel Silva",SEXO:"M",IDADE:21},
    
    {NOME:"Jaqueline Santos Ferreira",SEXO:"F",IDADE:27},
    
    {NOME:"Thiago de Souza",SEXO:"M",IDADE:13}];   
    
    EnfermariaModel = kendo.data.ObservableObject.extend({
        secao:"",
        onViewShow: function(e)
        {
          var that = this;
          that.set("secao", e.view.params.secao);
          console.log(e.view.params.secao);    
          this.dataSource.read({ data: PacienteInternados});  
         },
        refresh: function()
        {
          this.dataSource.read({ data: PacienteInternados});         
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

    app.enfermariaservice  = {
       viewModel : new EnfermariaModel()
    }; 
  
})(window);
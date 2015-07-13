(function(global){
   var detalheModel,
    app = global.app = global.app || {};

    
    detalheModel = kendo.data.ObservableObject.extend({
        paciente:"",
        entrada:"",
        idade:"",
        sexo:"",
        onViewShow: function(e)
        {
          var that = this;
          that.set("paciente", e.view.params.paciente);
          that.set("entrada", e.view.params.entrada);
          that.set("idade", e.view.params.idade);
          that.set("sexo", e.view.params.sexo);
  //       this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
          this.refresh();
        },
        refresh: function()
        {
 //           this.dataSource.read();           
        },
        onUpdate: function() 
        {
            this.refresh();
        }
    });

    app.detalheservice  = {
       viewModel : new detalheModel()
    }; 
  
})(window);
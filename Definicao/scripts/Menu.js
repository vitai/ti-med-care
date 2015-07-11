(function(global){
   var UnidadeVisualiza,
    app = global.app = global.app || {};
    
    UnidadeVisualiza = kendo.data.ObservableObject.extend({

    });  
    
    app.UnidadeService  = {
       viewModel : new UnidadeVisualiza()
    }; 
  
})(window);


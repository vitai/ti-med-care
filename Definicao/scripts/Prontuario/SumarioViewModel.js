(function (global) {
  var sumarioViewModel,  
   app =  global.app || {};

    
    sumarioViewModel = kendo.data.ObservableObject.extend({
        paciente: new Paciente(1, 'LEANDRO MUSSI DA SILVA', 'M', '44 anos')
    });
    
    app.sumarioService = 
    {
        viewModel : new sumarioViewModel()
    };
     
        
})(window);
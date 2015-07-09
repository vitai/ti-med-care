(function(global){
   var UnidadeVisualiza,
    app = global.app = global.app || {};
    
    UnidadeVisualiza = kendo.data.ObservableObject.extend({
     submit : function(){
     app.application.navigate('views/Menu/agendamentos.html');       
      },interna : function(){
     app.application.navigate('views/Menu/Internacao/internacao.html');              
      },emergencia : function(){
     app.application.navigate('views/Menu/emergencia.html');     
      }   
           
    });  
    
    app.UnidadeService  = {
       viewModel : new UnidadeVisualiza()
    }; 
  
})(window);


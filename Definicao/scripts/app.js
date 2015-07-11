(function(global) {
  var app =  global.app = global.app || {};
    
    app.unidadeUrl = "http://santacasadecampos.dyndns.org:8080/sits/";
    app.usuarioSettings = [];
    app.permissoes = null;
    app.currentViewModel = null;
    app.TotalUnidades = 1;
   
    app.Login = function(userSettings){
        if(app.TotalUnidades == 1){
        app.usuarioSettings = userSettings;
        app.permissoes = userSettings.PERMISSOES;
        console.log(userSettings);  
        app.application.navigate('views/Menu.html');      
        }else{
        app.usuarioSettings = userSettings;
        app.permissoes = userSettings.PERMISSOES;
        console.log(userSettings);  
        app.application.navigate('views/unidadesView.html');        
            
            
        }
        console.log(app.TotalUnidades);
    }
    
document.addEventListener("deviceready",function(){
        navigator.splashscreen.hide();
            document.addEventListener("resume", function(){
                console.log('resume');
                if (app.currentViewModel)
                    app.currentViewModel.refresh();
            }, false);
    
        kendo.culture("pt-BR"); 
        app.unidadeCorrente = null;
        app.currentViewModel = null;
    
 app.application = new kendo.mobile.Application(document.body, {skin: 'flat', initial: 'views/prontuario/SumarioView.html'});
    
}, false);           
})(window);
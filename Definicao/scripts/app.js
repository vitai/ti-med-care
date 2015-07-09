(function(global) {
  var app =  global.app = global.app || {};
    
    app.unidadeUrl = "http://santacasadecampos.dyndns.org:8080/sits/";
    app.usuarioSettings = [];
    app.permissoes = null;
    app.currentViewModel = null;
   
    app.Login = function(userSettings){
        app.usuarioSettings = userSettings;
        app.permissoes = userSettings.PERMISSOES;
        console.log(userSettings);  
        app.application.navigate('views/unidadesView.html');      
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
    
 app.application = new kendo.mobile.Application(document.body, {skin: 'flat', initial: 'views/login.html'});
    
}, false);           
})(window);
(function(global) {
  var app =  global.app = global.app || {};
    
    app.unidadeUrl = "";
    app.usuarioSettings = [];
    app.permissoes = null;
    app.currentViewModel = null;
    app.TotalUnidades = 2;
   
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
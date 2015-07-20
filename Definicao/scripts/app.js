(function(global) {
  var app =  global.app = global.app || {};
    
    app.unidadeUrl = "";
    app.usuarioSettings = [];
    app.permissoes = null;
    app.currentViewModel = null;
    app.unidadeCorrente = null;
   
app.Login = function(userSettings){
var permissao = null;
    
for (var i = 0; i < userSettings.UNIDADES.length; i++) {
           if (userSettings.UNIDADES[i] !== undefined) {
                        ++permissao;
                        console.log(permissao);
            }
           if(permissao <= 1){
            app.usuarioSettings = userSettings;
            app.permissoes = userSettings.PERMISSOES;
            app.unidadeCorrente = userSettings.UNIDADES[0];
            app.unidadeUrl = userSettings.UNIDADES[0].URL;
            console.log(userSettings);
            console.log(app.unidadeUrl);
            console.log(app.unidadeCorrente);    
            app.application.navigate('views/Menu.html');      
            }else{
            app.usuarioSettings = userSettings;
            app.permissoes = userSettings.PERMISSOES;
            console.log(userSettings);
            app.application.navigate('views/unidadesView.html');    
            }
         
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
        app.currentViewModel = null;
    
 app.application = new kendo.mobile.Application(document.body, {skin: 'flat', initial: 'views/login.html'});
    
}, false);           
})(window);
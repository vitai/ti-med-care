(function (global) {
    var AppModel, app = global.app = global.app || {};

    AppModel = kendo.data.ObservableObject.extend({
        navDataSource: new kendo.data.DataSource({
          	transport: {
            	read: function(operation) {
                	var data = operation.data.data || [];
                	operation.success(data);
            	}
        	}
        })
    });
    
     app.appService = {
        viewModel: new AppModel()
    };
    
    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };
    
    app.addDays = function(date, days) {
    	var result = new Date(date);
    	result.setDate(date.getDate() + days);
    	return new Date(result);
	}   
    
    app.Logoff = function()
    {
        app.permissoes = null;
        app.usuarioSettings = [];
    }
    
app.Login = function(userSettings){
                app.usuarioSettings = userSettings;
                app.permissoes = userSettings.PERMISSOES;
           if(userSettings.UNIDADES.length == 1){            
                app.unidadeCorrente = userSettings.UNIDADES[0];
                app.unidadeUrl = userSettings.UNIDADES[0].URL;
               console.log(app.unidadeUrl);
                app.application.navigate('views/MenuView.html');      
            }else{
                app.application.navigate('views/UnidadesView.html');    
            }
      
     }
    
    kendo.culture("pt-BR");
    app.unidadeUrl = "http://177.124.207.146:8080/sits";
    app.usuarioSettings = [];
    app.permissoes = null;
    app.currentViewModel = null;
    app.unidadeCorrente = null;
    
    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();
        
            document.addEventListener("resume", function(){
                console.log('resume');
                if (app.currentViewModel)
                    app.currentViewModel.refresh();
            }, false);

        app.currentViewModel = null;
        
        app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
            

        };
        
        
        kendo.bind($("#appDrawerMenu"), app.appService.viewModel);
        

        app.application = new kendo.mobile.Application(document.body, { skin: 'flat', initial: 'views/LoginView.html' });
        
    }, false);
    
    
})(window);
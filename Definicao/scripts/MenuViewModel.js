(function(global){
   var Menus,
    app = global.app  || {};
    
    Menus = kendo.data.ObservableObject.extend({
         dataAtualizacao: "",
         descricaoUnidade: "",
         logo:"",
        onViewShow: function(e) {
            var that = this;
            that.set("descricaoUnidade", app.unidadeCorrente.DESCRICAO);
            that.set("logo", app.unidadeCorrente.LOGO);
            this.dataSource.read({ data: app.unidadeCorrente.MENU});     
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
 
    
    app.MenuService  = {
       viewModel : new Menus()
    }; 
  
})(window);

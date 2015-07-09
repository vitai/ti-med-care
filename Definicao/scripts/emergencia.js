(function(global){
   var EmergenciaModel,
    app = global.app = global.app || {};
    
 var Emergencia = [
    {DESCRICAO:"Permanencia Maior 24h:",QTA:20},
    {DESCRICAO:"Registrados em 24h:",QTA:300}];
    
  var Emergencia2 = [  
    {DESCRICAO:"Classificação de Risco Adulto:",QTA:3},
    {DESCRICAO:"Classificação de Risco Pediatrico:",QTA:2}];
    
  var Emergencia3 = [   
    {DESCRICAO:"Amarelo:",QTA:2},
    {DESCRICAO:"Vermelha:",QTA:2},
    {DESCRICAO:"Azul:",QTA:2}];
    
  var Emergencia4 = [   
    {DESCRICAO:"Verde:",QTA:2},
    {DESCRICAO:"Amarelo:",QTA:2},
    {DESCRICAO:"Vermelha:",QTA:2}];
    
   var Emergencia5 = [{DESCRICAO:"Exame Laboratorial:",QTA:23.12},
    {DESCRICAO:"Exame de Imagem:",QTA:4.50},
    {DESCRICAO:"Cuidados:",QTA:2.10},
    {DESCRICAO:"Medicamentos:",QTA:11.23}];   
    
  var Emergencia6 = [{DESCRICAO:"Observação Adulto:",QTA:2},
    {DESCRICAO:"Observação Pediatrica:",QTA:2},
    {DESCRICAO:"Sala Verde:",QTA:1},
    {DESCRICAO:"Sala Amarela:",QTA:2},
    {DESCRICAO:"Sala Vermelha:",QTA:3}
    ];   
    


    EmergenciaModel = kendo.data.ObservableObject.extend({
        onViewShow: function(e)
        {
         this.dataSource.read({ data: Emergencia  });
         this.dataSourceFila.read({ data: Emergencia2  });
         this.dataSourceRiscoPediatrico.read({ data: Emergencia3  }); 
         this.dataSourceRiscoAdulto.read({ data: Emergencia4  });
         this.dataSourceObs.read({ data: Emergencia6  });
         this.dataSourcePres.read({ data: Emergencia5  }); 
         },
        refresh: function()
        {
         this.dataSource.read({ data: Emergencia  });
         this.dataSourceFila.read({ data: Emergencia2  });
         this.dataSourceRiscoPediatrico.read({ data: Emergencia3  }); 
         this.dataSourceRiscoAdulto.read({ data: Emergencia4  });
         this.dataSourceObs.read({ data: Emergencia6  });
         this.dataSourcePres.read({ data: Emergencia5  }); 
        },dataSource: new kendo.data.DataSource({
                transport: {
               read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
            }
        }),dataSourceObs: new kendo.data.DataSource({
                transport: {
               read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
            }
        }),dataSourcePres: new kendo.data.DataSource({
                transport: {
               read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
            }
        }),dataSourceRiscoAdulto: new kendo.data.DataSource({
                transport: {
               read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
            }
        }),dataSourceRiscoPediatrico: new kendo.data.DataSource({
                transport: {
               read: function(operation) {
                var data = operation.data.data || [];
                operation.success(data);
                }
            }
        }),dataSourceFila: new kendo.data.DataSource({
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
    
    app.emergenciaservice  = {
       viewModel : new EmergenciaModel()
    }; 
  
})(window);

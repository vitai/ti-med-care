(function(global){
   var EmergenciaModel,
   app = global.app || {};

    EmergenciaModel = kendo.data.ObservableObject.extend({
         observacoes: [],
         onInit:function()
        {
            app.currentViewModel = this;
        },
        refresh: function()
        {
            this.dataSourcePaciente.read();
            this.dataSourceClass.read();
//          this.dataSourceLeito.read();
            this.dataSourceCons.read();
            this.dataSourcePres.read();
            
        },dataSourcePaciente: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } 
            },
            sortable:true,      
        }),dataSourceClass: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } 
            },
            sortable:true,  
        }),dataSourceLeito: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } 
            },
            sortable:true,  
        }),dataSourceCons: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } },
            group: "ORDEM",
            sortable:true,
            sort: { field: "ORDEM", dir: "asc" },  
        }),dataSourcePres: new kendo.data.DataSource({
            transport: { read:  { dataType: "json" } 
            },
            sortable:true,  
        }),  
         onListDataboud: function(e) {
            var dataView = e.sender.dataSource.view();
            var groups = $(".listHeader");
            for (var i = 0; i < groups.length; i++) {
                var grupo = dataView[i].items[0].GRUPO;
                
                $(groups[i]).html(grupo);
                var obs = dataView[i].items[0].OBSERVACAO;
                this.observacoes[i] = obs.trim();
                var iconHelp = $('[data-id='+dataView[i].items[0].ORDEM+']')
                if (obs && obs.trim()!='')
                    {
                        iconHelp.show();                        
                    }
                else
                    {
                        iconHelp.html('');
                    }
                
            }
        },
        onUpdate: function() 
        {
            this.refresh();
        },
        showHelp: function(e)
        {
            
        },
        onBeforeShowView: function(e)
         {    
            this.dataSourcePaciente.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=15&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourcePres.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=16&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourceCons.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=17&setorId=" + app.unidadeCorrente.CODIGO;
            this.dataSourceClass.transport.options.read.url = app.unidadeUrl + "ws/relatorio?q=18&setorId=" + app.unidadeCorrente.CODIGO;
            console.log(app.unidadeUrl + "ws/relatorio?q=15&setorId=" + app.unidadeCorrente.CODIGO);
            this.refresh();
         }      
    });
    
    app.emergenciaservice  = {
       viewModel : new EmergenciaModel()
    }; 
    
})(window);
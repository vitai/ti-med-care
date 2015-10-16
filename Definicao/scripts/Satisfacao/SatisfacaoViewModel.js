(function (global) {
 var  SatisfacaoViewModel,    
  app = global.app = global.app || {};

   
    
    app.mes = kendo.toString(new Date(), "MM");
    app.ano = kendo.toString(new Date(), "yyyy");
    app.ultimoDiadoMes = (new Date(app.ano, app.mes, 0 )).getDate();    
    
    app.ExibirMesAnterior = null;
    app.ExibirMes = null;  
    app.MesFaturado = null; 
    
    app.mesAnterior = null;
    app.anoAnterior = null;
    app.ultimoDiadoMesAnterior = null; 
    
  function handleError(e)
    {
        console.log(e);
    }
   
  SatisfacaoViewModel = kendo.data.ObservableObject.extend({
        ValorTotal:0,
        mesanterior:"",
        mesatual:"",
        onInit:function()
        {
            $(".km-list").removeClass("km-list").addClass("list-group");
        },
            onBeforeShowView: function(e) {
            //this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            console.log(app.unidadeUrl + "ws/relatorio");    
            //this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            //this.refresh();  
            app.mesAnterior  = kendo.toString(new Date(app.ano, app.mes - 2, 1), "MM"); 
            //Exibir os meses em string mes atual / mes anterior
            app.ExibirMes = kendo.toString(new Date(), "MMMM"); // Mes Atual 
            app.ExibirMesAnterior = kendo.toString(new Date(app.ano, app.mes - 2, 1), "MMMM"); // Mes Anterior
            app.MesFaturado = kendo.toString(new Date(), "MMMM");
        
            /*   
             //Tratamento para exibir o mes do anterior quando o mes for Janeiro.
             // Inserir esse tratamento ao carregar a pagina ?
             if (app.mes == 1){
                app.mesAnterior = 12;
                app.anoAnterior = app.ano - 1;
                app.ultimoDiadoMesAnterior = (new Date(app.anoAnterior, app.mesAnterior, 0 )).getDate();    
            }
            else {
                app.mesAnterior = app.mes - 1;
                app.anoAnterior = app.ano;
                app.ultimoDiadoMesAnterior = (new Date(app.anoAnterior, app.mesAnterior, 0 )).getDate();    
                
            } */
            
            this.mesatual = app.ExibirMes;
            this.mesanterior = app.ExibirMesAnterior;
            
            this.set("ExibirMes", app.ExibirMes);
            this.set("ExibirMesAnterior", app.ExibirMesAnterior);  
            this.set("MesFaturado", app.MesFaturado); 
                
         
        },refresh: function() {
            this.dataSource.read();
            
        },
        dataSource: new kendo.data.DataSource({
            transport:{ 
            read:{ 
                 url: app.unidadeUrl + "/ws/relatorio",
                  data: function() {
                      var param = {
                          "q":35,
                          "setorId": 1,
                          "dataInicial": kendo.toString(new Date(2014,10,1), "G"),
                          "dataFinal": kendo.toString(new Date(), "G"),
                          "pergunta":"ATENDIMENTO DA ENFERMAGEM"

                      };
                      console.log(param);
                      
                      return param;
                  }
                }
               },
          schema: {
                parse: function (response) {
                    
                    return response;
                }
            },
          error: handleError  
        }),
 
       onListDataboud: function (e) {
            var dataView = e.sender.dataSource.view();
           console.log(dataView)
            var groups = $(".km-list>li"); 
            if (groups)
                for (var i = 0; i < groups.length; i++) {
                    var element = groups[i];
                    $(element).addClass("list-group-item");
                }
        }

    });
    
    app.satisfacaoservice = {
        viewModel : new SatisfacaoViewModel()
    };
    
})(window);
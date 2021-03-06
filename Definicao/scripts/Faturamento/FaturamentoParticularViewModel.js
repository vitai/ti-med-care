(function (global) {
    var faturamentoParticularViewModel, 
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
    
   function handleError()
    {
        console.log('erro');
    }
   
    
    faturamentoParticularViewModel = kendo.data.ObservableObject.extend({
        ValorTotal:0,
        mesanterior:"",
        mesatual:"",
        onInit: function(e) {
            
            $(".km-list").removeClass("km-list").addClass("list-group");
        },
        onBeforeShowView: function(e) {
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            console.log(app.unidadeUrl + "ws/relatorio");
            this.dataSourceConsolidado.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.refresh();  
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
            
            console.log(app.ExibirMesAnterior);
            console.log(app.ExibirMes);
            console.log(app.mes);
            console.log(app.ano);
            console.log(app.ultimoDiadoMes); 
        },   
        Set : function(e){
            if(this.mesanterior  = app.ExibirMesAnterior){
            this.mesatual = "";
            console.log(app.ExibirMesAnterior);
            console.log(this.mesanterior);       
            app.ano = kendo.toString(new Date(), "yyyy");       
            app.mes = kendo.toString(new Date(), "MM") - 1;  
            app.MesFaturado = kendo.toString(new Date(app.ano, app.mes - 1, 1), "MMMM");  
            this.set("MesFaturado", app.MesFaturado);   
            this.refresh();   
          }
        },
        Set2 : function(e){
          if(this.mesatual  = app.ExibirMes){ 
            this.mesanterior = "";
            console.log(this.mesanterior);
            console.log(app.ExibirMes);
            console.log(this.mesatual);  
            app.ano = kendo.toString(new Date(), "yyyy");       
            app.mes = kendo.toString(new Date(), "MM");    
            app.MesFaturado = kendo.toString(new Date(), "MMMM");
            this.set("MesFaturado", app.MesFaturado);   
            this.refresh();   
          }   
        },
        refresh: function() {
            this.dataSource.read();
            this.dataSourceConsolidado.read();
        },
        dataSource: new kendo.data.DataSource({
          group: "GRUPO",
          sort: { field: "VALOR", dir: "desc" },
          transport:{ 
            read:{ 
                  dataType: "json", timeout: 2000 }
                },
                  url: app.unidadeUrl + "ws/relatorio",
                  data: function() {
                      var param = {
                          "q":32,
                          "setorId": 1,
                          "dataInicial": kendo.toString(new Date(app.ano, app.mes - 1 , 1), "G"),
                          "dataFinal": kendo.toString(new Date(app.ano, app.mes - 1 , app.ultimoDiadoMes), "G")

                      };
                      console.log(param);
                      
                      return param;
                  },
          schema: {
                parse: function (response) {
                    
                    return response;
                }
            },
          error: handleError  

        }),
        dataSourceConsolidado: new kendo.data.DataSource({
          sort: { field: "VALOR", dir: "desc" },
          transport:{ 
            read:{ 
                  dataType: "json", timeout: 2000 }
              },
                  url: app.unidadeUrl + "ws/relatorio",
                  data: function() { 
                      var param = {
                          "q":33,
                          "setorId": 1,
                          "dataInicial": kendo.toString(new Date(app.ano, app.mes - 1 , 1), "G"),
                          "dataFinal": kendo.toString(new Date(app.ano, app.mes - 1 , app.ultimoDiadoMes), "G")

                      };
                     console.log(param);
                      return param;
                  },
          schema: {
                parse: function (response) {
                    var total = 0;
                    for(var i=0;i<response.length;i++)            
                    {
                     total += response[i].VALOR
                        console.log(total);
                    } 
                    app.faturamentoParticularService.viewModel.set("ValorTotal", kendo.toString(total, "c"));                    
                    return response;
                }
            },
        error: handleError      

        }),        
        onListDataboud: function (e) {
            var dataView = e.sender.dataSource.view();
            var groups = $(".km-list>li"); 
            if (groups)
                for (var i = 0; i < groups.length; i++) {
                    var element = groups[i];
                    $(element).addClass("list-group-item");
                }
        }

    });
    
    app.faturamentoParticularService = {
        viewModel : new faturamentoParticularViewModel()
    };
    
})(window);
(function (global) {
    var faturamentoParticularViewModel, 
        app = global.app = global.app || {};

    app.unidadeUrl = "http://santacasadecampos.dyndns.org:8080/sits/";
    
    faturamentoParticularViewModel = kendo.data.ObservableObject.extend({
        ValorTotal:0,
        onInit: function(e) {
            
            $(".km-list").removeClass("km-list").addClass("list-group");
        },
        onBeforeShowView: function(e) {
            this.dataSource.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.dataSourceConsolidado.transport.options.read.url = app.unidadeUrl + "ws/relatorio";
            this.refresh();   
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
                  dataType: "json",
                  url: app.unidadeUrl + "ws/relatorio",
                  data: function() {
                      var param = {
                          "q":32,
                          "setorId": 1,
                          "dataInicial": kendo.toString(new Date(2015, 6, 1), "G"),
                          "dataFinal": kendo.toString(new Date(), "G")

                      };
                      
                      return param;
                  } 
              }
          },
          schema: {
                parse: function (response) {
            
                    return response;
                }
            }               

        }),
        dataSourceConsolidado: new kendo.data.DataSource({
        
          sort: { field: "VALOR", dir: "desc" },
          transport:{ 
            read:{ 
                  dataType: "json",
                  url: app.unidadeUrl + "ws/relatorio",
                  data: function() {
                      var param = {
                          "q":33,
                          "setorId": 1,
                          "dataInicial": kendo.toString(new Date(2015, 6, 1), "G"),
                          "dataFinal": kendo.toString(new Date(), "G")

                      };
                      
                      return param;
                  } 
              }
          },
          schema: {
                parse: function (response) {
                    var total = 0;
                    console.log(response);
                    for(var i=0;i<response.length;i++)            
                    {
                     total += response[i].VALOR
                        console.log(total);
                    }
                        
                    app.faturamentoParticularService.viewModel.set("ValorTotal", kendo.toString(total, "c"));                    
                    return response;
                }
            }               

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
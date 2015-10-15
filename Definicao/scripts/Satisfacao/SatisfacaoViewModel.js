(function (global) {
 var  SatisfacaoViewModel,    
  app = global.app = global.app || {};


  function handleError()
    {
        console.log('erro');
    }
   
  SatisfacaoViewModel = kendo.data.ObservableObject.extend({
        onInit:function()
        {
            $(".km-list").removeClass("km-list").addClass("list-group");
        },
      dataSource: new kendo.data.DataSource({
          sort: { field: "VALOR", dir: "desc" },
          transport:{ 
            read:{ 
                  dataType: "json", timeout: 2000 }
              },
                  url: app.unidadeUrl + "ws/relatorio",
                  data: function() { 
                      var param = {

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
    
    app.satisfacaoservice = {
        viewModel : new SatisfacaoViewModel()
    };
    
})(window);
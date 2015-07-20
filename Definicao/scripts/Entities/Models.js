   var Paciente = kendo.Class.extend({
	    
       id:0,
       nome:'',
       sexo:'',
       idade:'',
       init: function(id, nome, sexo, idade)
       {
           this.nome = nome;
           this.sexo = sexo;
           this.idade =idade;
           this.id = id;
       }        
   
   });
   
   var BoletimAtendimento = kendo.Class.extend({
       
       id:'',
       dataEntrada: null,
       dataInternacao: null,
       leito: null,
       secaoInternacao: null,
       init: function(id, dataEntrada, dataInternacao, leito,secaoInternacao)
       {
           this.dataEntrada = dataEntrada;
           this.dataInternacao = dataInternacao;
           this.leito =leito;
           this.secaoInternacao =secaoInternacao;
           this.id = id;
       }              
       
   });

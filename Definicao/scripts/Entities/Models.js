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
        paciente: new Paciente()
        
    });

Template.adicionar_jogador.onRendered(
    function(){
        $('#div-escolher-numeros').slideToggle('slow');
    }
);

Template.adicionar_jogador.helpers({
    jogadoAdicionado(){
        return Session.get("jogadoAdicionado");
    },

    jogoIsPago(isPago){
        if(isPago == 'pago'){
            return true;
        }
        return false;

    },

    numeros_bolas(jogoArray){
        if(!jogoArray){
            jogoArray = [0,0,0,0,0,0,0,0,0,0];
        }

		bolas_num = [];


//        <div class="range-field">
//            <input  id="num_${i}" name="num_${i}" class="numero_escolhido" type="range" min="1" max="60" value="${jogoArray[i]}"/>
//        </div>


		for(let i=0; i<(jogoArray.length); i++){
			bolas_num[i] = {
				id: "num_"+i,
				posicao: i,
                htmlNum:
                    `<div class="col s11 range-field">

    					<label>${i+1}º Número</label>

    					<div class="col s7range-field">
    						<input  id="num_${i}" name="num_${i}" class="numero_escolhido" type="number" min="1" max="60" value="${jogoArray[i]}"/>
    					</div>

    				</div>

    				<div class="col s1">
    					<p id="label_num_${i}" class="prefix">0</p>
    				</div>
                    `

			}
		}

		return bolas_num;
	},

	valor_escolhido(num_id){

	}

});

Template.adicionar_jogador.events({
    "click #statuPagamento": function(e){


        console.log($("#statuPagamento:checked").val())
    },

    "click #js-show-add-numeros":function(){

        $('.numero_escolhido').each((index)=>{

            let slideNum = $("#num_"+index);

    		$('#label_'+slideNum.attr('id')).text(slideNum.val());
        });


        $('#div-escolher-numeros').slideToggle("slow")



    },
    "submit #js_salvar_jogador_form": function(event, template){
        let telefone, nome, isPago;
        let jogoArray = [];

        telefone = event.target.telefone.value;
        nome = event.target.nome.value;
        isPago = $("#statuPagamento:checked").val();


        $(".numero_escolhido").each(function(index){
            jogoArray.push(Number($(this).val()));
        });

        Meteor.call("AddJogador", telefone, nome, isPago,jogoArray, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                Session.set('jogadoAdicionado', true);
            }
        });


        event.target.telefone.value = "";
        event.target.nome.value = "";

        $(".numero_escolhido").each(function(index){
                jogoArray.push($(this).val(0));
        });

        return false;
    },
    'change .numero_escolhido': function(event){


		let label_id = 'label_'+$(event.target).attr('id')
		let valor = $(event.target).val();
		$('#'+label_id).text(valor);

	}
});

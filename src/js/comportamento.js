function carregarTelaJogo() {
	var nomeJogador = $("#jogadorNome").val();
	$.get('templates/telaDoJogo.html', function(html) {
		$('#corpo').html(html);
    	iniciarJogo(nomeJogador);
    	$("#recebeNome").html(nomeJogador);
		$("#pontosJogador").val(data.jogadores[0].pontos);
    	$("#pontosCPU").val(data.jogadores[1].pontos);
    	mostrarCarta(data.jogadores[0].mao[0], "maoJogador");
    	mostrarCarta(data.jogadores[0].mao[1], "maoJogador");
    	mostrarCarta(data.jogadores[1].mao[0], "maoCPU");
		mostrarCarta(data.jogadores[1].mao[1], "maoCPU");
		$('#qtdCartas').val(data.baralho.length);
	});
}

function atualizaPontos() {
	$("#pontosJogador").val(data.jogadores[0].pontos);
	$("#pontosCPU").val(data.jogadores[1].pontos);
	$('#qtdCartas').val(data.baralho.length);
}

function pegarCarta() {
	tirarCarta(data.baralho, data.jogadores[0]);
	atualizaPontos();
	var mao = data.jogadores[0].mao;
	mostrarCarta(mao[mao.length-1], "maoJogador");
	if (data.jogadores[0].pontos >= 21) {
		finalChefao();
	}
}

function mostrarCarta(carta, idDiv) {
	$('<div></div>')
		.attr("class", "carta_" + carta.naipe + "_" + carta.valor)
		.appendTo("#" + idDiv);
}


function finalChefao() {
	para();
	$("#pegarCarta").attr("disabled", "disabled");
	$("#pararJogo").attr("disabled", "disabled");
	atualizaPontos();
	var mao = data.jogadores[1].mao;
	for (carta = 2; carta < mao.length; carta++) {
		mostrarCarta(mao[carta], "maoCPU");
	};
	$('#modalResultado').modal("show");
	$("#divResultado").text(resultado());
}

function jogarNovamente() {
	var nomeJogador = data.jogadores[0].nome;
	$('#modalResultado').modal('dispose');
	$('.modal-backdrop').remove();
	$.get('templates/telaDoJogo.html', function(html) {
		$('#corpo').html(html);
    	iniciarJogo(nomeJogador);
    	$("#recebeNome").html(nomeJogador);
		$("#pontosJogador").val(data.jogadores[0].pontos);
		$("#pontosCPU").val(data.jogadores[1].pontos);
		$('#qtdCartas').val(data.baralho.length);
    	mostrarCarta(data.jogadores[0].mao[0], "maoJogador");
    	mostrarCarta(data.jogadores[0].mao[1], "maoJogador");
    	mostrarCarta(data.jogadores[1].mao[0], "maoCPU");
		mostrarCarta(data.jogadores[1].mao[1], "maoCPU");
	});
}

function telaInicial() {
	$('.modal-backdrop').remove();
	$.get('templates/telaInicial.html', function(html) {
		$('#corpo').html(html);
	});
}

$( document ).ready(telaInicial);

function resultado() {
	if (data.jogadores[0].pontos > 21) {
		return data.jogadores[0].nome + " estourou " + data.jogadores[0].pontos + " pontos e perdeu."; 
	}
	if(data.jogadores[0].pontos > data.jogadores[1].pontos && 
		data.jogadores[0].data <= 21 || 
		data.jogadores[0].pontos == data.jogadores[1].pontos ||
		data.jogadores[0].pontos == 21 ||
		data.jogadores[1].pontos > 21 && data.jogadores[0].pontos < 21) {
			return "O jogador " + data.jogadores[0].nome + " ganhou " + data.jogadores[0].pontos;
	}
	else return "O croupier venceu " + data.jogadores[1].pontos;
}


function pegaNome() {
	if ( $("#jogadorNome").val() == '') {
		$('#obrigatorio').html("* Nome é Obrigatório.");
		return $("#jogadorNome").focus();
	} else {
		carregarTelaJogo();
	}
}

function verificaEnter() {
	$("#jogadorNome").keyup(function(event) {
    	if (event.keyCode === 13) {
        	pegaNome();
    	}
	});
}

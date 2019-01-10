class Carta {
	constructor(naipe, valor) {
    	this.naipe = naipe;
    	this.valor = valor;
  	}
}

class Jogador {
	constructor(nome, mao = [], pontos = 0) {
		this.nome = nome;
		this.mao = mao;
		this.pontos = pontos;
	}
}

var data = { 
    jogadores: [],
    baralho: []
};

//baralho com 4 naipes (ouros, copas, paus e espadas)
function gerarBaralho() {
	var baralho = [];
	for (naipe = 0; naipe < 4; naipe++) {
		for (valor = 1; valor < 14; valor++) {
			baralho.push(new Carta(naipe, valor));
		}
	}
	return baralho;
}

function tirarCarta(baralho, jogador) {
	carta = baralho.splice(Math.floor(Math.random() * baralho.length), 1)[0];
	jogador.mao.push(carta);
	somarPontos(jogador);
}

function somarPontos(jogador) {
	var ases = 0;
	var total = 0;
	var mao = jogador.mao;
	for (carta = 0; carta < mao.length; carta++) {
		if (mao[carta].valor == 1)
			ases ++;
		if (mao[carta].valor > 10 || mao[carta].valor == 1) {
			total += 10;
		} else {
			total += mao[carta].valor;
		}
	}
	while (total > 21 && ases > 0) {
		total -= 9;
		ases -= 1
	}
	jogador.pontos = total;
}

function para() {
	if (data.jogadores[0].pontos >= 21) {
		return ;
	}
	while (data.jogadores[0].pontos >= data.jogadores[1].pontos && data.jogadores[1].pontos <= 21) {
		tirarCarta(data.baralho, data.jogadores[1]);
		somarPontos(data.jogadores[1]);
		if (data.jogadores[1].pontos > data.jogadores[0].pontos && data.jogadores[1].pontos < 22) {
			break;
		}
		if (data.jogadores[1].pontos >= 21) {
			break;
		}
	}
}


function iniciarJogo(nomeJogador) {

	data.baralho = gerarBaralho();
	data.jogadores = [ new Jogador(nomeJogador), new Jogador("CPU") ];
	tirarCarta(data.baralho, data.jogadores[0]);
	tirarCarta(data.baralho, data.jogadores[0]);
	tirarCarta(data.baralho, data.jogadores[1]);
	tirarCarta(data.baralho, data.jogadores[1]);
}
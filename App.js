const cardButtons = document.querySelectorAll(".app__card-button");
const iconeBtn = document.querySelector(".app__card-primary-butto-icon");
const titulo = document.querySelector(".app__title");
const tempoTela = document.querySelector("#timer");

const musica = new Audio("./sons/luna-rise-part-one.mp3");
const playSom = new Audio("./sons/play.wav");
const playPause = new Audio("./sons/pause.mp3");
const playBeep = new Audio("./sons/beep.mp3");

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

cardButtons.forEach((element) =>
	element.addEventListener("click", (event) => {
		cardButtons.forEach(removeActive);
		element.classList.add("active");
		mudarContexto(event.target.dataset.contexto);
		mostrarTempo();
	})
);

document.querySelector("#alternar-musica").onchange = (e) => {
	if (e.target.checked) {
		musica.loop = true;
		musica.play();
	} else musica.pause();
};

document.querySelector("#start-pause").onclick = (event) => {
	iniciarPausar(event);
};

function mudarContexto(nome) {
	switch (nome) {
		case "foco":
			tempoDecorridoSegundos = 1500;
			contexto("foco");
			titulo.innerHTML = `Otimize sua produtividade,<br />
         <strong class="app__title-strong">mergulhe no que importa.</strong>`;
			break;
		case "short":
			tempoDecorridoSegundos = 300;
			contexto("descanso-curto");
			titulo.innerHTML = `Que tal dar uma respirada?<br />
         <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
			break;
		case "long":
			tempoDecorridoSegundos = 900;
			contexto("descanso-longo");
			titulo.innerHTML = `Hora de voltar à superfície.<br />
         <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
			break;
	}
}

function contexto(contexto) {
	document.querySelector("html").dataset.contexto = contexto;
	document
		.querySelector(".app__image")
		.setAttribute("src", `./imagens/${contexto}.png`);
}

function removeActive() {
	cardButtons.forEach((element) => element.classList.remove("active"));
}

function contagemRegressiva() {
	if (tempoDecorridoSegundos <= 0) {
		playBeep.play();
		zerar();
		return;
	}
	tempoDecorridoSegundos -= 1;
	mostrarTempo();
}

function iniciarPausar(e) {
	if (intervaloId) {
		iconeBtn.setAttribute("src", "./imagens/play_arrow.png");
		e.target.textContent = `Começar`;
		playPause.play();
		zerar();
		return;
	}

	e.target.textContent = `Pausar`;
	iconeBtn.setAttribute("src", "./imagens/pause.png");
	playSom.play();
	intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
	clearInterval(intervaloId);
	intervaloId = null;
}

function mostrarTempo() {
	const tempo = new Date(tempoDecorridoSegundos * 1000);
	const tempoFormate = tempo.toLocaleTimeString("pt-Br", {
		minute: "2-digit",
		second: "2-digit",
	});
	tempoTela.innerHTML = tempoFormate;
}

mostrarTempo();

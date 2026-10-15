"use strict";

/* ===== BANCO DE PERGUNTAS (Geografia – 6º ano) ===== */
const BANCO = {
  facil: {
    nome: "⭐ Fácil", pontos: 10,
    perguntas: [
      { e: "🇧🇷", p: "Em qual país nós vivemos?", o: ["Brasil", "Argentina", "Portugal", "México"], c: 0 },
      { e: "🌊", p: "Qual é o maior oceano do planeta?", o: ["Atlântico", "Pacífico", "Índico", "Ártico"], c: 1 },
      { e: "🏛️", p: "Qual é a capital do Brasil?", o: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], c: 2 },
      { e: "🧭", p: "Qual ponto cardeal fica onde o Sol nasce?", o: ["Oeste", "Norte", "Sul", "Leste"], c: 3 },
      { e: "🌍", p: "Quantos continentes existem (modelo mais usado no Brasil)?", o: ["6", "5", "7", "8"], c: 0 },
      { e: "🌳", p: "Qual bioma tem a maior floresta tropical do Brasil?", o: ["Pampa", "Amazônia", "Caatinga", "Pantanal"], c: 1 },
      { e: "🏝️", p: "Terra cercada de água por todos os lados é...", o: ["Península", "Vale", "Ilha", "Montanha"], c: 2 },
      { e: "🏔️", p: "Uma elevação grande e alta do terreno é...", o: ["Planície", "Montanha", "Lago", "Praia"], c: 1 }
    ]
  },
  medio: {
    nome: "⭐⭐ Médio", pontos: 20,
    perguntas: [
      { e: "🌊", p: "Qual é o maior rio do Brasil em volume de água?", o: ["Rio São Francisco", "Rio Tietê", "Rio Amazonas", "Rio Paraná"], c: 2 },
      { e: "🗺️", p: "Qual região do Brasil tem mais estados?", o: ["Nordeste", "Sudeste", "Sul", "Norte"], c: 0 },
      { e: "🌐", p: "Como se chama a linha imaginária que divide a Terra em Norte e Sul?", o: ["Meridiano de Greenwich", "Trópico de Câncer", "Linha do Equador", "Círculo Polar"], c: 2 },
      { e: "🌵", p: "Qual bioma brasileiro é típico do sertão nordestino?", o: ["Caatinga", "Mata Atlântica", "Cerrado", "Pampa"], c: 0 },
      { e: "🌎", p: "Em qual continente fica o Brasil?", o: ["América do Norte", "América do Sul", "Europa", "África"], c: 1 },
      { e: "🏙️", p: "Qual é a cidade mais populosa do Brasil?", o: ["Rio de Janeiro", "Brasília", "Belo Horizonte", "São Paulo"], c: 3 },
      { e: "🗺️", p: "O que uma legenda de mapa explica?", o: ["O nome do autor", "O significado dos símbolos", "A idade do mapa", "A cor do papel"], c: 1 },
      { e: "🌧️", p: "Qual é o nome do conjunto de condições do tempo em uma região por muitos anos?", o: ["Relevo", "Clima", "Vegetação", "Hidrografia"], c: 1 }
    ]
  },
  dificil: {
    nome: "⭐⭐⭐ Difícil", pontos: 30,
    perguntas: [
      { e: "🕐", p: "Quantos fusos horários oficiais o Brasil possui (com as ilhas oceânicas)?", o: ["2", "3", "4", "5"], c: 2 },
      { e: "🌐", p: "O que as latitudes medem?", o: ["Distância a leste ou oeste de Greenwich", "Altura de montanhas", "Distância ao norte ou sul do Equador", "Tamanho de rios"], c: 2 },
      { e: "🦜", p: "Qual bioma é considerado a 'caixa d'água do Brasil' por abrigar nascentes de grandes rios?", o: ["Cerrado", "Caatinga", "Pampa", "Manguezal"], c: 0 },
      { e: "🪨", p: "Qual camada da Terra é a mais externa, onde vivemos?", o: ["Núcleo", "Manto", "Crosta", "Magma"], c: 2 },
      { e: "🌐", p: "Qual meridiano é a referência para as longitudes (0°)?", o: ["Meridiano de Greenwich", "Meridiano de Brasília", "Linha do Equador", "Trópico de Capricórnio"], c: 0 },
      { e: "🗺️", p: "Em um mapa, escala 1:100.000 significa que 1 cm no mapa equivale a quanto na realidade?", o: ["100 metros", "1 km", "10 km", "100 km"], c: 1 },
      { e: "🏔️", p: "Qual é o ponto mais alto do Brasil?", o: ["Pico da Neblina", "Monte Roraima", "Pico das Agulhas Negras", "Pico da Bandeira"], c: 0 },
      { e: "🌿", p: "Qual tipo de vegetação cobre a maior parte do litoral brasileiro, hoje bem reduzida?", o: ["Mata Atlântica", "Pantanal", "Caatinga", "Araucárias do Sul"], c: 0 }
    ]
  }
};

/* ===== ELEMENTOS ===== */
const $ = (id) => document.getElementById(id);
const telaInicio = $("tela-inicio"), telaJogo = $("tela-jogo"), telaFim = $("tela-fim");
const painel = $("painel"), chipNivel = $("chip-nivel"), vidasEl = $("vidas"), pontosEl = $("pontos");
const progressoEl = $("progresso"), emojiEl = $("emoji-pergunta"), perguntaEl = $("pergunta");
const opcoesEl = $("opcoes"), feedbackEl = $("feedback"), btnProxima = $("btn-proxima");

/* ===== ESTADO ===== */
let nivelAtual = null, lista = [], indice = 0, pontos = 0, vidas = 3, respondeu = false;

/* ===== FUNÇÕES ===== */
function mostrar(tela) {
  [telaInicio, telaJogo, telaFim].forEach((t) => t.classList.add("escondido"));
  tela.classList.remove("escondido");
}

function embaralhar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function atualizarPainel() {
  vidasEl.textContent = "❤️".repeat(vidas) + "🖤".repeat(3 - vidas);
  pontosEl.textContent = "🏆 " + pontos;
}

function iniciar(nivel) {
  nivelAtual = nivel;
  lista = embaralhar(BANCO[nivel].perguntas);
  indice = 0; pontos = 0; vidas = 3;
  chipNivel.textContent = BANCO[nivel].nome;
  painel.classList.remove("escondido");
  atualizarPainel();
  mostrar(telaJogo);
  carregarPergunta();
}

function carregarPergunta() {
  respondeu = false;
  const q = lista[indice];
  emojiEl.textContent = q.e;
  perguntaEl.textContent = q.p;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  btnProxima.classList.add("escondido");
  progressoEl.style.width = (indice / lista.length) * 100 + "%";

  opcoesEl.innerHTML = "";
  // guarda qual é a correta antes de embaralhar as alternativas
  embaralhar(q.o.map((texto, i) => ({ texto, certa: i === q.c }))).forEach((alt) => {
    const b = document.createElement("button");
    b.className = "opcao";
    b.textContent = alt.texto;
    b.addEventListener("click", () => responder(b, alt.certa));
    opcoesEl.appendChild(b);
  });
}

function responder(botao, acertou) {
  if (respondeu) return;
  respondeu = true;

  if (acertou) {
    botao.classList.add("certa");
    pontos += BANCO[nivelAtual].pontos;
    feedbackEl.textContent = "🎉 Isso aí! Você acertou!";
    feedbackEl.classList.add("ok");
  } else {
    botao.classList.add("errada");
    vidas--;
    feedbackEl.textContent = "😅 Ops! Não foi dessa vez.";
    feedbackEl.classList.add("ruim");
    // mostra a resposta certa
    const certa = lista[indice].o[lista[indice].c];
    [...opcoesEl.children].forEach((b) => { if (b.textContent === certa) b.classList.add("certa"); });
  }

  [...opcoesEl.children].forEach((b) => (b.disabled = true));
  atualizarPainel();

  const acabou = vidas === 0 || indice === lista.length - 1;
  btnProxima.textContent = acabou ? "Ver resultado 🏁" : "Próxima ➡️";
  btnProxima.classList.remove("escondido");
}

function proxima() {
  if (vidas === 0 || indice === lista.length - 1) return finalizar();
  indice++;
  carregarPergunta();
}

function finalizar() {
  progressoEl.style.width = "100%";
  const perdeu = vidas === 0;
  const maximo = lista.length * BANCO[nivelAtual].pontos;
  const perc = pontos / maximo;
  const estrelas = perdeu ? 0 : perc >= 0.9 ? 3 : perc >= 0.6 ? 2 : 1;

  $("fim-emoji").textContent = perdeu ? "😢" : estrelas === 3 ? "🏆" : "🎖️";
  $("fim-titulo").textContent = perdeu ? "Acabaram as vidas!" : estrelas === 3 ? "Você é um craque!" : "Muito bem!";
  $("fim-texto").textContent = `Você fez ${pontos} de ${maximo} pontos.`;
  $("fim-estrelas").textContent = "⭐".repeat(estrelas) + "☆".repeat(3 - estrelas);
  mostrar(telaFim);
}

function voltarMenu() {
  painel.classList.add("escondido");
  mostrar(telaInicio);
}

/* ===== EVENTOS ===== */
document.querySelectorAll(".btn-nivel").forEach((b) =>
  b.addEventListener("click", () => iniciar(b.dataset.nivel))
);
btnProxima.addEventListener("click", proxima);
$("btn-repetir").addEventListener("click", () => iniciar(nivelAtual));
$("btn-menu").addEventListener("click", voltarMenu);
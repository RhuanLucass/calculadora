"use strict";

const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");
const igual = document.getElementById("igual");
const ce = document.getElementById("limpar-display");
const c = document.getElementById("limpar-calculo");
const backspace = document.getElementById("backspace");
const inverter = document.getElementById("inverter");
const decimal = document.getElementById("decimal");

let novoNumero = true;
let operador, numeroAnterior;

// Mostrar na tela
const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto.toLocaleString("BR");
    novoNumero = false;
  } else display.textContent += texto.toLocaleString("BR");
};

// Inserindo número no display
const inserirNumero = (e) => {
  if (display.textContent.length <= 20) atualizarDisplay(e.target.textContent);
  else console.log("Máximo de 20 algarismos excedido!");
};

// Adicionando evento de click em todos os botões de número
numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));

// verifica se operador é diferente de undefined
const operacaoPendente = () => operador !== undefined;

// Calculos
const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent.replace(",", "."));
    novoNumero = true;
    if (operador === "+") {
      atualizarDisplay(numeroAnterior + numeroAtual);
    } else if (operador === "-") {
      atualizarDisplay(numeroAnterior - numeroAtual);
    } else if (operador === "÷") {
      atualizarDisplay(numeroAnterior / numeroAtual);
    } else if (operador === "×") {
      atualizarDisplay(numeroAnterior * numeroAtual);
    }
  }
};

// Pegando o operador clicado
const selecionarOperador = (e) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = e.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(",", "."));
  }
};

// Função de click para os botões de operação
operadores.forEach((operador) =>
  operador.addEventListener("click", selecionarOperador)
);

// Nãp deixa que operações pendentes sejam realizadas logo após clicar em igual
const ativarIgual = () => {
  calcular();
  operador = undefined;
};

// Função de click para o botão igual
igual.addEventListener("click", ativarIgual);

const limparDisplay = () => {
  display.textContent = "";
};

// Função para limpar display
ce.addEventListener("click", limparDisplay);

// Zera a calculadora
const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};

// Função para limpar cálculo
c.addEventListener("click", limparCalculo);

// A função slice separa a string e (iniciando do zero, remove o ultimo)
const apagarUltimo = () =>
  (display.textContent = display.textContent.slice(0, -1));

// Função de click para botão apagar
backspace.addEventListener("click", apagarUltimo);

const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
};

// Função para inverter sinal do número
inverter.addEventListener("click", inverterSinal);

// IndexOf verifica se existe a vírgula na string e retorna -1 se não existir
const existeDecimal = () => display.textContent.indexOf(",") !== -1;

const existeValor = () => display.textContent.length > 0;

const addDecimal = () => {
  if (!existeDecimal()) {
    if (existeValor()) {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  }
};

// Adicionar função decimal
decimal.addEventListener("click", addDecimal);

// Mapeando teclado

const mapaTeclado = {
  0: "tecla0",
  1: "tecla1",
  2: "tecla2",
  3: "tecla3",
  4: "tecla4",
  5: "tecla5",
  6: "tecla6",
  7: "tecla7",
  8: "tecla8",
  9: "tecla9",
  "+": "operador-adicao",
  "-": "operador-subtracao",
  "*": "operador-multiplicacao",
  "/": "operador-divisao",
  "=": "igual",
  Enter: "igual",
  Backspace: "backspace",
  ",": "decimal",
};

const mapearTeclado = (e) => {
  const tecla = e.key;

  // Verifica se uma das chaves do objeto mapaTeclado tem a tecla pressionada
  const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;

  if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};

document.addEventListener("keydown", mapearTeclado);

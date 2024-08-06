document.addEventListener("DOMContentLoaded", () => {
  const botonPedirCarta = document.getElementById("draw-card-button");

  if (
    botonPedirCarta !== null &&
    botonPedirCarta !== undefined &&
    botonPedirCarta instanceof HTMLButtonElement
  ) {
    botonPedirCarta.addEventListener("click", handleDrawCard);
  } else {
    throw Error("Error");
  }

  const botonPlantarse = document.getElementById("plantarse-button");

  if (
    botonPlantarse !== null &&
    botonPlantarse !== undefined &&
    botonPlantarse instanceof HTMLButtonElement
  ) {
    botonPlantarse.addEventListener("click", handlePlantarse);
  } else {
    throw Error("Error");
  }

  const botonNuevaPartida = document.getElementById("new-game-button");

  if (
    botonNuevaPartida !== null &&
    botonNuevaPartida !== undefined &&
    botonNuevaPartida instanceof HTMLButtonElement
  ) {
    botonNuevaPartida.addEventListener("click", resetGameUI);
  } else {
    throw Error("Error");
  }
});

let score = 0;

const obtenerUrlCarta = (carta: number): string => {
  switch (carta) {
    case 1:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
    case 3:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
    case 5:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
    case 6:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
    case 7:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
    case 10:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
    case 11:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
    case 12: 
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
    default:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
};

const dameNumeroAleatorio = (): number => Math.floor(Math.random() * 10);

const dameCarta = (): number => {
  const numeroAleatorio = dameNumeroAleatorio();
  console.log(numeroAleatorio);

  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }

  return numeroAleatorio;
};

const valorCarta = (carta: number): number => (carta >= 10 ? 0.5 : carta);

const sumarPuntos = (puntos: number): number => score + puntos;

const actualizarScore = (puntosSumados: number): void => {
  score = puntosSumados;
};

const gestionarFinalPartida = (): string => {
  if (score === 7.5) {
    return "win";
  }
  if (score > 7.5) {
    return "lose";
  }
  return "continue";
};

const resetGame = (): void => {
  score = 0;
};
const getScore = (): number => score;

const scoreDiv = getScoreDiv();
const drawCardButton = getDrawCardButton();
const plantarseButton = getPlantarseButton();
const newGameButton = getNewGameButton();
const messageDiv = getMessageDiv();
const cardImage = getCardImage();

function getScoreDiv(): HTMLDivElement {
  const element = document.getElementById("score");
  if (element !== null && element !== undefined) {
    return element as HTMLDivElement;
  }
  throw new Error("Element with ID 'score' not found");
}

function getDrawCardButton(): HTMLButtonElement {
  const element = document.getElementById("draw-card-button");
  if (element !== null && element !== undefined) {
    return element as HTMLButtonElement;
  }
  throw new Error("Element with ID 'draw-card-button' not found");
}

function getPlantarseButton(): HTMLButtonElement {
  const element = document.getElementById("plantarse-button");
  if (element !== null && element !== undefined) {
    return element as HTMLButtonElement;
  }
  throw new Error("Element with ID 'plantarse-button' not found");
}

function getNewGameButton(): HTMLButtonElement {
  const element = document.getElementById("new-game-button");
  if (element !== null && element !== undefined) {
    return element as HTMLButtonElement;
  }
  throw new Error("Element with ID 'new-game-button' not found");
}

function getMessageDiv(): HTMLDivElement {
  const element = document.getElementById("message");
  if (element !== null && element !== undefined) {
    return element as HTMLDivElement;
  }
  throw new Error("Element with ID 'message' not found");
}

function getCardImage(): HTMLImageElement {
  const element = document.getElementById("card-image");
  if (element !== null && element !== undefined) {
    return element as HTMLImageElement;
  }
  throw new Error("Element with ID 'card-image' not found");
}

const muestraPuntuacion = (): void => {
  scoreDiv.textContent = `Puntuación: ${getScore()}`;
};

const mostrarCarta = (urlCarta: string): void => {
  const element = document.getElementById("card-image");
  if (
    element !== null &&
    element !== undefined &&
    element instanceof HTMLImageElement
  ) {
    element.src = urlCarta;
  } else {
    throw new Error("Element with ID 'card-image' not found");
  }
};

const gameOver = (message: string): void => {
  messageDiv.textContent = message;
  bloquearBotonPintarCarta();
  plantarseButton.disabled = true;
  newGameButton.style.display = "block";
};

const bloquearBotonPintarCarta = (): void => {
  const botonPintarCarta = document.getElementById("draw-card-button");
  if (
    botonPintarCarta !== null &&
    botonPintarCarta !== undefined &&
    botonPintarCarta instanceof HTMLButtonElement
  ) {
    botonPintarCarta.disabled = true;
  } else {
    throw new Error("Element with ID 'draw-card-button' not found");
  }
};

const resetGameUI = (): void => {
  resetGame();
  muestraPuntuacion();
  const element = document.getElementById("card-image");
  if (
    element !== null &&
    element !== undefined &&
    element instanceof HTMLImageElement
  ) {
    element.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  } else {
    throw new Error("Element with ID 'card-image' not found");
  }
  messageDiv.textContent = "";
  drawCardButton.disabled = false;
  plantarseButton.disabled = false;
  newGameButton.style.display = "none";
};

const handleDrawCard = () => {
  const carta = dameCarta();
  const urlCarta = obtenerUrlCarta(carta);
  mostrarCarta(urlCarta);
  const puntosCarta = valorCarta(carta);
  const puntosSumados = sumarPuntos(puntosCarta);
  actualizarScore(puntosSumados);
  muestraPuntuacion();
  const estadoPartida = gestionarFinalPartida();
  if (estadoPartida === "win") {
    gameOver("¡Has ganado!");
  } else if (estadoPartida === "lose") {
    gameOver("Has perdido");
  }
};

plantarseButton.addEventListener("click", () => {
  handlePlantarse();
});

const handlePlantarse = () => {
  let message = "";
  const score = getScore();
  if (score < 4) {
    message = "No debes plantarte tan pronto";
  } else if (score === 4) {
    message = "No está mal, pero podrías intentarlo de nuevo";
  } else if (score === 5) {
    message = "Más valor la próxima vez";
  } else if (score === 6 || score === 7) {
    message = "Casi casi...";
  } else if (score === 7.5) {
    message = "¡Lo has clavado! ¡Enhorabuena!";
  }
  gameOver(message);
};

newGameButton.addEventListener("click", resetGameUI);

muestraPuntuacion();
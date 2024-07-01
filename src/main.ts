document.addEventListener("DOMContentLoaded", () => {
  let score = 0;

  const cartas = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  const imagenesCartas = [
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg",
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg",
  ];

  const obtenerUrlCarta = (carta: number): string => imagenesCartas[carta - 1]; // Ajustar el índice

  const dameNumeroAleatorio = (): number => Math.floor(Math.random() * cartas.length);

  const dameCarta = (): number => cartas[dameNumeroAleatorio()];

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

  if (!scoreDiv || !drawCardButton || !plantarseButton || !newGameButton || !messageDiv || !cardImage) {
      console.error("Some elements are missing in the DOM.");
      return;
  }

  const muestraPuntuacion = (): void => {
      scoreDiv.textContent = `Puntuación: ${getScore()}`;
  };

  const mostrarCarta = (urlCarta: string): void => {
      cardImage.src = urlCarta;
  };

  const gameOver = (message: string): void => {
      messageDiv.textContent = message;
      drawCardButton.disabled = true;
      plantarseButton.disabled = true;
      newGameButton.style.display = "block";
  };

  const resetGameUI = (): void => {
      resetGame();
      muestraPuntuacion();
      cardImage.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      messageDiv.textContent = "";
      drawCardButton.disabled = false;
      plantarseButton.disabled = false;
      newGameButton.style.display = "none";
  };

  drawCardButton.addEventListener("click", () => {
      handleDrawCard();
  });

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
});

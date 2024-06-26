document.addEventListener("DOMContentLoaded", () => {
  
    let score = 0;
  
    const cartas = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
    const imagenesCartas: { [key: number]: string } = {
      1: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg",
      2: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg",
      3: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg",
      4: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg",
      5: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg",
      6: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg",
      7: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg",
      10: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg",
      11: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg",
      12: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg",
    };
  
    const obtenerUrlCarta = (carta: number): string => imagenesCartas[carta];
  
    const valorCarta = (carta: number): number => (carta >= 10 ? 0.5 : carta);
  
    const dameNumeroAleatorio = (): number => Math.floor(Math.random() * cartas.length);
  
    const dameCarta = (): number => cartas[dameNumeroAleatorio()];
  
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
  
    
    const scoreDiv = document.getElementById("score") as HTMLDivElement;
    const drawCardButton = document.getElementById("draw-card-button") as HTMLButtonElement;
    const plantarseButton = document.getElementById("plantarse-button") as HTMLButtonElement;
    const newGameButton = document.getElementById("new-game-button") as HTMLButtonElement;
    const messageDiv = document.getElementById("message") as HTMLDivElement;
    const cardImage = document.getElementById("card-image") as HTMLImageElement;
  
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
    });
  
    plantarseButton.addEventListener("click", () => {
      let message = "";
      const score = getScore();
      if (score < 4) {
        message = "Has sido muy conservador";
      } else if (score === 5) {
        message = "Más valor la próxima vez";
      } else if (score === 6 || score === 7) {
        message = "Casi casi...";
      } else if (score === 7.5) {
        message = "¡Lo has clavado! ¡Enhorabuena!";
      }
      gameOver(message);
    });
  
    newGameButton.addEventListener("click", resetGameUI);
  
    muestraPuntuacion();
  });
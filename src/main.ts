document.addEventListener("DOMContentLoaded", () => {
    const scoreDiv = document.getElementById("score") as HTMLElement | null;
    const drawCardButton = document.getElementById("draw-card-button") as HTMLButtonElement | null;
    const plantarseButton = document.getElementById("plantarse-button") as HTMLButtonElement | null;
    const newGameButton = document.getElementById("new-game-button") as HTMLButtonElement | null;
    const messageDiv = document.getElementById("message") as HTMLElement | null;
    const cardImage = document.getElementById("card-image") as HTMLImageElement | null;

    if (!scoreDiv || !drawCardButton || !plantarseButton || !newGameButton || !messageDiv || !cardImage) {
        console.error("Some elements are missing in the DOM.");
        return;
    }

    const muestraPuntuacion = () => {
        scoreDiv.textContent = `Puntuación: ${score}`;
    };

    const mostrarCarta = (urlCarta: string) => {
        cardImage.src = urlCarta;
    };

    const gameOver = (message: string) => {
        messageDiv.textContent = message;
        drawCardButton.disabled = true;
        plantarseButton.disabled = true;
        newGameButton.style.display = "block";
    };

    const resetGameUI = () => {
        resetGame();
        muestraPuntuacion();
        cardImage.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
        messageDiv.textContent = "";
        drawCardButton.disabled = false;
        plantarseButton.disabled = false;
        newGameButton.style.display = "none";
    };

    drawCardButton.addEventListener("click", () => {
        const numeroAleatorio = dameNumeroAleatorio();
        const carta = generaCarta(numeroAleatorio);
        const urlCarta = obtenerUrlCarta(carta);
        mostrarCarta(urlCarta);
        const puntosCarta = obtenerPuntosCarta(carta);
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

const obtenerUrlCarta = (carta: number) => {
    return imagenesCartas[carta];
};

const valorCarta = (carta: number) => {
    return carta >= 10 ? 0.5 : carta;
};

const dameNumeroAleatorio = () => {
    return Math.floor(Math.random() * cartas.length);
};

const generaCarta = (numeroAleatorio: number) => {
    if (numeroAleatorio > 7) {
        return cartas[numeroAleatorio - 2];
    }
    return cartas[numeroAleatorio];
};

const dameCarta = () => {
    const index = Math.floor(Math.random() * cartas.length);
    return cartas[index];
};

const obtenerPuntosCarta = (carta: number) => {
    if (carta > 7) {
        return 0.5;
    }
    return carta;
};

const sumarPuntos = (puntos: number) => {
    return score + puntos;
};

const actualizarScore = (puntosSumados: number) => {
    score = puntosSumados;
};

const gestionarFinalPartida = () => {
    if (score === 7.5) {
        return "win";
    }
    if (score > 7.5) {
        return "lose";
    }
    return "continue";
};

const resetGame = () => {
    score = 0;
};

  
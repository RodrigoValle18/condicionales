document.addEventListener('DOMContentLoaded', () => {
    let score = 0;

    const scoreDiv = document.getElementById('score') as HTMLDivElement;
    const drawCardButton = document.getElementById('draw-card-button') as HTMLButtonElement;
    const plantarseButton = document.getElementById('plantarse-button') as HTMLButtonElement;
    const newGameButton = document.getElementById('new-game-button') as HTMLButtonElement;
    const messageDiv = document.getElementById('message') as HTMLDivElement;
    const cardImage = document.getElementById('card-image') as HTMLImageElement;

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
        12: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg"
    };

    const valorCarta = (carta: number): number => {
        return carta >= 10 ? 0.5 : carta;
    };

    const muestraPuntuacion = () => {
        scoreDiv.textContent = `Puntuación: ${score}`;
    };

    const dameCarta = (): number => {
        const index = Math.floor(Math.random() * cartas.length);
        return cartas[index];
    };

    const mostrarCarta = (carta: number) => {
        cardImage.src = imagenesCartas[carta];
    };

    const gameOver = (message: string) => {
        messageDiv.textContent = message;
        drawCardButton.disabled = true;
        plantarseButton.disabled = true;
        newGameButton.style.display = 'block';
    };

    const resetGame = () => {
        score = 0;
        muestraPuntuacion();
        cardImage.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
        messageDiv.textContent = '';
        drawCardButton.disabled = false;
        plantarseButton.disabled = false;
        newGameButton.style.display = 'none';
    };

    drawCardButton.addEventListener('click', () => {
        const carta = dameCarta();
        mostrarCarta(carta);
        score += valorCarta(carta);
        muestraPuntuacion();

        if (score > 7.5) {
            gameOver("¡Te has pasado! Game Over.");
        }
    });

    plantarseButton.addEventListener('click', () => {
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

    newGameButton.addEventListener('click', resetGame);

    muestraPuntuacion();
});

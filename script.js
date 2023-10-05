document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const startButton = document.getElementById("start-button");

    let rows = 5;
    let lights = 10;

    function initializeBoard() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                const button = document.createElement("button");
                button.className = "board-button";
                button.addEventListener("click", () => toggleLights(i, j));
                board.appendChild(button);
            }
        }
        updateBoard();
    }

    function toggleLights(row, column) {
        toggleLight(row, column);
        toggleLight(row - 1, column);
        toggleLight(row + 1, column);
        toggleLight(row, column - 1);
        toggleLight(row, column + 1);
    }

    function toggleLight(row, column) {
        if (row >= 0 && row < rows && column >= 0 && column < rows) {
            const button = document.getElementsByClassName("board-button")[row * rows + column];
            button.classList.toggle("on");
        }
    }

    function updateBoard() {
        const buttons = document.getElementsByClassName("board-button");
        for (let i = 0; i < lights; i++) {
            const randomIndex = Math.floor(Math.random() * (rows * rows));
            buttons[randomIndex].classList.add("on");
        }
    }

    startButton.addEventListener("click", function () {
        board.innerHTML = ""; // Limpia el tablero al hacer clic en el botón de inicio
        initializeBoard();
    });

    initializeBoard();
});

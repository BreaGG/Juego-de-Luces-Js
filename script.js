document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const startButton = document.getElementById("start-button");
    const difficultyButtons = document.querySelectorAll('.difficulty input[type="button"]');
    const attemptsCounter = document.getElementById("attempts");
    const timerCounter = document.getElementById("timer");

    let rows = 5;
    let columns = 6;
    let lights = 10;
    let attempts = 0;
    let startTime;

    function initializeBoard() {
        board.innerHTML = ""; // Limpia el tablero antes de inicializarlo
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const button = document.createElement("button");
                button.className = "board-button";
                button.addEventListener("click", () => {
                    attempts++;
                    attemptsCounter.textContent = attempts;
                    toggleLights(i, j);
                    toggleLights(i - 1, j);
                    toggleLights(i + 1, j);
                    toggleLights(i, j - 1);
                    toggleLights(i, j + 1);
                    if (checkWin()) {
                        stopTimer();
                        alert("¡Has ganado!");
                    }
                });
                board.appendChild(button);
            }
        }
        attempts = 0;
        attemptsCounter.textContent = attempts;
        startTime = new Date().getTime();
        updateBoard();
        startTimer();
    }

    function toggleLights(row, column) {
        if (row >= 0 && row < rows && column >= 0 && column < columns) {
            const button = document.getElementsByClassName("board-button")[row * columns + column];
            button.classList.toggle("on");
        }
    }

    function updateBoard() {
        const buttons = document.getElementsByClassName("board-button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("on");
        }
        for (let i = 0; i < lights; i++) {
            const randomIndex = Math.floor(Math.random() * (rows * columns));
            buttons[randomIndex].classList.add("on");
        }
    }

    function checkWin() {
        const buttons = document.getElementsByClassName("board-button");
        for (let i = 0; i < buttons.length; i++) {
            if (!buttons[i].classList.contains("on")) {
                return false;
            }
        }
        return true;
    }

    function startTimer() {
        setInterval(function () {
            const currentTime = new Date().getTime();
            const elapsedTime = Math.floor((currentTime - startTime) / 1000);
            timerCounter.textContent = elapsedTime;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(startTimer);
    }

    difficultyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const custom = button.getAttribute("data-custom");
            if (custom === "true") {
                const customRows = parseInt(prompt("Introduce el número de filas:"));
                const customColumns = parseInt(prompt("Introduce el número de columnas:"));
                const customLights = parseInt(prompt("Introduce el número de luces:"));
                if (!isNaN(customRows) && !isNaN(customColumns) && !isNaN(customLights) &&
                    customRows > 0 && customColumns > 0 && customLights > 0 && customLights < customRows * customColumns) {
                    rows = customRows;
                    columns = customColumns;
                    lights = customLights;
                    initializeBoard();
                } else {
                    alert("Por favor, introduce valores válidos.");
                }
            } else {
                rows = parseInt(button.getAttribute("data-rows"));
                columns = parseInt(button.getAttribute("data-columns"));
                lights = parseInt(button.getAttribute("data-lights"));
                initializeBoard();
            }
        });
    });

    startButton.addEventListener("click", function () {
        initializeBoard();
    });
});
